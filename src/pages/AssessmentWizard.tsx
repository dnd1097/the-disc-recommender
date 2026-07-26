import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LIKERT_LABELS, orderedQuestions } from '../data/questions'
import { scoreAnswers } from '../lib/scoring'
import { makeContact, newId, useStore } from '../store'
import type { AssessmentVersion, Level } from '../types'
import { LEVELS } from '../types'

type Mode = 'new' | 'refresh' | 'self'

export default function AssessmentWizard({ mode }: { mode: Mode }) {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()
  const { id } = useParams()
  const questions = useMemo(() => orderedQuestions(), [])

  const existing = mode === 'refresh' ? state.contacts.find((c) => c.id === id) : null
  const isSelf = mode === 'self'

  // Step 0 = person details (new contact only), then questions
  const [name, setName] = useState(existing?.name ?? state.me?.name ?? '')
  const [title, setTitle] = useState(existing?.title ?? state.me?.title ?? '')
  const [level, setLevel] = useState<Level>(existing?.level ?? state.me?.level ?? 'SENIOR_MANAGER')
  const [detailsDone, setDetailsDone] = useState(mode === 'refresh')
  const [qi, setQi] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  if (mode === 'refresh' && !existing) {
    return <div className="empty"><h2>Contact not found</h2></div>
  }

  const total = questions.length
  const q = questions[Math.min(qi, total - 1)]
  const answered = Object.keys(answers).length

  function pick(value: number) {
    const next = { ...answers, [q.id]: value }
    setAnswers(next)
    if (qi < total - 1) {
      setQi(qi + 1)
    } else if (Object.keys(next).length === total) {
      finish(next)
    } else {
      // jumped back and changed an answer at the end; find first unanswered
      const firstMissing = questions.findIndex((qq) => !next[qq.id])
      if (firstMissing >= 0) setQi(firstMissing)
      else finish(next)
    }
  }

  function finish(finalAnswers: Record<string, number>) {
    const result = scoreAnswers(finalAnswers)
    const version: AssessmentVersion = {
      id: newId(),
      createdAt: new Date().toISOString(),
      year: new Date().getFullYear(),
      answers: finalAnswers,
      ...result,
    }
    if (isSelf) {
      const me = state.me ?? makeContact(name || 'Me', title || '', level)
      const updatedMe = { ...me, name: name || me.name, title, level }
      dispatch({ type: 'SET_ME', me: { ...updatedMe, versions: [version, ...me.versions] } })
      navigate('/me')
    } else if (mode === 'refresh' && existing) {
      dispatch({ type: 'ADD_VERSION', contactId: existing.id, version })
      navigate(`/contacts/${existing.id}`)
    } else {
      const contact = makeContact(name.trim(), title.trim(), level)
      dispatch({ type: 'ADD_CONTACT', contact: { ...contact, versions: [version] } })
      navigate(`/contacts/${contact.id}`)
    }
  }

  const heading = isSelf
    ? 'Assess yourself'
    : mode === 'refresh'
      ? `New ${new Date().getFullYear()} assessment for ${existing!.name}`
      : 'Add a new contact'

  if (!detailsDone) {
    return (
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <h1>{heading}</h1>
        <p className="sub">
          {isSelf
            ? 'Your own profile powers the “you × them” pairing advice and the dashboard.'
            : 'Who are you assessing? You’ll then answer 24 quick questions about behavior you have observed.'}
        </p>
        <div className="card">
          <label className="field">Name</label>
          <input
            type="text"
            value={name}
            placeholder={isSelf ? 'Your name' : 'e.g. Priya Sharma'}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <label className="field">Title</label>
          <input
            type="text"
            value={title}
            placeholder={isSelf ? 'Your title' : 'e.g. Head of Product'}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="field">Corporate level</label>
          <select value={level} onChange={(e) => setLevel(e.target.value as Level)}>
            {LEVELS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
          <div style={{ marginTop: 22 }}>
            <button
              className="btn"
              disabled={!name.trim()}
              style={{ opacity: name.trim() ? 1 : 0.4 }}
              onClick={() => setDetailsDone(true)}
            >
              Start assessment →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <h1>{heading}</h1>
      <p className="sub">
        Question {qi + 1} of {total} · {answered} answered
      </p>
      <div className="progressbar">
        <div style={{ width: `${(answered / total) * 100}%` }} />
      </div>
      <div className="card">
        <div className="q-text">{isSelf ? q.self : q.observer}</div>
        <div className="likert">
          {LIKERT_LABELS.map((label, i) => (
            <button
              key={i}
              className={answers[q.id] === i + 1 ? 'selected' : ''}
              onClick={() => pick(i + 1)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="wizard-nav">
          <button
            className="btn secondary small"
            onClick={() => setQi(Math.max(0, qi - 1))}
            disabled={qi === 0}
            style={{ visibility: qi === 0 ? 'hidden' : 'visible' }}
          >
            ← Back
          </button>
          {answers[q.id] && qi < total - 1 && (
            <button className="btn secondary small" onClick={() => setQi(qi + 1)}>
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
