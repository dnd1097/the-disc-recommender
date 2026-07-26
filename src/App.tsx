import { NavLink, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ContactList from './pages/ContactList'
import ContactDetail from './pages/ContactDetail'
import AssessmentWizard from './pages/AssessmentWizard'
import MyProfile from './pages/MyProfile'
import { DISCLAIMER } from './data/advice'
import { APP_VERSION, exportJson, parseImport, useStore } from './store'
import { useRef } from 'react'

export default function App() {
  const { state, dispatch, notices, dismissNotice, readOnly } = useStore()
  const fileRef = useRef<HTMLInputElement>(null)

  function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    file.text().then((text) => {
      try {
        const imported = parseImport(text)
        const existing = state.contacts.length + (state.me ? 1 : 0)
        const warning =
          existing > 0
            ? `\n\nThis REPLACES your current data (${existing} record(s)). Export a backup first if you have not already.`
            : ''
        if (
          confirm(
            `Import backup with ${imported.contacts.length} contact(s)${
              imported.me ? ' and your own profile' : ''
            }?${warning}`
          )
        ) {
          dispatch({ type: 'IMPORT_STATE', state: imported })
        }
      } catch (err) {
        alert(err instanceof Error ? err.message : 'That file is not a valid backup.')
      }
      e.target.value = ''
    })
  }

  return (
    <div className="shell">
      <nav className="topnav no-print">
        <NavLink to="/" className="brand">
          <span className="brand-dots">
            <i style={{ background: 'var(--red)' }} />
            <i style={{ background: 'var(--yellow)' }} />
            <i style={{ background: 'var(--green)' }} />
            <i style={{ background: 'var(--blue)' }} />
          </span>
          Stakeholder Colors
        </NavLink>
        <NavLink to="/" end className={({ isActive }) => `navlink ${isActive ? 'active' : ''}`}>
          Dashboard
        </NavLink>
        <NavLink to="/contacts" className={({ isActive }) => `navlink ${isActive ? 'active' : ''}`}>
          Contacts
        </NavLink>
        <NavLink to="/me" className={({ isActive }) => `navlink ${isActive ? 'active' : ''}`}>
          My Profile
        </NavLink>
        <span className="spacer" />
        <button className="btn secondary small" onClick={() => exportJson(state)}>
          Export backup
        </button>
        <button className="btn secondary small" onClick={() => fileRef.current?.click()}>
          Import
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          style={{ display: 'none' }}
          onChange={onImportFile}
        />
      </nav>

      {readOnly && (
        <div className="notice notice-warn no-print">
          <b>Read-only.</b> Nothing you do will be saved — see the message below.
        </div>
      )}

      {notices.map((n, i) => (
        <div key={i} className={`notice notice-${n.level} no-print`}>
          <span>{n.message}</span>
          <button
            className="notice-dismiss"
            onClick={() => dismissNotice(i)}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      ))}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/contacts/:id" element={<ContactDetail />} />
        <Route path="/assess/new" element={<AssessmentWizard mode="new" />} />
        <Route path="/assess/:id" element={<AssessmentWizard mode="refresh" />} />
        <Route path="/assess/me" element={<AssessmentWizard mode="self" />} />
        <Route path="/me" element={<MyProfile />} />
      </Routes>

      <div className="footer-note no-print">
        {DISCLAIMER}
        <br />
        <span style={{ opacity: 0.7 }}>
          Version {APP_VERSION} · data is stored only in this browser —{' '}
          <b>export a backup regularly</b>.
        </span>
      </div>
    </div>
  )
}
