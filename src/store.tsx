import React, { createContext, useContext, useEffect, useReducer } from 'react'
import type { AppState, AssessmentVersion, Contact, Level } from './types'

const STORAGE_KEY = 'disc-recommender-v1'

const emptyState: AppState = { schemaVersion: 1, me: null, contacts: [] }

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

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState
    const parsed = JSON.parse(raw) as AppState
    if (parsed.schemaVersion !== 1) return emptyState
    return parsed
  } catch {
    return emptyState
  }
}

const StoreContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> }>({
  state: emptyState,
  dispatch: () => {},
})

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.error('Failed to save state', e)
    }
  }, [state])

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export function useStore() {
  return useContext(StoreContext)
}

export function makeContact(name: string, title: string, level: Level): Contact {
  return { id: newId(), name, title, level, createdAt: new Date().toISOString(), versions: [] }
}

export function exportJson(state: AppState) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `disc-recommender-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function parseImport(text: string): AppState {
  const parsed = JSON.parse(text)
  if (parsed?.schemaVersion !== 1 || !Array.isArray(parsed?.contacts)) {
    throw new Error('Not a valid backup file')
  }
  return parsed as AppState
}
