import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

function AnalyticsPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  // Mock user data
  const [user] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    avatar: null
  })

  // Mock analytics data
  const [analyticsData] = useState({
    projectStats: {
      total: 6,
      active: 3,
      completed: 1,
      pending: 2
    },
    taskCompletion: {
      completed: 75,
      pending: 25
    },
    memberContributions: [
      { name: 'John Doe', tasks: 24, percentage: 30 },
      { name: 'Jane Smith', tasks: 18, percentage: 22.5 },
      { name: 'Mike Johnson', tasks: 15, percentage: 18.75 },
      { name: 'Sarah Wilson', tasks: 12, percentage: 15 },
      { name: 'Others', tasks: 11, percentage: 13.75 }
    ],
    recentActivity: [
      { action: 'Project created', project: 'Data Analytics Dashboard', date: '2024-01-21' },
      { action: 'Task completed', project: 'E-commerce Platform', date: '2024-01-20' },
      { action: 'Member added', project: 'Mobile Banking App', date: '2024-01-19' },
      { action: 'Project updated', project: 'AI Chatbot Integration', date: '2024-01-18' }
    ]
  })

  // Simulate loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }, [])

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path)
  }

  // Handle logout
  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <>
      {/* ✅ Custom CSS (inline for this component) */}
      <style>
        {`
          .brand-highlight { color: #00c2ff; }
          .sidebar { width: 250px; min-height: 100vh; background: linear-gradient(135deg,#667eea 0%,#764ba2 100%); transition: all .3s ease; position: fixed; left: 0; top: 0; z-index: 1000; }
          .sidebar.collapsed { width: 70px; }
          .sidebar-header { padding: 1rem; border-bottom: 1px solid rgba(255,255,255,.1); }
          .sidebar-nav { padding: 1rem 0; }
          .sidebar-nav-item { display: flex; align-items: center; padding: .75rem 1rem; color: rgba(255,255,255,.8); text-decoration: none; transition: all .3s ease; border-left: 3px solid transparent; }
          .sidebar-nav-item:hover, .sidebar-nav-item.active { color: #fff; background-color: rgba(255,255,255,.1); border-left-color: #00c2ff; text-decoration: none; }
          .sidebar-nav-item i { width: 20px; margin-right: 10px; text-align: center; }
          .sidebar.collapsed .sidebar-nav-item span { display: none; }
          .main-content { margin-left: 250px; min-height: 100vh; background-color: #f8f9fa; transition: all .3s ease; }
          .main-content.expanded { margin-left: 70px; }
          .top-navbar { background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,.1); padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; }
          .stats-card { background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,.1); transition: all .3s ease; border: none; padding: 1.5rem; text-align: center; }
          .stats-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,.15); }
          .stats-number { font-size: 2.5rem; font-weight: bold; color: #00c2ff; }
          .stats-label { color: #6c757d; font-weight: 500; text-transform: uppercase; font-size: .85rem; letter-spacing: .5px; }
          .chart-card { background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,.1); padding: 1.5rem; height: 100%; }
          .progress-chart { width: 150px; height: 150px; border-radius: 50%; background: conic-gradient(#00c2ff 0deg,#00c2ff 270deg,#e9ecef 270deg,#e9ecef 360deg); display: flex; align-items: center; justify-content: center; position: relative; margin: 0 auto 1rem; }
          .progress-inner { width: 100px; height: 100px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; flex-direction: column; }
          .progress-percentage { font-size: 1.5rem; font-weight: bold; color: #00c2ff; }
          .contribution-bar { background-color: #e9ecef; border-radius: 10px; height: 20px; margin-bottom: .5rem; overflow: hidden; }
          .contribution-fill { background: linear-gradient(90deg,#00c2ff,#0099cc); height: 100%; border-radius: 10px; transition: width .8s ease; }
          .ai-insight-card { background: linear-gradient(135deg,#667eea 0%,#764ba2 100%); border-radius: 12px; padding: 2rem; color: #fff; text-align: center; }
          .ai-icon { font-size: 3rem; margin-bottom: 1rem; opacity: .8; }
          .profile-dropdown { position: relative; }
          .dropdown-menu { position: absolute; top: 100%; right: 0; background: #fff; border: 1px solid #dee2e6; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,.1); min-width: 200px; z-index: 1001; }
          .dropdown-item { display: flex; align-items: center; padding: .5rem 1rem; color: #495057; text-decoration: none; transition: background-color .3s ease; }
          .dropdown-item:hover { background-color: #f8f9fa; color: #495057; text-decoration: none; }
          .dropdown-item i { margin-right: .5rem; width: 16px; }
          .loading-spinner { display: flex; justify-content: center; align-items: center; height: 300px; }
          .activity-item { display: flex; align-items: center; padding: .75rem 0; border-bottom: 1px solid #e9ecef; }
          .activity-item:last-child { border-bottom: none; }
          .activity-icon { width: 40px; height: 40px; border-radius: 50%; background: #00c2ff; display: flex; align-items: center; justify-content: center; color: #fff; margin-right: 1rem; }
          @media(max-width:768px){ .sidebar{ transform:translateX(-100%);} .sidebar.show{ transform:translateX(0);} .main-content{ margin-left:0;} .main-content.expanded{ margin-left:0;} .stats-number{ font-size:2rem;} .progress-chart{ width:120px;height:120px;} .progress-inner{ width:80px;height:80px;} }
        `}
      </style>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h4 className="text-white mb-0"><span className="brand-highlight">Code</span>Collab</h4>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="sidebar-nav-item" onClick={(e)=>{e.preventDefault();handleNavigation('/dashboard')}}>
            <i className="bi bi-speedometer2"></i><span>Dashboard</span>
          </a>
          <a href="#" className="sidebar-nav-item" onClick={(e)=>{e.preventDefault();handleNavigation('/projects')}}>
            <i className="bi bi-folder"></i><span>Projects</span>
          </a>
          <a href="#" className="sidebar-nav-item active" onClick={(e)=>{e.preventDefault();handleNavigation('/analytics')}}>
            <i className="bi bi-graph-up"></i><span>Analytics</span>
          </a>
          <a href="#" className="sidebar-nav-item" onClick={(e)=>{e.preventDefault();handleNavigation('/profile')}}>
            <i className="bi bi-person"></i><span>Profile</span>
          </a>
          <a href="#" className="sidebar-nav-item" onClick={(e)=>{e.preventDefault();handleNavigation('/settings')}}>
            <i className="bi bi-gear"></i><span>Settings</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        {/* Top Navbar */}
        <div className="top-navbar">
          <div className="d-flex align-items-center">
            <button className="btn btn-link text-dark p-0 me-3" onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}>
              <i className="bi bi-list fs-4"></i>
            </button>
            <h5 className="mb-0">Analytics & Insights</h5>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-link text-dark p-2 me-2 position-relative">
              <i className="bi bi-bell fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize:'0.6rem'}}>3</span>
            </button>
            <div className="profile-dropdown">
              <button className="btn btn-link text-dark p-0 d-flex align-items-center" onClick={()=>setShowProfileDropdown(!showProfileDropdown)}>
                <div className="bg-primary rounded-circle d-flex justify-content-center align-items-center text-white me-2" style={{width:'32px',height:'32px'}}>
                  <i className="bi bi-person"></i>
                </div>
                <span className="me-1">{user.name}</span>
                <i className="bi bi-chevron-down"></i>
              </button>
              {showProfileDropdown && (
                <div className="dropdown-menu show">
                  <a href="#" className="dropdown-item" onClick={(e)=>{e.preventDefault();setShowProfileDropdown(false);handleNavigation('/profile')}}>
                    <i className="bi bi-person"></i>Profile
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e)=>{e.preventDefault();setShowProfileDropdown(false);handleNavigation('/settings')}}>
                    <i className="bi bi-gear"></i>Settings
                  </a>
                  <hr className="dropdown-divider" />
                  <a href="#" className="dropdown-item text-danger" onClick={(e)=>{e.preventDefault();setShowProfileDropdown(false);handleLogout()}}>
                    <i className="bi bi-box-arrow-right"></i>Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4">
          {/* Header */}
          <div className="mb-4">
            <h2 className="fw-bold mb-2">Analytics Dashboard</h2>
            <p className="text-muted">Track your team's performance and project insights</p>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading analytics...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Section 1: Project Statistics */}
              <div className="mb-5">
                <h4 className="fw-bold mb-4">Project Statistics</h4>
                <div className="row g-4">
                  <div className="col-lg-3 col-md-6">
                    <div className="stats-card">
                      <div className="stats-number">{analyticsData.projectStats.total}</div>
                      <div className="stats-label">Total Projects</div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="stats-card">
                      <div className="stats-number text-success">{analyticsData.projectStats.active}</div>
                      <div className="stats-label">Active Projects</div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="stats-card">
                      <div className="stats-number text-primary">{analyticsData.projectStats.completed}</div>
                      <div className="stats-label">Completed</div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="stats-card">
                      <div className="stats-number text-warning">{analyticsData.projectStats.pending}</div>
                      <div className="stats-label">Pending</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Charts */}
              <div className="mb-5">
                <h4 className="fw-bold mb-4">Performance Charts</h4>
                <div className="row g-4">
                  {/* Task Completion Chart */}
                  <div className="col-lg-6">
                    <div className="chart-card">
                      <h5 className="fw-bold mb-4">Task Completion Rate</h5>
                      <div className="progress-chart">
                        <div className="progress-inner">
                          <div className="progress-percentage">{analyticsData.taskCompletion.completed}%</div>
                          <small className="text-muted">Completed</small>
                        </div>
                      </div>
                      <div className="row text-center">
                        <div className="col-6">
                          <div className="fw-bold text-primary">{analyticsData.taskCompletion.completed}%</div>
                          <small className="text-muted">Completed</small>
                        </div>
                        <div className="col-6">
                          <div className="fw-bold text-secondary">{analyticsData.taskCompletion.pending}%</div>
                          <small className="text-muted">Pending</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Member Contributions Chart */}
                  <div className="col-lg-6">
                    <div className="chart-card">
                      <h5 className="fw-bold mb-4">Member Contributions</h5>
                      <div className="mb-3">
                        {analyticsData.memberContributions.map((member, index) => (
                          <div key={index} className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                              <small className="fw-bold">{member.name}</small>
                              <small className="text-muted">{member.tasks} tasks</small>
                            </div>
                            <div className="contribution-bar">
                              <div className="contribution-fill" style={{width:`${member.percentage}%`}}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div> {/* closes row g-4 */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default AnalyticsPage
