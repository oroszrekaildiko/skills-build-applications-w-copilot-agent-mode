import { NavLink, Route, Routes, Link } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function Home() {
  return (
    <section className="home-page">
      <div className="home-intro">
        <p className="eyebrow">Mergington High School</p>
        <h1>Move with purpose.</h1>
        <p className="lead-copy">OctoFit turns small wins into momentum. See what your community is working toward today.</p>
      </div>
      <div className="quick-links">
        <Link className="feature-link feature-link-dark" to="/activities"><span>01</span><strong>Log activity</strong><small>Turn movement into points</small></Link>
        <Link className="feature-link feature-link-yellow" to="/workouts"><span>02</span><strong>Find a workout</strong><small>Train for the day you have</small></Link>
        <Link className="feature-link feature-link-coral" to="/leaderboard"><span>03</span><strong>See the board</strong><small>Celebrate your crew</small></Link>
      </div>
      <div className="home-footer"><span>Connected to</span><code>{apiBaseUrl}</code></div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/"><span className="brand-mark">O</span><span>OctoFit<span className="brand-accent">.</span></span></Link>
        <nav className="site-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{item.label}</NavLink>
          ))}
        </nav>
        <span className="status-chip"><span className="status-dot" />Live</span>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer className="site-footer"><span>OCTOFIT TRACKER</span><span>Build your rhythm.</span></footer>
    </div>
  )
}

export default App
