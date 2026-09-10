import { useCollection } from '../api.js'

function Activities() {
  const { data: activities, loading, error } = useCollection('activities')

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
