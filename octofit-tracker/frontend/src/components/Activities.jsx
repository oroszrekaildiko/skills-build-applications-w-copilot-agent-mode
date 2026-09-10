import { useEffect, useState } from 'react'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
    const apiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/'

    fetch(apiUrl, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Unable to load activities (${response.status})`)
        const payload = await response.json()
        return Array.isArray(payload) ? payload : payload.data || payload.results || payload.items || []
      })
      .then(setActivities)
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
          <p className="eyebrow">Movement log</p>
          <h1>Activities</h1>
          <p className="page-subtitle">Every session counts toward your next personal best.</p>
        </div>
        <span className="record-count">{activities.length} sessions</span>
      </div>
      {loading && <p className="loading-state">Loading activity log...</p>}
      {error && <p className="error-state">{error}</p>}
      {!loading && !error && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Activity</th><th>Duration</th><th>Points</th><th>Completed</th></tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td><strong>{activity.type}</strong><small>{typeof activity.user === 'object' ? activity.user.displayName || activity.user.username : 'OctoFit member'}</small></td>
                  <td>{activity.durationMinutes} min</td>
                  <td><span className="points">+{activity.points}</span></td>
                  <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Today'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
