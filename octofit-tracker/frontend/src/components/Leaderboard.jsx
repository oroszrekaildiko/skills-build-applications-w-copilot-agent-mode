import { useCollection } from '../api.js'

function Leaderboard() {
  const { data: entries, loading, error } = useCollection('leaderboard')

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
