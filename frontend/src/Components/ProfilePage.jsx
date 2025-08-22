import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

function ProfilePage() {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  
  // Mock user data
  const [user, setUser] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    joinedDate: '2023-06-15',
    avatar: null,
    bio: 'Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies. Passionate about building scalable applications and leading development teams.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    github: 'johndoe',
    linkedin: 'john-doe-dev'
  })

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    location: user.location,
    website: user.website,
    github: user.github,
    linkedin: user.linkedin
  })

  // User statistics
  const [userStats] = useState({
    projectsCount: 6,
    tasksCompleted: 47,
    collaborations: 23,
    contributions: 156
  })

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path)
  }

  // Handle logout
  const handleLogout = () => {
    navigate('/login')
  }

  // Handle edit profile
  const handleEditProfile = (e) => {
    e.preventDefault()
    console.log('Updating profile:', editForm)
    // Update user data
    setUser({
      ...user,
      name: editForm.name,
      email: editForm.email,
      bio: editForm.bio,
      location: editForm.location,
      website: editForm.website,
      github: editForm.github,
      linkedin: editForm.linkedin
    })
    setShowEditModal(false)
  }

  // Get role badge class
  const getRoleBadgeClass = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-danger'
      case 'manager':
        return 'bg-warning text-dark'
      case 'developer':
        return 'bg-primary'
      case 'designer':
        return 'bg-info'
      default:
        return 'bg-secondary'
    }
  }

  return (
    <>
      {/* Custom CSS - Same as Dashboard */}
      <style>
        {`
          .brand-highlight {
            color: #00c2ff;
          }
          
          .sidebar {
            width: 250px;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.3s ease;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1000;
          }
          
          .sidebar.collapsed {
            width: 70px;
          }
          
          .sidebar-header {
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .sidebar-nav {
            padding: 1rem 0;
          }
          
          .sidebar-nav-item {
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s ease;
            border-left: 3px solid transparent;
          }
          
          .sidebar-nav-item:hover,
          .sidebar-nav-item.active {
            color: #fff;
            background-color: rgba(255, 255, 255, 0.1);
            border-left-color: #00c2ff;
            text-decoration: none;
          }
          
          .sidebar-nav-item i {
            width: 20px;
            margin-right: 10px;
            text-align: center;
          }
          
          .sidebar.collapsed .sidebar-nav-item span {
            display: none;
          }
          
          .main-content {
            margin-left: 250px;
            min-height: 100vh;
            background-color: #f8f9fa;
            transition: all 0.3s ease;
          }
          
          .main-content.expanded {
            margin-left: 70px;
          }
          
          .top-navbar {
            background: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 1rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .profile-card {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          
          .profile-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 2rem;
            text-align: center;
            color: white;
          }
          
          .profile-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            font-size: 3rem;
          }
          
          .profile-body {
            padding: 2rem;
          }
          
          .stats-card {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            text-align: center;
            transition: all 0.3s ease;
          }
          
          .stats-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }
          
          .stats-number {
            font-size: 2rem;
            font-weight: bold;
            color: #00c2ff;
            margin-bottom: 0.5rem;
          }
          
          .stats-label {
            color: #6c757d;
            font-weight: 500;
            font-size: 0.9rem;
          }
          
          .info-card {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
          }
          
          .info-item {
            display: flex;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid #e9ecef;
          }
          
          .info-item:last-child {
            border-bottom: none;
          }
          
          .info-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #e9ecef;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            color: #6c757d;
          }
          
          .btn-primary {
            background-color: #00c2ff;
            border-color: #00c2ff;
            transition: all 0.3s ease;
          }
          
          .btn-primary:hover {
            background-color: #0099cc;
            border-color: #0099cc;
            transform: translateY(-2px);
          }
          
          .profile-dropdown {
            position: relative;
          }
          
          .dropdown-menu {
            position: absolute;
            top: 100%;
            right: 0;
            background: #fff;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            min-width: 200px;
            z-index: 1001;
          }
          
          .dropdown-item {
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem;
            color: #495057;
            text-decoration: none;
            transition: background-color 0.3s ease;
          }
          
          .dropdown-item:hover {
            background-color: #f8f9fa;
            color: #495057;
            text-decoration: none;
          }
          
          .dropdown-item i {
            margin-right: 0.5rem;
            width: 16px;
          }
          
          .social-link {
            color: #00c2ff;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          
          .social-link:hover {
            color: #0099cc;
            text-decoration: underline;
          }
          
          @media (max-width: 768px) {
            .sidebar {
              transform: translateX(-100%);
            }
            
            .sidebar.show {
              transform: translateX(0);
            }
            
            .main-content {
              margin-left: 0;
            }
            
            .main-content.expanded {
              margin-left: 0;
            }
            
            .profile-avatar {
              width: 100px;
              height: 100px;
              font-size: 2.5rem;
            }
            
            .stats-number {
              font-size: 1.5rem;
            }
          }
        `}
      </style>

      {/* Sidebar */}
      <div className={sidebar ${sidebarCollapsed ? 'collapsed' : ''}}>
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
          
          <a href="#" className="sidebar-nav-item" onClick={(e) => {
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
          
          <a href="#" className="sidebar-nav-item active" onClick={(e) => {
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
      <div className={main-content ${sidebarCollapsed ? 'expanded' : ''}}>
        {/* Top Navbar */}
        <div className="top-navbar">
          <div className="d-flex align-items-center">
            <button 
              className="btn btn-link text-dark p-0 me-3"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <i className="bi bi-list fs-4"></i>
            </button>
            <h5 className="mb-0">My Profile</h5>
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
          <div className="row g-4">
            {/* Profile Card */}
            <div className="col-lg-4">
              <div className="profile-card">
                <div className="profile-header">
                  <div className="profile-avatar">
                    <i className="bi bi-person"></i>
                  </div>
                  <h3 className="fw-bold mb-2">{user.name}</h3>
                  <span className={badge ${getRoleBadgeClass(user.role)} mb-3}>
                    {user.role.toUpperCase()}
                  </span>
                  <p className="mb-0 opacity-75">{user.email}</p>
                </div>
                
                <div className="profile-body">
                  <div className="d-grid">
                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        setEditForm({
                          name: user.name,
                          email: user.email,
                          bio: user.bio,
                          location: user.location,
                          website: user.website,
                          github: user.github,
                          linkedin: user.linkedin
                        })
                        setShowEditModal(true)
                      }}
                    >
                      <i className="bi bi-pencil me-2"></i>
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* User Statistics */}
            <div className="col-lg-8">
              <div className="row g-4 mb-4">
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card">
                    <div className="stats-number">{userStats.projectsCount}</div>
                    <div className="stats-label">Projects</div>
                  </div>
                </div>
                
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card">
                    <div className="stats-number">{userStats.tasksCompleted}</div>
                    <div className="stats-label">Tasks Completed</div>
                  </div>
                </div>
                
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card">
                    <div className="stats-number">{userStats.collaborations}</div>
                    <div className="stats-label">Collaborations</div>
                  </div>
                </div>
                
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card">
                    <div className="stats-number">{userStats.contributions}</div>
                    <div className="stats-label">Contributions</div>
                  </div>
                </div>
              </div>
              
              {/* User Details */}
              <div className="info-card">
                <h5 className="fw-bold mb-4">Personal Information</h5>
                
                <div className="info-item">
                  <div className="info-icon">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div>
                    <div className="fw-bold">Email</div>
                    <div className="text-muted">{user.email}</div>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <i className="bi bi-calendar"></i>
                  </div>
                  <div>
                    <div className="fw-bold">Joined Date</div>
                    <div className="text-muted">{new Date(user.joinedDate).toLocaleDateString()}</div>
                  </div>
                </div>
                
                {user.location && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <div>
                      <div className="fw-bold">Location</div>
                      <div className="text-muted">{user.location}</div>
                    </div>
                  </div>
                )}
                
                {user.bio && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="bi bi-info-circle"></i>
                    </div>
                    <div>
                      <div className="fw-bold">Bio</div>
                      <div className="text-muted">{user.bio}</div>
                    </div>
                  </div>
                )}
                
                {(user.website || user.github || user.linkedin) && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="bi bi-link-45deg"></i>
                    </div>
                    <div>
                      <div className="fw-bold">Social Links</div>
                      <div className="d-flex flex-wrap gap-3 mt-2">
                        {user.website && (
                          <a href={user.website} target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="bi bi-globe me-1"></i>Website
                          </a>
                        )}
                        {user.github && (
                          <a href={https://github.com/${user.github}} target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="bi bi-github me-1"></i>GitHub
                          </a>
                        )}
                        {user.linkedin && (
                          <a href={https://linkedin.com/in/${user.linkedin}} target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="bi bi-linkedin me-1"></i>LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <form onSubmit={handleEditProfile}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Bio</label>
                      <textarea 
                        className="form-control"
                        rows="3"
                        value={editForm.bio}
                        onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                        placeholder="Tell us about yourself"
                      ></textarea>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Location</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={editForm.location}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        placeholder="City, Country"
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Website</label>
                      <input 
                        type="url" 
                        className="form-control"
                        value={editForm.website}
                        onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">GitHub Username</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={editForm.github}
                        onChange={(e) => setEditForm({...editForm, github: e.target.value})}
                        placeholder="your-github-username"
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">LinkedIn Username</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={editForm.linkedin}
                        onChange={(e) => setEditForm({...editForm, linkedin: e.target.value})}
                        placeholder="your-linkedin-username"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
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

export default ProfilePage
