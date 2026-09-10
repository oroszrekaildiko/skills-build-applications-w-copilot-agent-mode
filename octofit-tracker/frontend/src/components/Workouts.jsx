import { useCollection } from '../api.js'

function Workouts() {
  const { data: workouts, loading, error } = useCollection('workouts')

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
