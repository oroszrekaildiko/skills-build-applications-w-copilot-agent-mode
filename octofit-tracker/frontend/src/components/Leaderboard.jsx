import { useEffect, useState } from 'react'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
    const apiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/'

    fetch(apiUrl, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Unable to load leaderboard (${response.status})`)
        const payload = await response.json()
        return Array.isArray(payload) ? payload : payload.data || payload.results || payload.items || []
      })
      .then(setEntries)
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
          <p className="eyebrow">Friendly competition</p>
          <h1>Leaderboard</h1>
          <p className="page-subtitle">Celebrate consistency, effort, and every point earned.</p>
        </div>
        <span className="record-count">{entries.length} ranked</span>
      </div>
      {loading && <p className="loading-state">Loading standings...</p>}
      {error && <p className="error-state">{error}</p>}
      {!loading && !error && (
        <div className="leaderboard-list">
          {entries.map((entry, index) => {
            const user = typeof entry.user === 'object' ? entry.user : {}
            return (
              <article className="leaderboard-row" key={entry._id || entry.id || user.username}>
                <span className={`rank rank-${index + 1}`}>{entry.rank || index + 1}</span>
                <div className="avatar avatar-small">{(user.displayName || user.username || '?').charAt(0)}</div>
                <div className="leaderboard-name"><strong>{user.displayName || user.username || 'OctoFit member'}</strong><small>@{user.username || 'member'}</small></div>
                <strong className="score">{entry.points} <small>pts</small></strong>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Leaderboard
