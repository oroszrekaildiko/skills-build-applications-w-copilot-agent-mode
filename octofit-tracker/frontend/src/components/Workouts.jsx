import { useEffect, useState } from 'react'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
    const apiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/'

    fetch(apiUrl, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Unable to load workouts (${response.status})`)
        const payload = await response.json()
        return Array.isArray(payload) ? payload : payload.data || payload.results || payload.items || []
      })
      .then(setWorkouts)
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') setError(fetchError.message)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Training library</p>
          <h1>Workouts</h1>
          <p className="page-subtitle">Choose a session that fits your energy today.</p>
        </div>
        <span className="record-count">{workouts.length} sessions</span>
      </div>
      {loading && <p className="loading-state">Loading workouts...</p>}
      {error && <p className="error-state">{error}</p>}
      {!loading && !error && (
        <div className="resource-grid workout-grid">
          {workouts.map((workout) => (
            <article className="workout-card" key={workout._id || workout.id || workout.name}>
              <div className="workout-topline"><span className={`difficulty ${workout.difficulty}`}>{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div>
              <h2>{workout.name}</h2>
              <p>{workout.description}</p>
              <strong className="target">Target: {workout.target}</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
