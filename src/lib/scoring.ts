import type { Color, Confidence, Scores } from '../types'
import { QUESTIONS } from '../data/questions'

const MIN_PER_COLOR = 6 // 6 questions x 1
const MAX_PER_COLOR = 30 // 6 questions x 5

export interface ScoringResult {
  scores: Scores
  primary: Color
  secondary: Color | null
  confidence: Confidence
}

export function scoreAnswers(answers: Record<string, number>): ScoringResult {
  const raw: Record<Color, number> = { RED: 0, YELLOW: 0, GREEN: 0, BLUE: 0 }
  for (const q of QUESTIONS) {
    const a = answers[q.id]
    if (a) raw[q.color] += a
  }

  // Normalize each color to 0–100 of its possible range
  const scores = { RED: 0, YELLOW: 0, GREEN: 0, BLUE: 0 } as Scores
  ;(Object.keys(raw) as Color[]).forEach((c) => {
    scores[c] = Math.round(((raw[c] - MIN_PER_COLOR) / (MAX_PER_COLOR - MIN_PER_COLOR)) * 100)
  })

  const sorted = (Object.keys(scores) as Color[]).sort((a, b) => scores[b] - scores[a])
  const primary = sorted[0]
  const second = sorted[1]

  // Secondary counts when close to primary (within 75% of primary's normalized score)
  // and meaningfully present (above midpoint of the scale)
  const secondary =
    scores[second] >= scores[primary] * 0.75 && scores[second] >= 50 ? second : null

  const gap = scores[primary] - scores[second]
  const confidence: Confidence = gap >= 25 ? 'clear' : gap >= 12 ? 'moderate' : 'mixed'

  return { scores, primary, secondary, confidence }
}

// Position on the book's two axes for the dashboard quadrant plot.
// x: task-oriented (-1) ↔ relationship-oriented (+1)
// y: reflective/reserved (-1) ↔ active/outgoing (+1)
export function axisPosition(scores: Scores): { x: number; y: number } {
  const total = scores.RED + scores.YELLOW + scores.GREEN + scores.BLUE || 1
  const w = {
    RED: scores.RED / total,
    YELLOW: scores.YELLOW / total,
    GREEN: scores.GREEN / total,
    BLUE: scores.BLUE / total,
  }
  const x = w.YELLOW + w.GREEN - w.RED - w.BLUE
  const y = w.RED + w.YELLOW - w.GREEN - w.BLUE
  return { x, y }
}

export function profileLabel(primary: Color, secondary: Color | null): string {
  const names: Record<Color, string> = { RED: 'Red', YELLOW: 'Yellow', GREEN: 'Green', BLUE: 'Blue' }
  return secondary ? `${names[primary]}/${names[secondary]}` : names[primary]
}
