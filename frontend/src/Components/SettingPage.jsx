import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function SettingsPage() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Mock user data
  const [user] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    avatar: null,
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    inAppNotifications: true,
    projectUpdates: true,
    taskReminders: false,
    weeklyDigest: true,
    securityAlerts: true,
  });

  // Form submission states
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle logout
  const handleLogout = () => {
    navigate('/login');
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    setPasswordLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Password change requested:', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordLoading(false);
      setPasswordSuccess(true);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setPasswordSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Handle notification toggle
  const handleNotificationToggle = (setting) => {
    setNotifications((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    console.log(`${setting} toggled to:`, !notifications[setting]);
  };

  return (
    <>
      {/* Custom CSS - Same as Dashboard */}
      <style>{`
        .brand-highlight { color: #00c2ff; }
        .sidebar { width: 250px; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); transition: all 0.3s ease; position: fixed; left: 0; top: 0; z-index: 1000; }
        .sidebar.collapsed { width: 70px; }
        .sidebar-header { padding: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        .sidebar-nav { padding: 1rem 0; }
        .sidebar-nav-item { display: flex; align-items: center; padding: 0.75rem 1rem; color: rgba(255,255,255,0.8); text-decoration: none; transition: all 0.3s ease; border-left: 3px solid transparent; }
        .sidebar-nav-item:hover, .sidebar-nav-item.active { color: #fff; background-color: rgba(255,255,255,0.1); border-left-color: #00c2ff; text-decoration: none; }
        .sidebar-nav-item i { width: 20px; margin-right: 10px; text-align: center; }
        .sidebar.collapsed .sidebar-nav-item span { display: none; }
        .main-content { margin-left: 250px; min-height: 100vh; background-color: #f8f9fa; transition: all 0.3s ease; }
        .main-content.expanded { margin-left: 70px; }
        .top-navbar { background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; }
        .settings-card { background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 2rem; margin-bottom: 2rem; }
        .settings-section-title { color: #495057; font-weight: 600; font-size: 1.25rem; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e9ecef; }
        .notification-item { display: flex; justify-content: between; align-items: center; padding: 1rem 0; border-bottom: 1px solid #e9ecef; }
        .notification-item:last-child { border-bottom: none; }
        .notification-info { flex-grow: 1; }
        .notification-title { font-weight: 600; color: #495057; margin-bottom: 0.25rem; }
        .notification-description { color: #6c757d; font-size: 0.9rem; }
        .form-switch { padding-left: 2.5em; }
        .form-check-input:checked { background-color: #00c2ff; border-color: #00c2ff; }
        .btn-primary { background-color: #00c2ff; border-color: #00c2ff; transition: all 0.3s ease; }
        .btn-primary:hover { background-color: #0099cc; border-color: #0099cc; transform: translateY(-2px); }
        .btn-danger { transition: all 0.3s ease; }
        .btn-danger:hover { transform: translateY(-2px); }
        .danger-zone { background: #fff5f5; border: 1px solid #fed7d7; border-radius: 12px; padding: 2rem; }
        .danger-zone-title { color: #c53030; font-weight: 600; font-size: 1.25rem; margin-bottom: 1rem; }
        .profile-dropdown { position: relative; }
        .dropdown-menu { position: absolute; top: 100%; right: 0; background: #fff; border: 1px solid #dee2e6; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); min-width: 200px; z-index: 1001; }
        .dropdown-item { display: flex; align-items: center; padding: 0.5rem 1rem; color: #495057; text-decoration: none; transition: background-color 0.3s ease; }
        .dropdown-item:hover { background-color: #f8f9fa; color: #495057; text-decoration: none; }
        .dropdown-item i { margin-right: 0.5rem; width: 16px; }
        .alert-success { background-color: #d4edda; border-color: #c3e6cb; color: #155724; }
        .password-requirements { font-size: 0.875rem; color: #6c757d; margin-top: 0.5rem; }
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.show { transform: translateX(0); }
          .main-content { margin-left: 0; }
          .main-content.expanded { margin-left: 0; }
          .notification-item { flex-direction: column; align-items: flex-start; gap: 1rem; }
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
          <a href="#" className="sidebar-nav-item" onClick={(e) => { e.preventDefault(); handleNavigation('/dashboard'); }}>
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </a>
          <a href="#" className="sidebar-nav-item" onClick={(e) => { e.preventDefault(); handleNavigation('/projects'); }}>
            <i className="bi bi-folder"></i>
            <span>Projects</span>
          </a>
          <a href="#" className="sidebar-nav-item" onClick={(e) => { e.preventDefault(); handleNavigation('/analytics'); }}>
            <i className="bi bi-graph-up"></i>
            <span>Analytics</span>
          </a>
          <a href="#" className="sidebar-nav-item" onClick={(e) => { e.preventDefault(); handleNavigation('/profile'); }}>
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </a>
          <a href="#" className="sidebar-nav-item active" onClick={(e) => { e.preventDefault(); handleNavigation('/settings'); }}>
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
            <button className="btn btn-link text-dark p-0 me-3" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              <i className="bi bi-list fs-4"></i>
            </button>
            <h5 className="mb-0">Settings</h5>
          </div>

          <div className="d-flex align-items-center">
            <button className="btn btn-link text-dark p-2 me-2 position-relative">
              <i className="bi bi-bell fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>3</span>
            </button>

            <div className="profile-dropdown">
              <button className="btn btn-link text-dark p-0 d-flex align-items-center" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
                <div className="bg-primary rounded-circle d-flex justify-content-center align-items-center text-white me-2" style={{ width: '32px', height: '32px' }}>
                  <i className="bi bi-person"></i>
                </div>
                <span className="me-1">{user.name}</span>
                <i className="bi bi-chevron-down"></i>
              </button>

              {showProfileDropdown && (
                <div className="dropdown-menu show">
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setShowProfileDropdown(false); handleNavigation('/profile'); }}>
                    <i className="bi bi-person"></i>
                    Profile
                  </a>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); setShowProfileDropdown(false); handleNavigation('/settings'); }}>
                    <i className="bi bi-gear"></i>
                    Settings
                  </a>
                  <hr className="dropdown-divider" />
                  <a href="#" className="dropdown-item text-danger" onClick={(e) => { e.preventDefault(); setShowProfileDropdown(false); handleLogout(); }}>
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
          <div className="mb-4">
            <h2 className="fw-bold mb-2">Account Settings</h2>
            <p className="text-muted">Manage your account preferences and security settings</p>
          </div>

          <div className="row">
            <div className="col-lg-8">
              {/* Security Section */}
              <div className="settings-card">
                <h3 className="settings-section-title">
                  <i className="bi bi-shield-lock me-2"></i>
                  Security
                </h3>

                {passwordSuccess && (
                  <div className="alert alert-success" role="alert">
                    <i className="bi bi-check-circle me-2"></i>
                    Password updated successfully!
                  </div>
                )}

                <form onSubmit={handlePasswordChange}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold">Current Password</label>
                      <input type="password" className="form-control" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} placeholder="Enter your current password" required />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold">New Password</label>
                      <input type="password" className="form-control" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} placeholder="Enter new password" minLength="8" required />
                      <div className="password-requirements">Password must be at least 8 characters long</div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold">Confirm New Password</label>
                      <input type="password" className="form-control" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} placeholder="Confirm new password" minLength="8" required />
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary" disabled={passwordLoading}>
                        {passwordLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Updating...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-shield-check me-2"></i>
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Notifications Section */}
              <div className="settings-card">
                <h3 className="settings-section-title">
                  <i className="bi bi-bell me-2"></i>
                  Notifications
                </h3>

                {Object.entries(notifications).map(([key, value]) => (
                  <div className="notification-item" key={key}>
                    <div className="notification-info">
                      <div className="notification-title">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="notification-description">Toggle {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</div>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked={value} onChange={() => handleNotificationToggle(key)} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Danger Zone */}
              <div className="danger-zone">
                <h3 className="danger-zone-title">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Danger Zone
                </h3>
                <p className="text-muted mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="btn btn-danger" disabled title="This feature is disabled in the demo">
                  <i className="bi bi-trash me-2"></i>
                  Delete Account
                </button>
                <div className="mt-2">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    This feature is disabled in the demo version
                  </small>
                </div>
              </div>
            </div>

            {/* Settings Summary Sidebar */}
            <div className="col-lg-4">
              <div className="settings-card">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-person-circle me-2"></i>
                  Account Summary
                </h5>

                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary rounded-circle d-flex justify-content-center align-items-center text-white me-3" style={{ width: '48px', height: '48px' }}>
                    <i className="bi bi-person"></i>
                  </div>
                  <div>
                    <div className="fw-bold">{user.name}</div>
                    <div className="text-muted small">{user.email}</div>
                  </div>
                </div>

                <hr />

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Role</span>
                    <span className="badge bg-danger">{user.role.toUpperCase()}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Email Notifications</span>
                    <span className={`badge ${notifications.emailNotifications ? 'bg-success' : 'bg-secondary'}`}>
                      {notifications.emailNotifications ? 'ON' : 'OFF'}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">In-app Notifications</span>
                    <span className={`badge ${notifications.inAppNotifications ? 'bg-success' : 'bg-secondary'}`}>
                      {notifications.inAppNotifications ? 'ON' : 'OFF'}
                    </span>
                  </div>
                </div>

                <div className="alert alert-info" role="alert">
                  <i className="bi bi-lightbulb me-2"></i>
                  <strong>Tip:</strong> Keep security alerts enabled to stay informed about important account changes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
