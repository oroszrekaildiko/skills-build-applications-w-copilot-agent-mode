import { useCollection } from '../api.js'

function Users() {
  const { data: users, loading, error } = useCollection('users')

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Community</p>
          <h1>Users</h1>
          <p className="page-subtitle">Meet the students building healthier habits together.</p>
        </div>
        <span className="record-count">{users.length} profiles</span>
      </div>
      {loading && <p className="loading-state">Loading user profiles...</p>}
      {error && <p className="error-state">{error}</p>}
      {!loading && !error && (
        <div className="resource-grid">
          {users.map((user) => (
            <article className="profile-card" key={user._id || user.id || user.username}>
              <div className="avatar">{user.displayName?.charAt(0) || '?'}</div>
              <div>
                <h2>{user.displayName || user.username}</h2>
                <p>@{user.username}</p>
                <small>{user.email}</small>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users
