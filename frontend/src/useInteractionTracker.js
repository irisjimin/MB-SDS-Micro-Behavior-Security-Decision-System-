import { useRef } from 'react'

const API_BASE = 'http://localhost:8000'

export function useInteractionTracker(sessionId, scenarioId) {
  const data = useRef({
    sessionId,
    scenarioId,
    hoverStarts: {},
    hoverTime: 0,
    moveCount: 0,
    path: [],
  })

  const post = async (payload) => {
    try {
      await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {}
  }

  return {
    trackView() {
      post({ session_id: sessionId, scenario_id: scenarioId, event_type: 'view', payload: {} })
    },
    trackHover(target) {
      data.current.hoverStarts[target] = performance.now()
      post({ session_id: sessionId, scenario_id: scenarioId, event_type: 'hover_start', payload: { target } })
    },
    trackHoverEnd(target) {
      const start = data.current.hoverStarts[target]
      const duration = start ? performance.now() - start : 0
      data.current.hoverTime += duration
      delete data.current.hoverStarts[target]
      post({ session_id: sessionId, scenario_id: scenarioId, event_type: 'hover_end', payload: { target, duration_ms: duration } })
    },
    trackMove(x, y) {
      data.current.moveCount += 1
      data.current.path.push([x, y])
      post({ session_id: sessionId, scenario_id: scenarioId, event_type: 'mousemove', payload: { x, y } })
    },
    trackDecision(choice) {
      return post({ session_id: sessionId, scenario_id: scenarioId, event_type: 'decision', payload: { choice } })
    },
    getSummary() {
      const path = data.current.path
      const entropy = path.length > 1
        ? Math.log2(new Set(path.map((p) => `${Math.round(p[0] / 25)},${Math.round(p[1] / 25)}`)).size + 1)
        : 0

      return {
        hoverTime: data.current.hoverTime,
        moveCount: data.current.moveCount,
        cursorEntropy: entropy,
      }
    },
  }
}
