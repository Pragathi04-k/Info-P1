import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function ProjectsPage() {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ userId: "", repoLink: "" });

  // check login
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userEmail = localStorage.getItem("userEmail");
    if (!loggedInUser || !userEmail) {
      navigate("/login");
    } else {
      setUser({
        name: loggedInUser,
        email: userEmail,
      });
    }
  }, [navigate]);

  // fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8080/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userId || !form.repoLink) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/projects", form);
      setProjects([res.data, ...projects]);
      setForm({ userId: "", repoLink: "" });
    } catch (err) {
      console.error("Error adding project:", err);
      alert("Failed to add project");
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Inline Styles */}
      <style>{`
        body {
          margin: 0;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f8f9fa;
        }
        .layout {
          display: flex;
          height: 100vh;
        }
        .sidebar {
          width: 220px;
          background: #343a40;
          color: white;
          padding: 20px 10px;
          display: flex;
          flex-direction: column;
        }
        .sidebar h4 {
          color: #fff;
          margin-bottom: 20px;
        }
        .sidebar button {
          background: #495057;
          border: none;
          color: white;
          padding: 10px;
          border-radius: 6px;
          text-align: left;
          margin-bottom: 10px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .sidebar button:hover {
          background: #6c757d;
        }
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .top-navbar {
          background: #fff;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ddd;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .profile-dropdown {
          position: relative;
        }
        .profile-dropdown .dropdown-menu {
          position: absolute;
          right: 0;
          top: 120%;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 6px;
          box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
          padding: 5px 0;
          min-width: 160px;
        }
        .dropdown-item {
          padding: 8px 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #333;
        }
        .dropdown-item:hover {
          background: #f5f5f5;
        }
        .content {
          padding: 20px;
          overflow-y: auto;
          flex: 1;
        }
      `}</style>

      <div className="layout">
        {/* Sidebar */}
        <div className="sidebar">
          <h4>Menu</h4>
          <button onClick={() => navigate("/dashboard")}>
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </button>
        </div>

        {/* Main Section */}
        <div className="main">
          {/* Top Navbar */}
          <div className="top-navbar">
            <h5 className="mb-0">Projects</h5>

            <div className="d-flex align-items-center gap-3">
              <div className="user-info text-end">
                <strong>{user.name}</strong>
                <br />
                <small>{user.email}</small>
              </div>
              <div className="profile-dropdown">
                <button
                  className="btn btn-link text-dark p-0 d-flex align-items-center"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <div
                    className="bg-primary rounded-circle d-flex justify-content-center align-items-center text-white me-2"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <i className="bi bi-person"></i>
                  </div>
                  <i className="bi bi-chevron-down"></i>
                </button>

                {showProfileDropdown && (
                  <div className="dropdown-menu show">
                    <a
                      href="#"
                      className="dropdown-item text-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowProfileDropdown(false);
                        handleLogout();
                      }}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="content">
            {/* Add Project Form */}
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="row g-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    name="userId"
                    value={form.userId}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter user ID"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="repoLink"
                    value={form.repoLink}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter repository link"
                  />
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-primary w-100">
                    Add
                  </button>
                </div>
              </div>
            </form>

            {/* Projects List */}
            {projects.length > 0 ? (
              <ul className="list-group">
                {projects.map((p) => (
                  <li
                    key={p._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      <strong>User:</strong> {p.userId} <br />
                      <strong>Repo:</strong>{" "}
                      <a href={p.repoLink} target="_blank" rel="noreferrer">
                        {p.repoLink}
                      </a>
                    </span>
                    <small className="text-muted">
                      {new Date(p.createdAt).toLocaleString()}
                    </small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No projects found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
