import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { ColorWheel } from '../components/ColorWheel'
import { COLORS, COLOR_ORDER } from '../data/colors'
import { LEVELS, levelLabel, type Color } from '../types'
import { buildInsights, isRefreshDue, primaryDistribution } from '../lib/insights'
import { profileLabel } from '../lib/scoring'
import { ColorChip } from '../components/ColorChip'

export default function Dashboard() {
  const { state } = useStore()
  const assessed = state.contacts.filter((c) => c.versions.length > 0)
  const dist = primaryDistribution(assessed)
  const total = assessed.length
  const insights = buildInsights(state)
  const due = state.contacts.filter((c) => c.versions.length > 0 && isRefreshDue(c)).length
  const myV = state.me?.versions[0]

  const levelsWithData = LEVELS.filter((l) =>
    assessed.some((c) => c.level === l.value)
  )

  return (
    <div>
      <h1>Dashboard</h1>
      <p className="sub">You against your stakeholder landscape, through the DISC color lens.</p>

      <div className="stat-row">
        <div className="stat">
          <div className="num">{total}</div>
          <div className="lbl">Stakeholders assessed</div>
        </div>
        {COLOR_ORDER.map((c) => (
          <div className="stat" key={c} style={{ borderTop: `3.5px solid ${COLORS[c].hex}` }}>
            <div className="num">{dist[c]}</div>
            <div className="lbl">{COLORS[c].name} primaries</div>
          </div>
        ))}
        <div className="stat">
          <div className="num">{due}</div>
          <div className="lbl">Refresh due</div>
        </div>
      </div>

      {total === 0 && !myV ? (
        <div className="card empty">
          <h2>Welcome</h2>
          <p>
            Start by assessing yourself, then add your stakeholders one at a time. The dashboard
            fills in as your map grows.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <Link to="/assess/me" className="btn">
              Assess yourself first
            </Link>
            <Link to="/assess/new" className="btn secondary">
              Add a contact
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="grid2">
            <div className="card">
              <h2>The map</h2>
              <p className="sub" style={{ marginBottom: 10 }}>
                The book’s two axes: task ↔ people focus, active ↔ reserved energy. Click a dot to
                open the contact.
              </p>
              <ColorWheel contacts={assessed} me={state.me} />
              {!myV && (
                <p className="sub" style={{ marginTop: 10 }}>
                  <Link to="/assess/me">Assess yourself</Link> to place your star on the map.
                </p>
              )}
            </div>

            <div>
              <div className="card">
                <h2>You</h2>
                {myV && state.me ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <ColorChip primary={myV.primary} secondary={myV.secondary} />
                    <span style={{ fontSize: 14.5 }}>
                      <b>{state.me.name}</b> — {profileLabel(myV.primary, myV.secondary)},{' '}
                      {COLORS[myV.primary].discWord}. <Link to="/me">View full profile →</Link>
                    </span>
                  </div>
                ) : (
                  <p style={{ margin: 0, fontSize: 14.5 }}>
                    Not assessed yet. <Link to="/assess/me">Take your assessment</Link> to unlock
                    pairing advice on every contact.
                  </p>
                )}
              </div>

              <div className="card">
                <h2>Color mix by corporate level</h2>
                {levelsWithData.length === 0 ? (
                  <p className="sub" style={{ margin: 0 }}>
                    No contacts yet.
                  </p>
                ) : (
                  levelsWithData.map((l) => {
                    const group = assessed.filter((c) => c.level === l.value)
                    return (
                      <div key={l.value} style={{ margin: '10px 0' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                          {l.label}{' '}
                          <span style={{ color: 'var(--muted)', fontWeight: 600 }}>
                            · {group.length}
                          </span>
                        </div>
                        <div style={{ display: 'flex', height: 16, borderRadius: 99, overflow: 'hidden' }}>
                          {COLOR_ORDER.map((color) => {
                            const n = group.filter((c) => c.versions[0].primary === color).length
                            if (n === 0) return null
                            return (
                              <div
                                key={color}
                                title={`${COLORS[color].name}: ${n}`}
                                style={{
                                  width: `${(n / group.length) * 100}%`,
                                  background: COLORS[color].hex,
                                }}
                              />
                            )
                          })}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <h2>Patterns & nudges</h2>
            {insights.length === 0 ? (
              <p className="sub" style={{ margin: 0 }}>
                Add contacts to see patterns.
              </p>
            ) : (
              insights.map((s, i) => (
                <div className="insight" key={i}>
                  <span className="dot" />
                  <span>{s}</span>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
