export type Color = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE'

export type Level =
  | 'IC'
  | 'JUNIOR_MANAGER'
  | 'SENIOR_MANAGER'
  | 'DIRECTOR'
  | 'VP'
  | 'SVP'
  | 'C_LEVEL'

export type Scores = Record<Color, number> // normalized 0–100

export type Confidence = 'clear' | 'moderate' | 'mixed'

export interface AssessmentVersion {
  id: string
  createdAt: string // ISO datetime
  year: number
  answers: Record<string, number> // questionId -> 1..5
  scores: Scores
  primary: Color
  secondary: Color | null
  confidence: Confidence
  /**
   * Which question set produced this assessment. Scores are frozen at capture
   * time and never recomputed, so changing the questions later cannot alter
   * historical results — this records when two assessments are not strictly
   * comparable.
   */
  questionSetVersion: number
}

export interface Contact {
  id: string
  name: string
  title: string
  level: Level
  createdAt: string
  versions: AssessmentVersion[] // newest first
}

export interface AppState {
  /** Persisted-shape version. See src/lib/migrations.ts for the upgrade chain. */
  schemaVersion: number
  me: Contact | null
  contacts: Contact[]
}

export const LEVELS: { value: Level; label: string; rank: number }[] = [
  { value: 'IC', label: 'Individual Contributor', rank: 0 },
  { value: 'JUNIOR_MANAGER', label: 'Junior Manager', rank: 1 },
  { value: 'SENIOR_MANAGER', label: 'Senior Manager', rank: 2 },
  { value: 'DIRECTOR', label: 'Director', rank: 3 },
  { value: 'VP', label: 'VP', rank: 4 },
  { value: 'SVP', label: 'SVP', rank: 5 },
  { value: 'C_LEVEL', label: 'C-Level', rank: 6 },
]

export function levelLabel(level: Level): string {
  return LEVELS.find((l) => l.value === level)?.label ?? level
}
