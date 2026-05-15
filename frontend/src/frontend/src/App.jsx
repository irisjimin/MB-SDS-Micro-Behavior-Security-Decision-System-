import { useEffect, useMemo, useState } from 'react'
import { useInteractionTracker } from './tracking/useInteractionTracker'

const scenario = {
  id: 'phishing-01',
  title: 'Suspicious security alert',
  body: 'Your account will be locked unless you verify immediately.',
}

export default function App() {
  const [decision, setDecision] = useState(null)
  const [sessionId] = useState(() => `s-${Math.random().toString(36).slice(2, 10)}`)
  const tracker = useInteractionTracker(sessionId, scenario.id)

  useEffect(() => {
    tracker.trackView()
  }, [])

  const summary = useMemo(() => tracker.getSummary(), [decision, tracker])

  const decide = async (choice) => {
    setDecision(choice)
    await tracker.trackDecision(choice)
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">MB-SDS</p>
          <h1>Micro-Behavior Security Decision System</h1>
          <p className="subcopy">A minimal experiment UI for measuring pre-click behavior in security decisions.</p>
        </div>
      </header>

      <main className="grid">
        <section className="panel scenario-panel">
          <p className="panel-label">Scenario</p>
          <h2>{scenario.title}</h2>
          <p>{scenario.body}</p>

          <div
            className="message-box"
            onMouseEnter={() => tracker.trackHover('message-box')}
            onMouseLeave={() => tracker.trackHoverEnd('message-box')}
            onMouseMove={(e) => tracker.trackMove(e.clientX, e.clientY)}
          >
            <span>security-team@example.com</span>
            <p>Please review and confirm your account details before 5 PM.</p>
          </div>

          <div className="actions">
            <button onClick={() => decide('safe')}>Safe</button>
            <button onClick={() => decide('risky')}>Risky</button>
          </div>
        </section>

        <section className="panel analytics-panel">
          <p className="panel-label">Session</p>
          <ul>
            <li>Session ID: {sessionId}</li>
            <li>Scenario: {scenario.id}</li>
            <li>Decision: {decision ?? 'pending'}</li>
            <li>Hover time: {Math.round(summary.hoverTime)} ms</li>
            <li>Move count: {summary.moveCount}</li>
            <li>Entropy: {summary.cursorEntropy.toFixed(3)}</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
