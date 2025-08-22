import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

function DashboardPage() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  // Mock user data (in real app, this would come from auth context)
  const [user] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    avatar: null
  })

  // Mock projects data (in real app, this would be fetched from API)
  const mockProjects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      membersCount: 5,
      status: 'Active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      name: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication',
      membersCount: 8,
      status: 'Active',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-19'
    },
    {
      id: 3,
      name: 'Task Management Tool',
      description: 'Collaborative task management and project tracking system',
      membersCount: 3,
      status: 'Completed',
      createdAt: '2023-12-01',
      updatedAt: '2024-01-01'
    },
    {
      id: 4,
      name: 'Learning Management System',
      description: 'Online learning platform with video streaming and assessments',
      membersCount: 12,
      status: 'Pending',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18'
    }
  ]

  // Simulate API call to fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      setTimeout(() => {
        setProjects(mockProjects)
        setLoading(false)
      }, 1000)
    }
    fetchProjects()
  }, [])

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path)
  }

  // Handle project click
  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`)
  }

  // Handle logout
  const handleLogout = () => {
    navigate('/login')
  }

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-success'
      case 'completed':
        return 'bg-primary'
      case 'pending':
        return 'bg-warning text-dark'
      default:
        return 'bg-secondary'
    }
  }

  return (
    <>
      {/* Custom CSS */}
      <style>{`
        .brand-highlight { color: #00c2ff; }
        .sidebar {
          width: 250px;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: all 0.3s ease;
          position: fixed; left: 0; top: 0;
          z-index: 1000;
        }
        .sidebar.collapsed { width: 70px; }
        .sidebar-header { padding: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        .sidebar-nav { padding: 1rem 0; }
        .sidebar-nav-item {
          display: flex; align-items: center; padding: 0.75rem 1rem;
          color: rgba(255, 255, 255, 0.8); text-decoration: none;
          transition: all 0.3s ease; border-left: 3px solid transparent;
        }
        .sidebar-nav-item:hover, .sidebar-nav-item.active {
          color: #fff; background-color: rgba(255, 255, 255, 0.1);
          border-left-color: #00c2ff; text-decoration: none;
        }
        .sidebar-nav-item i { width: 20px; margin-right: 10px; text-align: center; }
        .sidebar.collapsed .sidebar-nav-item span { display: none; }
        .main-content {
          margin-left: 250px; min-height: 100vh;
          background-color: #f8f9fa; transition: all 0.3s ease;
        }
        .main-content.expanded { margin-left: 70px; }
        .top-navbar {
          background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center;
        }
        .project-card {
          background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: all 0.3s ease; border: none; height: 100%;
        }
        .project-card:hover {
          transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .project-card-body { padding: 1.5rem; }
        .project-status {
          font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 12px; font-weight: 500;
        }
        .btn-primary {
          background-color: #00c2ff; border-color: #00c2ff; transition: all 0.3s ease;
        }
        .btn-primary:hover {
          background-color: #0099cc; border-color: #0099cc; transform: translateY(-2px);
        }
        .empty-state { text-align: center; padding: 4rem 2rem; color: #6c757d; }
        .empty-state-icon { font-size: 4rem; margin-bottom: 1rem; opacity: 0.5; }
        .profile-dropdown { position: relative; }
        .dropdown-menu {
          position: absolute; top: 100%; right: 0; background: #fff;
          border: 1px solid #dee2e6; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          min-width: 200px; z-index: 1001;
        }
        .dropdown-item {
          display: flex; align-items: center; padding: 0.5rem 1rem;
          color: #495057; text-decoration: none; transition: background-color 0.3s ease;
        }
        .dropdown-item:hover { background-color: #f8f9fa; color: #495057; text-decoration: none; }
        .dropdown-item i { margin-right: 0.5rem; width: 16px; }
        .loading-spinner {
          display: flex; justify-content: center; align-items: center; height: 200px;
        }
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.show { transform: translateX(0); }
          .main-content { margin-left: 0; }
          .main-content.expanded { margin-left: 0; }
        }
      `}</style>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h4 className="text-white mb-0">
            <span className="brand-highlight">Code</span>Collab
          </h4>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="sidebar-nav-item active" onClick={(e) => {
            e.preventDefault(); handleNavigation('/dashboard')
          }}>
            <i className="bi bi-speedometer2"></i><span>Dashboard</span>
          </a>
          <a href="#" className="sidebar-nav-item" onClick={(e) => {
            e.preventDefault(); handleNavigation('/projects')
          }}>
            <i className="bi bi-folder"></i><span>Projects</span>
          </a>
          <a href="#" className="sidebar-nav-item" onClick={(e) => {
            e.preventDefault(); handleNavigation('/analytics')
          }}>
            <i className="bi bi-graph-up"></i><span>Analytics</span>
          </a>
          <a href="#" className="sidebar-nav-item" onClick={(e) => {
            e.preventDefault(); handleNavigation('/profile')
          }}>
            <i className="bi bi-person"></i><span>Profile</span>
          </a>
          <a href="#" className="sidebar-nav-item" onClick={(e) => {
            e.preventDefault(); handleNavigation('/settings')
          }}>
            <i className="bi bi-gear"></i><span>Settings</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        {/* Top Navbar */}
        <div className="top-navbar">
          <div className="d-flex align-items-center">
            <button 
              className="btn btn-link text-dark p-0 me-3"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <i className="bi bi-list fs-4"></i>
            </button>
            <h5 className="mb-0">Dashboard</h5>
          </div>
          <div className="d-flex align-items-center">
            {/* Notifications */}
            <button className="btn btn-link text-dark p-2 me-2 position-relative">
              <i className="bi bi-bell fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                3
              </span>
            </button>
            {/* Profile Dropdown */}
            <div className="profile-dropdown">
              <button 
                className="btn btn-link text-dark p-0 d-flex align-items-center"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <div className="bg-primary rounded-circle d-flex justify-content-center align-items-center text-white me-2" style={{ width: '32px', height: '32px' }}>
                  <i className="bi bi-person"></i>
                </div>
                <span className="me-1">{user.name}</span>
                <i className="bi bi-chevron-down"></i>
              </button>
              {showProfileDropdown && (
                <div className="dropdown-menu show">
                  <a href="#" className="dropdown-item" onClick={(e) => {
                    e.preventDefault(); setShowProfileDropdown(false); handleNavigation('/profile')
                  }}>
                    <i className="bi bi-person"></i>Profile
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => {
                    e.preventDefault(); setShowProfileDropdown(false); handleNavigation('/settings')
                  }}>
                    <i className="bi bi-gear"></i>Settings
                  </a>
                  <hr className="dropdown-divider" />
                  <a href="#" className="dropdown-item text-danger" onClick={(e) => {
                    e.preventDefault(); setShowProfileDropdown(false); handleLogout()
                  }}>
                    <i className="bi bi-box-arrow-right"></i>Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4">
          {/* Welcome Section */}
          <div className="mb-4">
            <h2 className="fw-bold mb-2">Welcome back, {user.name}!</h2>
            <p className="text-muted">Here's what's happening with your projects today.</p>
          </div>

          {/* Projects Section */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">Your Projects</h4>
            <button className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i>New Project
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && projects.length > 0 && (
            <div className="row g-4">
              {projects.map((project) => (
                <div key={project.id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="project-card card h-100">
                    <div className="project-card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="card-title fw-bold mb-0">{project.name}</h5>
                        <span className={`project-status ${getStatusBadgeClass(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="card-text text-muted mb-3">{project.description}</p>
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-people text-muted me-2"></i>
                        <small className="text-muted">{project.membersCount} members</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          Updated {new Date(project.updatedAt).toLocaleDateString()}
                        </small>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleProjectClick(project.id)}
                        >
                          Open Project
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && projects.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="bi bi-folder-x"></i>
              </div>
              <h4 className="fw-bold mb-3">No projects yet</h4>
              <p className="mb-4">Create your first project or join an existing one to get started.</p>
              <button className="btn btn-primary btn-lg">
                <i className="bi bi-plus-circle me-2"></i>Create Project
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default DashboardPage
