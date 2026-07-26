import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../store'
import { AdviceReport } from '../components/AdviceReport'
import { ColorChip } from '../components/ColorChip'
import { ScoreBars } from '../components/ScoreBars'
import { profileLabel } from '../lib/scoring'

export default function ContactDetail() {
  const { id } = useParams()
  const { state, dispatch } = useStore()
  const navigate = useNavigate()
  const contact = state.contacts.find((c) => c.id === id)
  const [versionId, setVersionId] = useState<string | null>(null)

  if (!contact) {
    return (
      <div className="empty">
        <h2>Contact not found</h2>
        <Link to="/contacts" className="btn secondary">
          Back to contacts
        </Link>
      </div>
    )
  }

  const version = contact.versions.find((v) => v.id === versionId) ?? contact.versions[0]
  const isLatest = version === contact.versions[0]
  const versionIndex = contact.versions.indexOf(version)
  const previous = contact.versions[versionIndex + 1] ?? null

  function deleteContact() {
    if (confirm(`Delete ${contact!.name} and all their assessments? This cannot be undone.`)) {
      dispatch({ type: 'DELETE_CONTACT', id: contact!.id })
      navigate('/contacts')
    }
  }

  return (
    <div>
      <div
        className="no-print"
        style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}
      >
        <Link to="/contacts" style={{ color: 'var(--muted)', textDecoration: 'none', fontWeight: 650 }}>
          ← Contacts
        </Link>
        <span className="spacer" style={{ flex: 1 }} />
        <Link to={`/assess/${contact.id}`} className="btn secondary small">
          ↻ New {new Date().getFullYear()} assessment
        </Link>
        <button className="btn small" onClick={() => window.print()}>
          Export PDF
        </button>
        <button className="btn danger small" onClick={deleteContact}>
          Delete
        </button>
      </div>

      {!version ? (
        <div className="card empty">
          <h2>No assessment yet</h2>
          <Link to={`/assess/${contact.id}`} className="btn">
            Assess {contact.name}
          </Link>
        </div>
      ) : (
        <>
          {contact.versions.length > 1 && (
            <div className="card no-print">
              <h2>Version history</h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                {contact.versions.map((v, i) => (
                  <button
                    key={v.id}
                    className={`version-pill ${v.id === version.id ? 'active' : ''}`}
                    onClick={() => setVersionId(v.id)}
                  >
                    {v.year} · v{contact.versions.length - i} ·{' '}
                    {profileLabel(v.primary, v.secondary)}
                  </button>
                ))}
              </div>
              {previous && (
                <>
                  <p className="sub" style={{ marginBottom: 8 }}>
                    Change vs. previous version ({previous.year}):{' '}
                    {version.primary !== previous.primary ? (
                      <b>
                        primary shifted {profileLabel(previous.primary, previous.secondary)} →{' '}
                        {profileLabel(version.primary, version.secondary)}
                      </b>
                    ) : (
                      'same primary color'
                    )}
                  </p>
                  <ScoreBars scores={version.scores} compare={previous.scores} />
                </>
              )}
              {!isLatest && (
                <p className="sub" style={{ marginTop: 10, marginBottom: 0 }}>
                  Viewing an older version — advice below reflects the {version.year} assessment.
                </p>
              )}
            </div>
          )}

          <AdviceReport contact={contact} version={version} me={state.me} />
        </>
      )}
    </div>
  )
}
