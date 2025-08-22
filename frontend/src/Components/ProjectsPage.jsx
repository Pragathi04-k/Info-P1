import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

function ProjectsPage() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  
  // Mock user data
  const [user] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    avatar: null
  })

  // Mock projects data
  const mockProjects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js. This platform includes user authentication, product catalog, shopping cart, payment processing, and admin dashboard.',
      membersCount: 5,
      status: 'Active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      members: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Tom Brown']
    },
    {
      id: 2,
      name: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication, real-time transaction monitoring, and comprehensive financial management tools.',
      membersCount: 8,
      status: 'Active',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-19',
      members: ['John Doe', 'Alice Cooper', 'Bob Wilson', 'Carol Davis', 'David Miller', 'Eva Johnson', 'Frank Smith', 'Grace Lee']
    },
    {
      id: 3,
      name: 'Task Management Tool',
      description: 'Collaborative task management and project tracking system with Kanban boards, time tracking, and team collaboration features.',
      membersCount: 3,
      status: 'Completed',
      createdAt: '2023-12-01',
      updatedAt: '2024-01-01',
      members: ['John Doe', 'Lisa Anderson', 'Mark Taylor']
    },
    {
      id: 4,
      name: 'Learning Management System',
      description: 'Online learning platform with video streaming, interactive assessments, progress tracking, and certificate generation.',
      membersCount: 12,
      status: 'Pending',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18',
      members: ['John Doe', 'Emma Wilson', 'James Brown', 'Olivia Davis', 'William Johnson', 'Sophia Miller', 'Benjamin Wilson', 'Isabella Moore', 'Lucas Anderson', 'Mia Taylor', 'Alexander Thomas', 'Charlotte Jackson']
    },
    {
      id: 5,
      name: 'AI Chatbot Integration',
      description: 'Advanced AI-powered chatbot with natural language processing, multi-language support, and seamless integration capabilities.',
      membersCount: 6,
      status: 'Active',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-21',
      members: ['John Doe', 'Ryan Clark', 'Natalie White', 'Kevin Martinez', 'Amanda Rodriguez', 'Daniel Lewis']
    },
    {
      id: 6,
      name: 'Data Analytics Dashboard',
      description: 'Comprehensive data visualization and analytics platform with real-time reporting, custom dashboards, and predictive analytics.',
      membersCount: 4,
      status: 'Pending',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
      members: ['John Doe', 'Victoria Hall', 'Christopher Allen', 'Rachel Young']
    }
  ]

  // Form state for create project modal
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    status: 'Active'
  })

  // Simulate API call
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

  // Filter and sort projects
  const filteredAndSortedProjects = projects
    .filter(project => filterStatus === 'all' || project.status.toLowerCase() === filterStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'members':
          return b.membersCount - a.membersCount
        default:
          return 0
      }
    })

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

  // Handle create project
  const handleCreateProject = (e) => {
    e.preventDefault()
    console.log('Creating project:', createForm)
    // Mock creating project
    const newProject = {
      id: projects.length + 1,
      name: createForm.name,
      description: createForm.description,
      membersCount: 1,
      status: createForm.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      members: ['John Doe']
    }
    setProjects([newProject, ...projects])
    setCreateForm({ name: '', description: '', status: 'Active' })
    setShowCreateModal(false)
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
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h4 className="text-white mb-0">
            <span className="brand-highlight">Code</span>Collab
          </h4>
        </div>
        
        <nav className="sidebar-nav">
          <a href="#" className="sidebar-nav-item" onClick={(e) => {
            e.preventDefault()
            handleNavigation('/dashboard')
          }}>
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </a>
          
          <a href="#" className="sidebar-nav-item active" onClick={(e) => {
            e.preventDefault()
            handleNavigation('/projects')
          }}>
            <i className="bi bi-folder"></i>
            <span>Projects</span>
          </a>
          
          <a href="#" className="sidebar-nav-item" onClick={(e) => {
            e.preventDefault()
            handleNavigation('/analytics')
          }}>
            <i className="bi bi-graph-up"></i>
            <span>Analytics</span>
          </a>
          
          <a href="#" className="sidebar-nav-item" onClick={(e) => {
            e.preventDefault()
            handleNavigation('/profile')
          }}>
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </a>
          
          <a href="#" className="sidebar-nav-item" onClick={(e) => {
            e.preventDefault()
            handleNavigation('/settings')
          }}>
            <i className="bi bi-gear"></i>
            <span>Settings</span>
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
            <h5 className="mb-0">Projects</h5>
          </div>
          
          <div className="d-flex align-items-center">
            <button className="btn btn-link text-dark p-2 me-2 position-relative">
              <i className="bi bi-bell fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                3
              </span>
            </button>
            
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
                    e.preventDefault()
                    setShowProfileDropdown(false)
                    handleNavigation('/profile')
                  }}>
                    <i className="bi bi-person"></i>
                    Profile
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => {
                    e.preventDefault()
                    setShowProfileDropdown(false)
                    handleNavigation('/settings')
                  }}>
                    <i className="bi bi-gear"></i>
                    Settings
                  </a>
                  <hr className="dropdown-divider" />
                  <a href="#" className="dropdown-item text-danger" onClick={(e) => {
                    e.preventDefault()
                    setShowProfileDropdown(false)
                    handleLogout()
                  }}>
                    <i className="bi bi-box-arrow-right"></i>
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-2">All Projects</h2>
              <p className="text-muted mb-0">Manage and track all your collaborative projects</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              New Project
            </button>
          </div>

          {/* Filter Bar */}
          <div className="filter-bar d-flex justify-content-between align-items-center">
            <div className="d-flex gap-3">
              <div>
                <label className="form-label fw-bold mb-1">Status</label>
                <select 
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              
              <div>
                <label className="form-label fw-bold mb-1">Sort by</label>
                <select 
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="members">Most Members</option>
                </select>
              </div>
            </div>
            
            <div className="text-muted">
              <strong>{filteredAndSortedProjects.length}</strong> projects found
            </div>
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
          {!loading && (
            <div className="row g-4">
              {filteredAndSortedProjects.map((project) => (
                <div key={project.id} className="col-lg-6 col-md-12">
                  <div className="project-card card h-100">
                    <div className="project-card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="card-title fw-bold mb-0">{project.name}</h5>
                        <span className={`project-status ${getStatusBadgeClass(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <p className="card-text text-muted mb-3">{project.description}</p>
                      
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-people text-muted me-2"></i>
                          <small className="text-muted">{project.membersCount} members</small>
                        </div>
                        <small className="text-muted">
                          Created {new Date(project.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      
                      <div className="members-list mb-3">
                        {project.members.slice(0, 3).map((member, index) => (
                          <span key={index} className="member-badge">{member}</span>
                        ))}
                        {project.members.length > 3 && (
                          <span className="member-badge">+{project.members.length - 3} more</span>
                        )}
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
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Project</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <form onSubmit={handleCreateProject}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Project Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={createForm.name}
                      onChange={(e) => setCreateForm({...createForm, name: e.target.value})}
                      placeholder="Enter project name"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea 
                      className="form-control"
                      rows="3"
                      value={createForm.description}
                      onChange={(e) => setCreateForm({...createForm, description: e.target.value})}
                      placeholder="Describe your project"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Initial Status</label>
                    <select 
                      className="form-select"
                      value={createForm.status}
                      onChange={(e) => setCreateForm({...createForm, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectsPage
