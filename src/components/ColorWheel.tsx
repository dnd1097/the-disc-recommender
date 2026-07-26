import { useNavigate } from 'react-router-dom'
import type { Contact } from '../types'
import { COLORS } from '../data/colors'
import { axisPosition } from '../lib/scoring'

// Quadrant map on the book's two axes:
// x: task-oriented (left) ↔ relationship-oriented (right)
// y: active/outgoing (top) ↔ reflective/reserved (bottom)
// Quadrants: RED top-left, YELLOW top-right, BLUE bottom-left, GREEN bottom-right.
export function ColorWheel({ contacts, me }: { contacts: Contact[]; me: Contact | null }) {
  const navigate = useNavigate()
  const W = 520
  const H = 420
  const pad = 52

  function toXY(c: Contact): { x: number; y: number } | null {
    const v = c.versions[0]
    if (!v) return null
    const pos = axisPosition(v.scores)
    // pos.x/y in roughly [-0.6, 0.6] for realistic profiles; scale to fill
    const x = W / 2 + pos.x * (W / 2 - pad) * 1.4
    const y = H / 2 - pos.y * (H / 2 - pad) * 1.4
    return {
      x: Math.max(pad, Math.min(W - pad, x)),
      y: Math.max(pad, Math.min(H - pad, y)),
    }
  }

  const quadLabel = (text: string, sub: string, x: number, y: number, anchor: string, color: string) => (
    <>
      <text x={x} y={y} textAnchor={anchor as 'start'} fontSize="13" fontWeight="800" fill={color}>
        {text}
      </text>
      <text x={x} y={y + 15} textAnchor={anchor as 'start'} fontSize="10.5" fill="var(--muted)">
        {sub}
      </text>
    </>
  )

  const mePos = me ? toXY(me) : null
  const meColor = me?.versions[0] ? COLORS[me.versions[0].primary].hex : 'var(--ink)'

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label="Stakeholder map on task/relationship and active/reserved axes"
    >
      {/* Quadrant backgrounds */}
      <rect x={0} y={0} width={W / 2} height={H / 2} fill={COLORS.RED.softHex} rx={14} />
      <rect x={W / 2} y={0} width={W / 2} height={H / 2} fill={COLORS.YELLOW.softHex} rx={14} />
      <rect x={0} y={H / 2} width={W / 2} height={H / 2} fill={COLORS.BLUE.softHex} rx={14} />
      <rect x={W / 2} y={H / 2} width={W / 2} height={H / 2} fill={COLORS.GREEN.softHex} rx={14} />

      {/* Axes */}
      <line x1={W / 2} y1={8} x2={W / 2} y2={H - 8} stroke="var(--line)" strokeWidth={1.5} />
      <line x1={8} y1={H / 2} x2={W - 8} y2={H / 2} stroke="var(--line)" strokeWidth={1.5} />

      {quadLabel('RED', 'task · active', 14, 24, 'start', COLORS.RED.hex)}
      {quadLabel('YELLOW', 'people · active', W - 14, 24, 'end', COLORS.YELLOW.hex)}
      {quadLabel('BLUE', 'task · reserved', 14, H - 26, 'start', COLORS.BLUE.hex)}
      {quadLabel('GREEN', 'people · reserved', W - 14, H - 26, 'end', COLORS.GREEN.hex)}

      {/* Axis captions */}
      <text x={W / 2} y={14} textAnchor="middle" fontSize="10" fill="var(--muted)">
        active · outgoing
      </text>
      <text x={W / 2} y={H - 6} textAnchor="middle" fontSize="10" fill="var(--muted)">
        reflective · reserved
      </text>

      {/* Contacts */}
      {contacts.map((c) => {
        const pos = toXY(c)
        const v = c.versions[0]
        if (!pos || !v) return null
        return (
          <g
            key={c.id}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/contacts/${c.id}`)}
          >
            <circle cx={pos.x} cy={pos.y} r={9} fill={COLORS[v.primary].hex} stroke="#fff" strokeWidth={2} />
            {v.secondary && (
              <path
                d={`M ${pos.x} ${pos.y - 9} A 9 9 0 0 0 ${pos.x} ${pos.y + 9} Z`}
                fill={COLORS[v.secondary].hex}
              />
            )}
            <text
              x={pos.x}
              y={pos.y - 14}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--ink)"
            >
              {c.name.split(' ')[0]}
            </text>
          </g>
        )
      })}

      {/* Me marker: star */}
      {mePos && (
        <g>
          <path
            d={starPath(mePos.x, mePos.y, 13, 6)}
            fill={meColor}
            stroke="#fff"
            strokeWidth={2}
          />
          <text
            x={mePos.x}
            y={mePos.y + 26}
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="800"
            fill="var(--ink)"
          >
            You
          </text>
        </g>
      )}
    </svg>
  )
}

function starPath(cx: number, cy: number, outer: number, inner: number): string {
  const points: string[] = []
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner
    const angle = (Math.PI / 5) * i - Math.PI / 2
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }
  return `M ${points.join(' L ')} Z`
}
