import type { AssessmentVersion, Contact } from '../types'
import { composeAdvice } from '../lib/advice'
import { profileLabel } from '../lib/scoring'
import { COLORS } from '../data/colors'
import { levelLabel } from '../types'
import { ScoreBars } from './ScoreBars'
import { ColorChip } from './ColorChip'
import { Link } from 'react-router-dom'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="advice-section avoid-break">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export function AdviceReport({
  contact,
  version,
  me,
  isSelf,
}: {
  contact: Contact
  version: AssessmentVersion
  me: Contact | null
  isSelf?: boolean
}) {
  const doc = composeAdvice(contact, version, isSelf ? null : me)
  const a = doc.core
  const p = COLORS[doc.primary]
  const pronoun = isSelf ? 'you' : 'them'

  return (
    <div className="advice-report">
      {/* Header — visible in print */}
      <div className="card avoid-break">
        <div className="result-hero">
          <div
            className={`result-swatch ${doc.secondary ? 'split' : ''}`}
            style={
              doc.secondary
                ? ({
                    ['--c1' as string]: p.hex,
                    ['--c2' as string]: COLORS[doc.secondary].hex,
                  } as React.CSSProperties)
                : { background: p.hex }
            }
          >
            {p.discLetter}
            {doc.secondary ? COLORS[doc.secondary].discLetter.toLowerCase() : ''}
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <h1 style={{ marginBottom: 2 }}>
              {contact.name} — {profileLabel(doc.primary, doc.secondary)}
            </h1>
            <p className="sub" style={{ margin: 0 }}>
              {contact.title} · {levelLabel(contact.level)} · assessed {version.year} (
              {new Date(version.createdAt).toLocaleDateString()}) · profile clarity:{' '}
              {version.confidence}
            </p>
            <p style={{ margin: '8px 0 0', fontSize: 14.5 }}>
              <b>{p.name}</b> — {p.discWord}. “{p.tagline}” · {p.temperament}
            </p>
          </div>
          <div style={{ minWidth: 260, flex: 1 }}>
            <ScoreBars scores={version.scores} />
          </div>
        </div>
      </div>

      <div className="card">
        <Section title={isSelf ? 'How you see yourself vs. how others may see you' : 'Snapshot: self-image vs. how others may see them'}>
          <div className="dos-donts">
            <div>
              <h4 style={{ margin: '0 0 6px', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)' }}>
                {isSelf ? 'You see yourself as' : 'They see themselves as'}
              </h4>
              <ul>
                {a.snapshot.selfView.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ margin: '0 0 6px', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)' }}>
                Others may experience {isSelf ? 'you' : 'them'} as
              </h4>
              <ul>
                {a.snapshot.othersView.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {doc.secondaryNote && (
          <div className="advice-note avoid-break" style={{ borderLeftColor: COLORS[doc.secondary!].hex }}>
            <b>Secondary {COLORS[doc.secondary!].name}:</b> {doc.secondaryNote}
          </div>
        )}
      </div>

      {!isSelf && (
        <div className="card">
          <Section title={`Adapting to ${pronoun}`}>
            <div className="dos-donts">
              <div className="do">
                <h4>Do</h4>
                <ul>
                  {a.adapting.dos.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="dont">
                <h4>Don’t</h4>
                <ul>
                  {a.adapting.donts.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>
      )}

      <div className="card">
        <Section title="Communication & email">
          <ul>
            {a.communication.spoken.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <h3 style={{ marginTop: 14 }}>Written / email</h3>
          <ul>
            {a.communication.email.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <div className="advice-note">
            <b>Email tell:</b> {a.communication.emailTell}
          </div>
        </Section>
      </div>

      <div className="card">
        <Section title={isSelf ? 'How you best receive feedback (share this with people who manage you)' : 'Giving them feedback'}>
          <ul>
            {a.feedback.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="grid2">
        <div className="card">
          <Section title="Stress: triggers & remedies">
            <h4 style={{ margin: '0 0 4px', fontSize: 13.5 }}>What stresses {pronoun}</h4>
            <ul>
              {a.stress.triggers.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <div className="advice-note">
              <b>Warning signs:</b> {a.stress.signs}
            </div>
            <h4 style={{ margin: '10px 0 4px', fontSize: 13.5 }}>How to help</h4>
            <ul>
              {a.stress.help.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="card">
          <Section title="Conflict & decisions">
            <div className="advice-note">
              <b>Temperament:</b> {a.conflict.temperament}
            </div>
            <h4 style={{ margin: '10px 0 4px', fontSize: 13.5 }}>How {pronoun === 'you' ? 'you' : 'they'} decide</h4>
            <ul>
              {a.conflict.decisions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <h4 style={{ margin: '10px 0 4px', fontSize: 13.5 }}>Winning {pronoun} over</h4>
            <ul>
              {a.conflict.winThemOver.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Section>
        </div>
      </div>

      <div className="card">
        <Section title="Body language tells">
          <ul>
            {a.bodyLanguage.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Section>
      </div>

      {!isSelf &&
        (doc.pairing ? (
          <div className="card" style={{ borderLeft: `4px solid ${COLORS[doc.pairing.myColor].hex}` }}>
            <Section
              title={`You (${COLORS[doc.pairing.myColor].name}) with them (${p.name})`}
            >
              <div className="advice-note">
                <b>Where it rubs:</b> {doc.pairing.advice.friction}
              </div>
              <h4 style={{ margin: '10px 0 4px', fontSize: 13.5 }}>Bridges</h4>
              <ul>
                {doc.pairing.advice.bridges.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </Section>
          </div>
        ) : (
          <div className="card no-print">
            <p style={{ margin: 0, fontSize: 14.5 }}>
              Complete <Link to="/me">your own profile</Link> to unlock the “you × them” pairing
              advice for every contact.
            </p>
          </div>
        ))}

      {!isSelf && (
        <div className="card">
          <Section title={doc.levelLens.title}>
            <ul>
              {doc.levelLens.points.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Section>
        </div>
      )}

      <p className="footer-note print-only-block">{doc.disclaimer}</p>
    </div>
  )
}
