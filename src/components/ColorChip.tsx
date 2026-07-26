import type { Color } from '../types'
import { COLORS } from '../data/colors'

export function ColorChip({
  primary,
  secondary,
  small,
}: {
  primary: Color
  secondary?: Color | null
  small?: boolean
}) {
  const p = COLORS[primary]
  const label = secondary ? `${p.name}/${COLORS[secondary].name}` : p.name
  const bg = secondary
    ? `linear-gradient(100deg, ${p.hex} 0 62%, ${COLORS[secondary].hex} 62% 100%)`
    : p.hex
  return (
    <span className={`chip ${small ? 'small' : ''}`} style={{ background: bg }}>
      {label}
    </span>
  )
}
