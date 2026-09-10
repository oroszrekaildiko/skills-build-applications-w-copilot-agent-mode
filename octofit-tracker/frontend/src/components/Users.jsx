import { useEffect, useState } from 'react'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
    const apiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/users/`
      : 'http://localhost:8000/api/users/'

    fetch(apiUrl, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Unable to load users (${response.status})`)
        const payload = await response.json()
        return Array.isArray(payload) ? payload : payload.data || payload.results || payload.items || []
      })
      .then(setUsers)
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
