import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { AdviceReport } from '../components/AdviceReport'

export default function MyProfile() {
  const { state } = useStore()
  const me = state.me
  const version = me?.versions[0]

  if (!me || !version) {
    return (
      <div className="card empty">
        <h2>Your profile isn’t set up yet</h2>
        <p>
          Answer 24 quick questions about yourself. Your color powers the “you × them” pairing
          advice on every contact, and places you on the dashboard map.
        </p>
        <Link to="/assess/me" className="btn">
          Assess yourself
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div
        className="no-print"
        style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginBottom: 16 }}
      >
        <Link to="/assess/me" className="btn secondary small">
          ↻ Retake assessment
        </Link>
        <button className="btn small" onClick={() => window.print()}>
          Export PDF
        </button>
      </div>
      <AdviceReport contact={me} version={version} me={null} isSelf />
    </div>
  )
}
