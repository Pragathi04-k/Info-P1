import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import DashboardPage from './Components/DashboardPage';
import ProjectsPage from './Components/ProjectsPage'
import AnalyticsPage from './Components/AnalyticsPage'
import ProfilePage from './Components/ProfilePage'
import SettingPage from './Components/SettingPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </Router>
  )
}

export default App
