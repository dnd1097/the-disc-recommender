import type { Scores } from '../types'
import { COLORS, COLOR_ORDER } from '../data/colors'

export function ScoreBars({ scores, compare }: { scores: Scores; compare?: Scores | null }) {
  return (
    <div>
      {COLOR_ORDER.map((c) => {
        const meta = COLORS[c]
        const delta = compare ? scores[c] - compare[c] : null
        return (
          <div className="scorebar-row" key={c}>
            <span style={{ color: meta.hex }}>{meta.name}</span>
            <div className="scorebar-track">
              <div
                className="scorebar-fill"
                style={{ width: `${scores[c]}%`, background: meta.hex }}
              />
            </div>
            <span>
              {scores[c]}
              {delta !== null && delta !== 0 && (
                <span className={`delta ${delta > 0 ? 'up' : 'down'}`}>
                  {' '}
                  {delta > 0 ? `+${delta}` : delta}
                </span>
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}
