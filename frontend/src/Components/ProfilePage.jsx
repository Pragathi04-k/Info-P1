import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

function ProfilePage() {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const [user, setUser] = useState(null)
  const [userStats, setUserStats] = useState({
    projectsCount: 0,
    tasksCompleted: 0,
    collaborations: 0,
    contributions: 0
  })

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser")
    const userEmail = localStorage.getItem("userEmail")

    if (!loggedInUser || !userEmail) {
      navigate("/login")
    } else {
      setUser({
        name: loggedInUser,
        email: userEmail,
        role: "Developer",
        joinedDate: "2023-06-15",
        bio: "Passionate about building scalable applications.",
        location: "Unknown",
        website: "",
        github: "",
        linkedin: ""
      })

      setUserStats({
        projectsCount: 6,
        tasksCompleted: 47,
        collaborations: 23,
        contributions: 156
      })
    }
  }, [navigate])

  const [editForm, setEditForm] = useState({})
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
        bio: user.bio,
        location: user.location,
        website: user.website,
        github: user.github,
        linkedin: user.linkedin
      })
    }
  }, [user])

  const handleNavigation = (path) => navigate(path)
  const handleLogout = () => { localStorage.clear(); navigate('/login') }
  const handleEditProfile = (e) => {
    e.preventDefault()
    setUser({ ...user, ...editForm })
    setShowEditModal(false)
  }

  const getRoleBadgeClass = (role) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'bg-danger'
      case 'manager': return 'bg-warning text-dark'
      case 'developer': return 'bg-primary'
      case 'designer': return 'bg-info'
      default: return 'bg-secondary'
    }
  }

  if (!user) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarCollapsed ? '70px' : '220px',
        backgroundColor: '#343a40',
        color: '#fff',
        transition: 'all 0.3s',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '20px', fontWeight: 'bold', fontSize: '18px', textAlign: 'center' }}>
          <span style={{ color: '#0d6efd' }}>Code</span>Collab
        </div>
        <nav style={{ flexGrow: 1 }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleNavigation('/dashboard') }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              color: '#fff',
              textDecoration: 'none',
              backgroundColor: '#0d6efd',
              transition: '0.3s'
            }}
          >
            <i className="bi bi-speedometer2" style={{ marginRight: sidebarCollapsed ? 0 : '10px' }}></i>
            {!sidebarCollapsed && <span>Dashboard</span>}
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
        <div style={{
          height: '60px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #dee2e6',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            className="btn btn-link text-dark p-0"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <i className="bi bi-list fs-4"></i>
          </button>
          <h5 style={{ margin: 0 }}>My Profile</h5>
          <div className="dropdown">
            <button
              className="btn btn-link text-dark d-flex align-items-center"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div style={{
                width: '32px', height: '32px',
                borderRadius: '50%',
                backgroundColor: '#0d6efd',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                marginRight: '8px'
              }}>
                <i className="bi bi-person"></i>
              </div>
              <span>{user.name}</span>
              <i className="bi bi-chevron-down ms-1"></i>
            </button>
            {showProfileDropdown && (
              <div className="dropdown-menu show" style={{ right: 0, left: 'auto' }}>
                <a href="#" className="dropdown-item text-danger"
                  onClick={(e) => { e.preventDefault(); handleLogout() }}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Profile Section */}
        <div style={{ padding: '30px', flexGrow: 1 }}>
          <div className="row g-4">
            {/* Profile Card */}
            <div className="col-lg-4">
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                padding: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px', height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#e9ecef',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0 auto 15px',
                  fontSize: '32px'
                }}>
                  <i className="bi bi-person"></i>
                </div>
                <h3 className="fw-bold">{user.name}</h3>
                <span className={`badge ${getRoleBadgeClass(user.role)} mb-2`}>
                  {user.role.toUpperCase()}
                </span>
                <p className="text-muted">{user.email}</p>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => setShowEditModal(true)}
                >
                  <i className="bi bi-pencil me-2"></i>Edit Profile
                </button>
              </div>
            </div>

            {/* Stats & Info */}
            <div className="col-lg-8">
              <div className="row g-4 mb-4">
                {[
                  { label: 'Projects', value: userStats.projectsCount },
                  { label: 'Tasks', value: userStats.tasksCompleted },
                  { label: 'Collabs', value: userStats.collaborations },
                  { label: 'Contribs', value: userStats.contributions }
                ].map((stat, idx) => (
                  <div className="col-md-3 col-sm-6" key={idx}>
                    <div style={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      padding: '20px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '22px', fontWeight: 'bold' }}>{stat.value}</div>
                      <div style={{ color: '#6c757d' }}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                padding: '20px'
              }}>
                <h5 className="fw-bold mb-3">Personal Information</h5>
                <p><i className="bi bi-envelope me-2"></i><strong>Email:</strong> {user.email}</p>
                <p><i className="bi bi-calendar me-2"></i><strong>Joined:</strong> {new Date(user.joinedDate).toLocaleDateString()}</p>
                {user.location && <p><i className="bi bi-geo-alt me-2"></i><strong>Location:</strong> {user.location}</p>}
                {user.bio && <p><i className="bi bi-info-circle me-2"></i><strong>Bio:</strong> {user.bio}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <form onSubmit={handleEditProfile}>
                <div className="modal-body">
                  <input type="text" className="form-control mb-3" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                  <input type="email" className="form-control mb-3" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                  <textarea className="form-control mb-3" rows="3" value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}></textarea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
