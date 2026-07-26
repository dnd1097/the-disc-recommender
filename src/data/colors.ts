import type { Color } from '../types'

export interface ColorMeta {
  color: Color
  name: string
  discLetter: string
  discWord: string
  hex: string
  softHex: string
  textOnColor: string
  tagline: string
  keywords: string[]
  temperament: string
  // Book's two axes: task(-1) ↔ relationship(+1), reflective(-1) ↔ active(+1)
  axis: { taskRelationship: number; passiveActive: number }
}

export const COLOR_ORDER: Color[] = ['RED', 'YELLOW', 'GREEN', 'BLUE']

export const COLORS: Record<Color, ColorMeta> = {
  RED: {
    color: 'RED',
    name: 'Red',
    discLetter: 'D',
    discWord: 'Dominance',
    hex: '#d64541',
    softHex: '#fdecea',
    textOnColor: '#ffffff',
    tagline: 'How quickly can we do this?',
    keywords: ['driven', 'direct', 'decisive', 'competitive', 'impatient', 'results-first'],
    temperament: 'Choleric — fire',
    axis: { taskRelationship: -1, passiveActive: 1 },
  },
  YELLOW: {
    color: 'YELLOW',
    name: 'Yellow',
    discLetter: 'I',
    discWord: 'Inducement (Influence)',
    hex: '#e8b021',
    softHex: '#fdf6e3',
    textOnColor: '#3b2f00',
    tagline: 'Who else can we get excited about this?',
    keywords: ['optimistic', 'persuasive', 'talkative', 'creative', 'spontaneous', 'people-first'],
    temperament: 'Sanguine — air',
    axis: { taskRelationship: 1, passiveActive: 1 },
  },
  GREEN: {
    color: 'GREEN',
    name: 'Green',
    discLetter: 'S',
    discWord: 'Submission (Stability)',
    hex: '#3d9970',
    softHex: '#e9f7f0',
    textOnColor: '#ffffff',
    tagline: 'How does everyone feel about this?',
    keywords: ['calm', 'loyal', 'patient', 'team-first', 'conflict-averse', 'steady'],
    temperament: 'Phlegmatic — water',
    axis: { taskRelationship: 1, passiveActive: -1 },
  },
  BLUE: {
    color: 'BLUE',
    name: 'Blue',
    discLetter: 'C',
    discWord: 'Compliance (Analytic)',
    hex: '#3a6ea5',
    softHex: '#eaf1f8',
    textOnColor: '#ffffff',
    tagline: 'Have we checked all the facts?',
    keywords: ['precise', 'methodical', 'quality-driven', 'skeptical', 'reserved', 'detail-first'],
    temperament: 'Melancholic — earth',
    axis: { taskRelationship: -1, passiveActive: -1 },
  },
}

// Opposite pairs per the book's model: Red↔Green, Yellow↔Blue
export const OPPOSITE: Record<Color, Color> = {
  RED: 'GREEN',
  GREEN: 'RED',
  YELLOW: 'BLUE',
  BLUE: 'YELLOW',
}
