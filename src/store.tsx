import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import type { AppState, AssessmentVersion, Contact, Level } from './types'
import {
  APP_VERSION,
  EMPTY_STATE,
  buildBackup,
  loadPersisted,
  parseBackup,
  savePersisted,
  type Notice,
} from './lib/migrations'

export { APP_VERSION }
export type { Notice }

const emptyState: AppState = EMPTY_STATE

export function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

type Action =
  | { type: 'ADD_CONTACT'; contact: Contact }
  | { type: 'UPDATE_CONTACT'; id: string; patch: Partial<Pick<Contact, 'name' | 'title' | 'level'>> }
  | { type: 'DELETE_CONTACT'; id: string }
  | { type: 'ADD_VERSION'; contactId: string; version: AssessmentVersion }
  | { type: 'DELETE_VERSION'; contactId: string; versionId: string }
  | { type: 'SET_ME'; me: Contact }
  | { type: 'ADD_ME_VERSION'; version: AssessmentVersion }
  | { type: 'IMPORT_STATE'; state: AppState }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_CONTACT':
      return { ...state, contacts: [action.contact, ...state.contacts] }
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map((c) => (c.id === action.id ? { ...c, ...action.patch } : c)),
      }
    case 'DELETE_CONTACT':
      return { ...state, contacts: state.contacts.filter((c) => c.id !== action.id) }
    case 'ADD_VERSION':
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.contactId ? { ...c, versions: [action.version, ...c.versions] } : c
        ),
      }
    case 'DELETE_VERSION':
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.contactId
            ? { ...c, versions: c.versions.filter((v) => v.id !== action.versionId) }
            : c
        ),
      }
    case 'SET_ME':
      return { ...state, me: action.me }
    case 'ADD_ME_VERSION':
      return state.me
        ? { ...state, me: { ...state.me, versions: [action.version, ...state.me.versions] } }
        : state
    case 'IMPORT_STATE':
      return action.state
    default:
      return state
  }
}

// Read storage once, before React mounts, so migration runs exactly one time
// even under StrictMode's double-invoked effects.
const initial = loadPersisted()

interface StoreValue {
  state: AppState
  dispatch: React.Dispatch<Action>
  notices: Notice[]
  dismissNotice: (index: number) => void
  /** True when stored data came from a newer build; the app is read-only. */
  readOnly: boolean
}

const StoreContext = createContext<StoreValue>({
  state: emptyState,
  dispatch: () => {},
  notices: [],
  dismissNotice: () => {},
  readOnly: false,
})

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial.state)
  const [notices, setNotices] = useState<Notice[]>(initial.notices)
  const readOnly = initial.blockWrites

  useEffect(() => {
    // Never write over data this build does not understand.
    if (readOnly) return
    const failure = savePersisted(state)
    if (failure) {
      setNotices((prev) =>
        prev.some((n) => n.message === failure.message) ? prev : [...prev, failure]
      )
    }
  }, [state, readOnly])

  const dismissNotice = (index: number) =>
    setNotices((prev) => prev.filter((_, i) => i !== index))

  return (
    <StoreContext.Provider value={{ state, dispatch, notices, dismissNotice, readOnly }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}

export function makeContact(name: string, title: string, level: Level): Contact {
  return { id: newId(), name, title, level, createdAt: new Date().toISOString(), versions: [] }
}

export function exportJson(state: AppState) {
  const blob = new Blob([JSON.stringify(buildBackup(state), null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `disc-recommender-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

/** Parse a backup file, migrating it forward from any older schema version. */
export function parseImport(text: string): AppState {
  return parseBackup(text).state
}
