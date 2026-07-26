import type { Color } from '../types'

/**
 * Bump when the question set changes in a way that affects scoring — adding,
 * removing, or re-pointing a question to a different color. Pure rewording of
 * an existing question keeps the same version. Stored assessments record the
 * version that produced them so historical results stay interpretable.
 *
 * Never reuse or repurpose an existing question id: old assessments keep their
 * answers keyed by id, and a repurposed id would silently misattribute them.
 */
export const QUESTION_SET_VERSION = 1

export interface Question {
  id: string
  color: Color
  observer: string // phrasing when assessing someone else
  self: string // phrasing when assessing yourself
}

// 24 observable-behavior items, 6 per color, Likert 1–5.
// Derived from the trait chapters of "Surrounded by Idiots" (Erikson).
export const QUESTIONS: Question[] = [
  // RED — Dominance
  {
    id: 'r1',
    color: 'RED',
    observer: 'In meetings, they get straight to the point and push for a decision.',
    self: 'In meetings, I get straight to the point and push for a decision.',
  },
  {
    id: 'r2',
    color: 'RED',
    observer: 'They become visibly impatient when discussions slow down or repeat.',
    self: 'I become visibly impatient when discussions slow down or repeat.',
  },
  {
    id: 'r3',
    color: 'RED',
    observer: 'They naturally take charge of situations, even when it is not their role.',
    self: 'I naturally take charge of situations, even when it is not my role.',
  },
  {
    id: 'r4',
    color: 'RED',
    observer: 'They treat challenges and disagreements as competitions to win.',
    self: 'I treat challenges and disagreements as competitions to win.',
  },
  {
    id: 'r5',
    color: 'RED',
    observer: 'They make quick decisions and are comfortable taking risks with incomplete information.',
    self: 'I make quick decisions and am comfortable taking risks with incomplete information.',
  },
  {
    id: 'r6',
    color: 'RED',
    observer: 'They are blunt — they say exactly what they think, even if it ruffles feathers.',
    self: 'I am blunt — I say exactly what I think, even if it ruffles feathers.',
  },

  // YELLOW — Inducement / Influence
  {
    id: 'y1',
    color: 'YELLOW',
    observer: 'They do a lot of the talking, often with stories and humor.',
    self: 'I do a lot of the talking, often with stories and humor.',
  },
  {
    id: 'y2',
    color: 'YELLOW',
    observer: 'They are upbeat about new ideas and quick to say yes to them.',
    self: 'I am upbeat about new ideas and quick to say yes to them.',
  },
  {
    id: 'y3',
    color: 'YELLOW',
    observer: 'They win people over with charm and enthusiasm rather than data.',
    self: 'I win people over with charm and enthusiasm rather than data.',
  },
  {
    id: 'y4',
    color: 'YELLOW',
    observer: 'They lose track of details, times, or follow-ups; their workspace or inbox looks chaotic.',
    self: 'I lose track of details, times, or follow-ups; my workspace or inbox looks chaotic.',
  },
  {
    id: 'y5',
    color: 'YELLOW',
    observer: 'They enjoy being the center of attention and are energized by an audience.',
    self: 'I enjoy being the center of attention and am energized by an audience.',
  },
  {
    id: 'y6',
    color: 'YELLOW',
    observer: 'They start many things with excitement but finish fewer of them.',
    self: 'I start many things with excitement but finish fewer of them.',
  },

  // GREEN — Stability
  {
    id: 'g1',
    color: 'GREEN',
    observer: 'They avoid open conflict and go quiet or agreeable when tension rises.',
    self: 'I avoid open conflict and go quiet or agreeable when tension rises.',
  },
  {
    id: 'g2',
    color: 'GREEN',
    observer: 'They are steady and predictable — same mood, same routines, few surprises.',
    self: 'I am steady and predictable — same mood, same routines, few surprises.',
  },
  {
    id: 'g3',
    color: 'GREEN',
    observer: 'They put the team first and rarely seek personal credit.',
    self: 'I put the team first and rarely seek personal credit.',
  },
  {
    id: 'g4',
    color: 'GREEN',
    observer: 'They resist sudden change and need time to warm up to new ways of working.',
    self: 'I resist sudden change and need time to warm up to new ways of working.',
  },
  {
    id: 'g5',
    color: 'GREEN',
    observer: 'They are genuinely good listeners; people bring their problems to them.',
    self: 'I am a genuinely good listener; people bring their problems to me.',
  },
  {
    id: 'g6',
    color: 'GREEN',
    observer: 'They keep their real opinions to themselves unless directly and safely asked.',
    self: 'I keep my real opinions to myself unless directly and safely asked.',
  },

  // BLUE — Compliance / Analytic
  {
    id: 'b1',
    color: 'BLUE',
    observer: 'They dig into details and quality; errors that others shrug off bother them.',
    self: 'I dig into details and quality; errors that others shrug off bother me.',
  },
  {
    id: 'b2',
    color: 'BLUE',
    observer: 'They come to meetings thoroughly prepared, having read everything in advance.',
    self: 'I come to meetings thoroughly prepared, having read everything in advance.',
  },
  {
    id: 'b3',
    color: 'BLUE',
    observer: 'They ask critical, probing questions and stay skeptical until they see evidence.',
    self: 'I ask critical, probing questions and stay skeptical until I see evidence.',
  },
  {
    id: 'b4',
    color: 'BLUE',
    observer: 'They are quiet in groups, speaking only when they have something precise to add.',
    self: 'I am quiet in groups, speaking only when I have something precise to add.',
  },
  {
    id: 'b5',
    color: 'BLUE',
    observer: 'They follow rules, processes, and standards closely and expect others to as well.',
    self: 'I follow rules, processes, and standards closely and expect others to as well.',
  },
  {
    id: 'b6',
    color: 'BLUE',
    observer: 'They take their time on decisions, wanting all the facts checked first.',
    self: 'I take my time on decisions, wanting all the facts checked first.',
  },
]

// Fixed interleaved presentation order (avoids clustering by color without
// the confusion of a random order changing between sessions).
export const QUESTION_ORDER: string[] = [
  'r1', 'y1', 'g1', 'b1',
  'r2', 'y2', 'g2', 'b2',
  'r3', 'y3', 'g3', 'b3',
  'r4', 'y4', 'g4', 'b4',
  'r5', 'y5', 'g5', 'b5',
  'r6', 'y6', 'g6', 'b6',
]

export const LIKERT_LABELS = [
  'Rarely true',
  'Occasionally true',
  'Sometimes true',
  'Often true',
  'Almost always true',
]

export function orderedQuestions(): Question[] {
  const byId = new Map(QUESTIONS.map((q) => [q.id, q]))
  return QUESTION_ORDER.map((id) => byId.get(id)!)
}
