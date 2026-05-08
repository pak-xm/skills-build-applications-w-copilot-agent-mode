import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <div className="app-shell container py-4 py-lg-5">
      <header className="card border-0 shadow-sm rounded-4 mb-4 hero-card">
        <div className="card-body p-4 p-lg-5">
          <div className="d-flex align-items-center gap-3 mb-3 app-brand-wrap">
            <img
              src="/octofitapp-small.png"
              alt="OctoFit logo"
              className="app-logo img-fluid"
            />
            <div>
              <p className="text-uppercase fw-semibold text-secondary mb-1">Fitness Dashboard</p>
              <h1 className="display-6 fw-bold text-primary-emphasis mb-0">OctoFit Tracker</h1>
            </div>
          </div>
          <p className="mb-0 text-secondary">
            Browse users, workouts, teams, activities, and rankings from the backend REST API.
            <a className="link-primary ms-2" href="https://getbootstrap.com/docs/5.3" target="_blank" rel="noreferrer">
              Bootstrap UI docs
            </a>
          </p>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg bg-white rounded-4 shadow-sm mb-4 px-3 py-2">
        <ul className="navbar-nav nav nav-pills flex-row flex-wrap gap-2">
          <li className="nav-item">
            <Link className="nav-link" to="/users">Users</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/activities">Activities</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/teams">Teams</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/workouts">Workouts</Link>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
