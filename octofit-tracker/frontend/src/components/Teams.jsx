import { useCollection } from '../api.js'

function Teams() {
  const { data: teams, loading, error } = useCollection('teams')

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
