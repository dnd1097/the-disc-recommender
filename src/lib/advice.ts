import type { AssessmentVersion, Color, Contact } from '../types'
import {
  ADVICE,
  DISCLAIMER,
  LEVEL_LENS,
  PAIRINGS,
  SECONDARY_NOTE,
  levelBucket,
  type ColorAdvice,
  type PairingAdvice,
} from '../data/advice'
import { COLORS } from '../data/colors'

export interface AdviceDoc {
  primary: Color
  secondary: Color | null
  core: ColorAdvice
  secondaryNote: string | null
  pairing: { myColor: Color; advice: PairingAdvice } | null
  levelLens: { title: string; points: string[] }
  disclaimer: string
}

export function composeAdvice(
  contact: Contact,
  version: AssessmentVersion,
  me: Contact | null
): AdviceDoc {
  const myVersion = me?.versions[0] ?? null
  const bucket = levelBucket(contact.level)

  return {
    primary: version.primary,
    secondary: version.secondary,
    core: ADVICE[version.primary],
    secondaryNote: version.secondary ? SECONDARY_NOTE[version.secondary] : null,
    pairing: myVersion
      ? {
          myColor: myVersion.primary,
          advice: PAIRINGS[`${myVersion.primary}-${version.primary}`],
        }
      : null,
    levelLens: LEVEL_LENS[bucket],
    disclaimer: DISCLAIMER,
  }
}

export function colorName(c: Color): string {
  return COLORS[c].name
}
