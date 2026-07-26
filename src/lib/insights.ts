import type { AppState, Color, Contact } from '../types'
import { COLORS, OPPOSITE } from '../data/colors'

export function isRefreshDue(contact: Contact): boolean {
  const v = contact.versions[0]
  if (!v) return true
  const age = Date.now() - new Date(v.createdAt).getTime()
  return age > 365 * 24 * 60 * 60 * 1000
}

export function primaryDistribution(contacts: Contact[]): Record<Color, number> {
  const dist: Record<Color, number> = { RED: 0, YELLOW: 0, GREEN: 0, BLUE: 0 }
  for (const c of contacts) {
    const v = c.versions[0]
    if (v) dist[v.primary]++
  }
  return dist
}

export function buildInsights(state: AppState): string[] {
  const insights: string[] = []
  const assessed = state.contacts.filter((c) => c.versions.length > 0)
  const myV = state.me?.versions[0]

  if (assessed.length === 0) return insights

  const dist = primaryDistribution(assessed)
  const top = (Object.keys(dist) as Color[]).sort((a, b) => dist[b] - dist[a])[0]
  if (dist[top] > 0) {
    const pct = Math.round((dist[top] / assessed.length) * 100)
    insights.push(
      `${COLORS[top].name} is your most common stakeholder color — ${dist[top]} of ${assessed.length} contacts (${pct}%). ${COLORS[top].tagline ? `Their shared question: “${COLORS[top].tagline}”` : ''}`
    )
  }

  if (myV) {
    const opposite = OPPOSITE[myV.primary]
    const oppCount = dist[opposite]
    if (oppCount > 0) {
      insights.push(
        `${oppCount} contact(s) are ${COLORS[opposite].name} — your opposite color as a ${COLORS[myV.primary].name}. These are your highest-friction relationships; lean on the pairing advice in their reports.`
      )
    }
    const sameCount = dist[myV.primary]
    if (sameCount > 0) {
      insights.push(
        `${sameCount} contact(s) share your primary ${COLORS[myV.primary].name} — easy rapport, but watch the shared blind spots.`
      )
    }
  } else {
    insights.push('Complete your own profile to see how you sit against your stakeholder landscape.')
  }

  const due = state.contacts.filter((c) => c.versions.length > 0 && isRefreshDue(c))
  if (due.length > 0) {
    insights.push(
      `${due.length} contact(s) are due for their annual refresh: ${due.map((c) => c.name).join(', ')}.`
    )
  }

  const execs = assessed.filter((c) => ['VP', 'SVP', 'C_LEVEL'].includes(c.level))
  if (execs.length >= 2) {
    const execDist = primaryDistribution(execs)
    const topExec = (Object.keys(execDist) as Color[]).sort((a, b) => execDist[b] - execDist[a])[0]
    if (execDist[topExec] >= 2) {
      insights.push(
        `Among your VP+ contacts, ${COLORS[topExec].name} dominates (${execDist[topExec]} of ${execs.length}). Tune your executive summaries to the ${COLORS[topExec].name} style.`
      )
    }
  }

  return insights
}
