// src/pages/DashboardPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function DashboardPage() {
  const navigate = useNavigate();

  // State
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newRepoLink, setNewRepoLink] = useState("");
  const [user, setUser] = useState(null);

  const API_BASE = "http://localhost:8080";

  // ✅ Auth Guard + Load user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("loggedInUser");
    const email = localStorage.getItem("userEmail");

    if (!token) {
      navigate("/login");
      return;
    }
    setUser({ name, email });
  }, [navigate]);

  // ✅ Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/projects`);
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem("token")) {
      fetchProjects();
    }
  }, []);

  // ✅ Navigation helper
  const handleNavigation = (path) => navigate(path);

  // ✅ Open Project & Update Status
  const handleProjectClick = async (project) => {
    try {
      window.open(project.repoLink, "_blank");
      if (project.status?.toLowerCase() === "pending") {
        await axios.put(`${API_BASE}/projects/${project._id}`, {
          status: "Completed",
        });
        setProjects((prev) =>
          prev.map((p) =>
            p._id === project._id ? { ...p, status: "Completed" } : p
          )
        );
      }
    } catch (err) {
      console.error("Error updating project status:", err);
    }
  };

  // ✅ Delete Project
  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${API_BASE}/projects/${projectId}`);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  // ✅ Badge color
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-success";
      case "completed":
        return "bg-primary";
      case "pending":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  // ✅ Add Project
  const handleAddProject = async () => {
    if (!newRepoLink) return alert("Please enter repository link");
    try {
      const res = await axios.post(`${API_BASE}/projects`, {
        repoLink: newRepoLink,
        userEmail: user?.email, // associate by email
      });
      setProjects([res.data, ...projects]);
      setNewRepoLink("");
      setShowNewProjectModal(false);
    } catch (err) {
      console.error("Error adding project:", err);
      alert("Failed to add project");
    }
  };

  return (
    <>
      {/* Inline CSS */}
      <style>{`
        html, body { height: 100%; margin: 0; padding: 0; overflow: hidden; }
        .layout { display: flex; height: 100vh; width: 100%; }
        .sidebar {
          width: 180px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff; flex-shrink: 0; display: flex; flex-direction: column;
        }
        .sidebar-header { padding: 1.2rem; font-size: 1.2rem; font-weight: bold; text-align: center; }
        .sidebar-nav { margin-top: 1rem; flex-grow: 1; }
        .sidebar-nav-item { display: flex; align-items: center; gap: .5rem; padding: .7rem .9rem; color: #fff; text-decoration: none; border-radius: 8px; transition: all .3s; }
        .sidebar-nav-item:hover { background: rgba(255,255,255,0.15); }
        .main-content {
          flex: 1; padding: 2rem; background: #f8f9fa;
          display: flex; flex-direction: column; align-items: center;
          overflow-y: auto;
        }
        .main-content > * { max-width: 1400px; width: 100%; }
        .top-navbar { display: flex; justify-content: space-between; align-items: center; padding: .75rem 1rem; background: #fff; border-bottom: 1px solid #dee2e6; margin-bottom: 1.5rem; border-radius: 8px; }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); gap: 1.5rem; width: 100%; }
        .project-card { border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); background: #fff; padding: 1rem; transition: transform .2s, box-shadow .2s; }
        .project-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
        .project-status { font-size: .7rem; font-weight: 600; padding: .25rem .6rem; border-radius: 12px; }
        .empty-state { text-align: center; padding: 3rem 1rem; color: #6c757d; }
        .empty-state-icon { font-size: 3.5rem; margin-bottom: 1rem; opacity: 0.5; }
        .dropdown-menu.show { display: block; position: absolute; right: 0; margin-top: 10px; }
      `}</style>

      <div className="layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">CodeCollab</div>
          <nav className="sidebar-nav">
            {["Dashboard", "Projects", "Analytics", "Profile", "Settings"].map(
              (item, i) => (
                <a
                  href="#"
                  key={i}
                  className="sidebar-nav-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(`/${item.toLowerCase()}`);
                  }}
                >
                  <i
                    className={`bi bi-${
                      ["speedometer2", "folder", "graph-up", "person", "gear"][i]
                    }`}
                  ></i>
                  {item}
                </a>
              )
            )}
          </nav>
        </div>

        {/* Main */}
        <div className="main-content">
          {/* Navbar */}
          <div className="top-navbar">
            <h5>Dashboard</h5>
            <div className="d-flex align-items-center position-relative">
              <div className="profile-dropdown">
                <button
                  className="btn btn-link text-dark d-flex align-items-center"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <div
                    className="bg-primary rounded-circle text-white d-flex justify-content-center align-items-center me-2"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <i className="bi bi-person"></i>
                  </div>
                  <span>{user?.name || "..."}</span>
                  <i className="bi bi-chevron-down ms-1"></i>
                </button>
                {showProfileDropdown && (
                  <div className="dropdown-menu show">
                    <span className="dropdown-item-text">{user?.email}</span>
                    <hr className="dropdown-divider" />
                    <a
                      href="#"
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Welcome */}
          <div className="mb-4 text-center">
            <h2>Welcome back, {user?.name || "..."}</h2>
            <p className="text-muted">
              Here's what's happening with your projects today.
            </p>
          </div>

          {/* Projects */}
          <div className="d-flex align-items-center mb-4 w-100">
            <h4>Your Projects</h4>
            <div className="ms-auto">
              <button
                className="btn btn-primary"
                onClick={() => setShowNewProjectModal(true)}
              >
                <i className="bi bi-plus-circle me-2"></i>New Project
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : projects.length > 0 ? (
            <div className="projects-grid">
              {projects.map((p) => (
                <div key={p._id} className="project-card">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">{p.repoLink}</h6>
                    <span
                      className={`project-status ${getStatusBadgeClass(
                        p.status
                      )}`}
                    >
                      {p.status || "Pending"}
                    </span>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleProjectClick(p)}
                    >
                      Open Project
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteProject(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="bi bi-folder-x"></i>
              </div>
              <h4>No projects yet</h4>
              <button
                className="btn btn-primary"
                onClick={() => setShowNewProjectModal(true)}
              >
                Create Project
              </button>
            </div>
          )}

          {/* New Project Modal */}
          {showNewProjectModal && (
            <div
              className="modal show d-block"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5>Add New Project</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowNewProjectModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <label>Repository Link</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newRepoLink}
                      onChange={(e) => setNewRepoLink(e.target.value)}
                      placeholder="https://github.com/user/repo"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowNewProjectModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleAddProject}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
