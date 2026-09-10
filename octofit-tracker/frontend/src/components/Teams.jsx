import { useEffect, useState } from 'react'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
    const apiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/'

    fetch(apiUrl, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Unable to load teams (${response.status})`)
        const payload = await response.json()
        return Array.isArray(payload) ? payload : payload.data || payload.results || payload.items || []
      })
      .then(setTeams)
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
          <p className="eyebrow">Find your people</p>
          <h1>Teams</h1>
          <p className="page-subtitle">Small groups make big goals feel within reach.</p>
        </div>
        <span className="record-count">{teams.length} teams</span>
      </div>
      {loading && <p className="loading-state">Loading teams...</p>}
      {error && <p className="error-state">{error}</p>}
      {!loading && !error && (
        <div className="resource-grid">
          {teams.map((team) => (
            <article className="team-card" key={team._id || team.id || team.name}>
              <div className="team-mark">+</div>
              <p className="eyebrow">Team</p>
              <h2>{team.name}</h2>
              <p>{team.description || 'A crew committed to moving more together.'}</p>
              <span className="member-count">{team.members?.length || 0} members</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
