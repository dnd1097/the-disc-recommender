import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { ColorChip } from '../components/ColorChip'
import { levelLabel } from '../types'
import { isRefreshDue } from '../lib/insights'

export default function ContactList() {
  const { state } = useStore()
  const navigate = useNavigate()
  const contacts = [...state.contacts].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1>Contacts</h1>
          <p className="sub">{contacts.length} stakeholder(s) assessed</p>
        </div>
        <Link to="/assess/new" className="btn">
          + Add contact
        </Link>
      </div>

      {contacts.length === 0 ? (
        <div className="card empty">
          <h2>No contacts yet</h2>
          <p>Add your first stakeholder and answer 24 quick questions about how they behave.</p>
          <Link to="/assess/new" className="btn">
            Assess your first contact
          </Link>
        </div>
      ) : (
        <div className="card" style={{ padding: '6px 12px' }}>
          <table className="contacts">
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Level</th>
                <th>Profile</th>
                <th>Last assessed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => {
                const v = c.versions[0]
                return (
                  <tr key={c.id} className="rowlink" onClick={() => navigate(`/contacts/${c.id}`)}>
                    <td style={{ fontWeight: 700 }}>{c.name}</td>
                    <td>{c.title}</td>
                    <td>{levelLabel(c.level)}</td>
                    <td>{v ? <ColorChip primary={v.primary} secondary={v.secondary} small /> : '—'}</td>
                    <td>
                      {v ? `${v.year} (v${c.versions.length})` : '—'}
                    </td>
                    <td>
                      {v && isRefreshDue(c) ? (
                        <span className="badge">Refresh due</span>
                      ) : (
                        <span className="badge ok">Current</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
