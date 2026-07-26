import type { AppState } from '../types'

// ---------------------------------------------------------------------------
// Persistence, schema versioning, and migration.
//
// Design rule: NEVER discard data we do not understand. Any state we cannot
// read is quarantined under its own key and reported, never overwritten.
// ---------------------------------------------------------------------------

export const STORAGE_KEY = 'disc-recommender-v1'
export const APP_VERSION = '1.1.0'

/** Bump this whenever the persisted shape changes, and add a migration below. */
export const CURRENT_SCHEMA = 2

export const EMPTY_STATE: AppState = {
  schemaVersion: CURRENT_SCHEMA,
  me: null,
  contacts: [],
}

export type NoticeLevel = 'info' | 'warn' | 'error'

export interface Notice {
  level: NoticeLevel
  message: string
}

export interface LoadResult {
  state: AppState
  notices: Notice[]
  /** When true the store must not write — the stored data is newer than this build. */
  blockWrites: boolean
}

// ---------------------------------------------------------------------------
// Migrations
//
// Each entry upgrades exactly one version step. They run in order, so a v1
// backup restored years from now still lands on the current shape. Migrations
// receive loosely-typed data on purpose: it came from an older build.
// ---------------------------------------------------------------------------

interface Migration {
  from: number
  to: number
  description: string
  migrate: (state: any) => any
}

const MIGRATIONS: Migration[] = [
  {
    from: 1,
    to: 2,
    description:
      'Recorded which question set produced each assessment, so scores stay comparable across future question changes.',
    migrate: (state: any) => {
      const stamp = (contact: any) =>
        contact
          ? {
              ...contact,
              versions: (contact.versions ?? []).map((v: any) => ({
                ...v,
                // Everything created before this migration used question set 1.
                questionSetVersion: v.questionSetVersion ?? 1,
              })),
            }
          : null

      return {
        ...state,
        schemaVersion: 2,
        me: stamp(state.me),
        contacts: (state.contacts ?? []).map(stamp),
      }
    },
  },
]

/**
 * Run the migration chain from whatever version the data claims up to current.
 * Throws if a step is missing, so we fail loudly rather than saving junk.
 */
export function runMigrations(raw: any): { state: AppState; applied: Migration[] } {
  let working = raw
  const applied: Migration[] = []
  let guard = 0

  while ((working.schemaVersion ?? 1) < CURRENT_SCHEMA) {
    const from = working.schemaVersion ?? 1
    const step = MIGRATIONS.find((m) => m.from === from)
    if (!step) {
      throw new Error(`No migration path from schema v${from} to v${CURRENT_SCHEMA}`)
    }
    working = step.migrate(working)
    applied.push(step)
    if (++guard > 50) throw new Error('Migration loop did not terminate')
  }

  return { state: working as AppState, applied }
}

// ---------------------------------------------------------------------------
// Safety helpers
// ---------------------------------------------------------------------------

/** Loose shape check — enough to tell real state from unrelated junk. */
function looksLikeState(value: any): boolean {
  return (
    value !== null &&
    typeof value === 'object' &&
    Array.isArray(value.contacts) &&
    (value.me === null || value.me === undefined || typeof value.me === 'object')
  )
}

function countRecords(state: any): number {
  const contacts = Array.isArray(state?.contacts) ? state.contacts.length : 0
  return contacts + (state?.me ? 1 : 0)
}

/** Copy data aside under a timestamped key so nothing is ever truly gone. */
function preserve(prefix: string, payload: string): string | null {
  const key = `${STORAGE_KEY}-${prefix}-${new Date().toISOString().replace(/[:.]/g, '-')}`
  try {
    localStorage.setItem(key, payload)
    return key
  } catch {
    return null
  }
}

/** Keep only the newest N snapshots of a given prefix so storage cannot fill up. */
function pruneSnapshots(prefix: string, keep: number) {
  try {
    const keys = Object.keys(localStorage)
      .filter((k) => k.startsWith(`${STORAGE_KEY}-${prefix}-`))
      .sort()
    while (keys.length > keep) {
      const oldest = keys.shift()
      if (oldest) localStorage.removeItem(oldest)
    }
  } catch {
    /* pruning is best-effort */
  }
}

// ---------------------------------------------------------------------------
// Load
// ---------------------------------------------------------------------------

export function loadPersisted(): LoadResult {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(STORAGE_KEY)
  } catch {
    return {
      state: EMPTY_STATE,
      blockWrites: true,
      notices: [
        {
          level: 'error',
          message:
            'Browser storage is unavailable (private browsing or blocked cookies). Your work will not be saved this session — export a backup before closing.',
        },
      ],
    }
  }

  if (!raw) return { state: EMPTY_STATE, notices: [], blockWrites: false }

  let parsed: any
  try {
    parsed = JSON.parse(raw)
  } catch {
    const key = preserve('corrupt', raw)
    return {
      state: EMPTY_STATE,
      blockWrites: false,
      notices: [
        {
          level: 'error',
          message: key
            ? `Saved data could not be read and was set aside under "${key}" rather than deleted. Starting empty. If you have a backup file, use Import.`
            : 'Saved data could not be read. Starting empty. If you have a backup file, use Import.',
        },
      ],
    }
  }

  if (!looksLikeState(parsed)) {
    const key = preserve('unreadable', raw)
    return {
      state: EMPTY_STATE,
      blockWrites: false,
      notices: [
        {
          level: 'error',
          message: key
            ? `Saved data was not in a recognisable format and was set aside under "${key}" rather than deleted. Starting empty.`
            : 'Saved data was not in a recognisable format. Starting empty.',
        },
      ],
    }
  }

  const version = parsed.schemaVersion ?? 1

  // Data written by a NEWER build than this one. Do not touch it — an older
  // build writing back its own shape would silently drop the newer fields.
  if (version > CURRENT_SCHEMA) {
    return {
      state: parsed as AppState,
      blockWrites: true,
      notices: [
        {
          level: 'warn',
          message: `Your saved data was created by a newer version of this app (schema v${version}; this build understands v${CURRENT_SCHEMA}). It is shown read-only and will NOT be modified. Update the app to make changes.`,
        },
      ],
    }
  }

  if (version < CURRENT_SCHEMA) {
    const snapshotKey = preserve(`pre-v${CURRENT_SCHEMA}`, raw)
    pruneSnapshots(`pre-v${CURRENT_SCHEMA}`, 3)
    try {
      const { state, applied } = runMigrations(parsed)
      const notices: Notice[] = [
        {
          level: 'info',
          message: `Upgraded your saved data from v${version} to v${CURRENT_SCHEMA}, keeping all ${countRecords(state)} record(s).${
            snapshotKey ? ' A pre-upgrade snapshot was kept in case anything looks wrong.' : ''
          }${applied.length ? ` What changed: ${applied.map((m) => m.description).join(' ')}` : ''}`,
        },
      ]
      return { state, notices, blockWrites: false }
    } catch (e) {
      // Migration failed: keep the original untouched and refuse to write.
      return {
        state: EMPTY_STATE,
        blockWrites: true,
        notices: [
          {
            level: 'error',
            message: `Could not upgrade your saved data (${
              e instanceof Error ? e.message : 'unknown error'
            }). Your original data has been left untouched and nothing will be overwritten. Export a backup from a working version, or report this.`,
          },
        ],
      }
    }
  }

  return { state: parsed as AppState, notices: [], blockWrites: false }
}

// ---------------------------------------------------------------------------
// Save
// ---------------------------------------------------------------------------

export function savePersisted(state: AppState): Notice | null {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return null
  } catch (e) {
    const quota =
      e instanceof DOMException &&
      (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    return {
      level: 'error',
      message: quota
        ? 'Browser storage is full — your latest change was NOT saved. Export a backup now, then remove old contacts or snapshots.'
        : 'Your latest change could not be saved to browser storage. Export a backup now to avoid losing work.',
    }
  }
}

// ---------------------------------------------------------------------------
// Import / export
// ---------------------------------------------------------------------------

export interface BackupFile extends AppState {
  exportedAt?: string
  appVersion?: string
}

export function buildBackup(state: AppState): BackupFile {
  return { ...state, exportedAt: new Date().toISOString(), appVersion: APP_VERSION }
}

/**
 * Parse a backup file and bring it up to the current schema. Backups from any
 * older version of the app remain importable forever.
 */
export function parseBackup(text: string): { state: AppState; notices: Notice[] } {
  let parsed: any
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error('That file is not valid JSON.')
  }

  if (!looksLikeState(parsed)) {
    throw new Error('That file does not look like a Stakeholder Colors backup.')
  }

  const version = parsed.schemaVersion ?? 1

  if (version > CURRENT_SCHEMA) {
    throw new Error(
      `That backup was created by a newer version of the app (v${version}). Update the app before importing it.`
    )
  }

  const notices: Notice[] = []
  let state = parsed as AppState

  if (version < CURRENT_SCHEMA) {
    const { state: migrated, applied } = runMigrations(parsed)
    state = migrated
    if (applied.length) {
      notices.push({
        level: 'info',
        message: `Backup upgraded from v${version} to v${CURRENT_SCHEMA} on import.`,
      })
    }
  }

  // Strip export-only metadata so it does not linger in live state.
  const { exportedAt, appVersion, ...clean } = state as BackupFile
  return { state: clean as AppState, notices }
}
