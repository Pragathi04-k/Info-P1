// frontend/src/pages/AnalyticsPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const styles = {
  layout: {
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#eef2f7",
    color: "#333",
  },
  sidebar: {
    background: "linear-gradient(to bottom, #4a00e0, #8e2de2)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "30px 20px",
    boxShadow: "3px 0 15px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  sidebarHeader: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "40px",
    textAlign: "center",
    letterSpacing: "1px",
  },
  sidebarNavItem: {
    margin: "15px 0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "10px",
    fontWeight: 500,
    transition: "all 0.3s",
  },
  mainContent: {
    padding: "35px 50px",
    overflowY: "auto",
    width: "100%",
  },
  topNavbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  horizontalCardsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    marginBottom: "30px",
  },
  horizontalCard: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    padding: "20px",
    transition: "all 0.3s",
    minHeight: "180px",
  },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
  },
  projectCard: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    minHeight: "180px",
  },
  cardHeading: {
    marginBottom: "12px",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  pieChart: {
    maxWidth: "220px",
    margin: "0 auto",
  },
  selectProject: {
    maxWidth: "450px",
    marginBottom: "25px",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px",
    color: "#555",
  },
  languageBadge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "12px",
    margin: "5px 5px 0 0",
    color: "#fff",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
};

// Generate language color
const getLanguageColor = (lang) => {
  const colors = {
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    C: "#555555",
    "C++": "#f34b7d",
    TypeScript: "#2b7489",
    default: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
  };
  return colors[lang] || colors.default;
};

class AnalyticsErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("AnalyticsErrorBoundary caught an error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.emptyState}>
          <i className="fas fa-exclamation-triangle" style={{ fontSize: "2rem" }}></i>
          <h3>Something went wrong</h3>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function AnalyticsPageContent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [projectAnalytics, setProjectAnalytics] = useState({
    contributors: [],
    commits: [],
    languages: {},
    collaborators: [],
  });

  const GITHUB_API_BASE = "https://api.github.com";
  const GITHUB_TOKEN = import.meta.env.VITE_REACT_APP_GITHUB_TOKEN || "";
  const headers = GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {};

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:8080/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Fetch analytics
  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!projects.length) return;

      const selectedProject = projects[selectedProjectIndex];
      if (!selectedProject || !selectedProject.repoLink) return;

      const repoLink = selectedProject.repoLink;
      const [owner, repo] = repoLink.replace("https://github.com/", "").replace(/\/$/, "").split("/");

      try {
        const [contributorsRes, commitsRes, languagesRes, collaboratorsRes] = await Promise.all([
          axios.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors`, { headers }).catch(() => ({ data: [] })),
          axios.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=30`, { headers }).catch(() => ({ data: [] })),
          axios.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`, { headers }).catch(() => ({ data: {} })),
          axios.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}/collaborators`, { headers: { ...headers, Accept: "application/vnd.github+json" } }).catch(() => ({ data: [] })),
        ]);

        setProjectAnalytics({
          contributors: contributorsRes.data || [],
          commits: commitsRes.data || [],
          languages: languagesRes.data || {},
          collaborators: collaboratorsRes.data || [],
        });
      } catch (err) {
        console.error("Failed to fetch analytics:", err.response?.data || err.message);
        setProjectAnalytics({ contributors: [], commits: [], languages: {}, collaborators: [] });
      }
    };

    fetchAnalytics();
  }, [selectedProjectIndex, projects]);

  if (loading) return <div style={styles.emptyState}><i className="fas fa-spinner fa-spin"></i> Loading analytics...</div>;

  const commitChartData = {
    labels: projectAnalytics.contributors.map(c => c.login),
    datasets: [{
      label: 'Commits',
      data: projectAnalytics.contributors.map(c => c.contributions),
      backgroundColor: projectAnalytics.contributors.map((_, idx) => `hsl(${(idx*60)%360},70%,50%)`),
      borderWidth: 1
    }]
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>CodeCollab</div>
        {["Dashboard","Projects","Analytics","Profile","Settings"].map((item, idx) => (
          <div
            key={idx}
            style={styles.sidebarNavItem}
            onClick={() => navigate(`/${item.toLowerCase()}`)}
          >
            <i className={`bi bi-${["speedometer2","folder","graph-up","person","gear"][idx]}`}></i> {item}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.topNavbar}>
          <h3>Project Analytics</h3>
        </div>

        {/* Project Selector */}
        {projects.length > 0 && (
          <div className="mb-4" style={styles.selectProject}>
            <select
              className="form-select"
              value={selectedProjectIndex}
              onChange={(e) => setSelectedProjectIndex(Number(e.target.value))}
            >
              {projects.map((p, idx) => (
                <option key={idx} value={idx}>{p.repoLink}</option>
              ))}
            </select>
          </div>
        )}

        {/* Contributors + Commits */}
        <div style={styles.horizontalCardsContainer}>
          <div style={styles.horizontalCard}>
            <h5 style={styles.cardHeading}>Contributors</h5>
            {projectAnalytics.contributors.length ? (
              <ul>
                {projectAnalytics.contributors.map(c => (
                  <li key={c.id}>{c.login} ({c.contributions} commits)</li>
                ))}
              </ul>
            ) : <p>No contributors found.</p>}
          </div>

          <div style={styles.horizontalCard}>
            <h5 style={styles.cardHeading}>Recent Commits</h5>
            {projectAnalytics.commits.length ? (
              <ul>
                {projectAnalytics.commits.slice(0, 5).map(c => (
                  <li key={c.sha}>
                    <strong>{c.commit?.author?.name || "Unknown"}</strong>: {c.commit?.message || "No message"}
                  </li>
                ))}
              </ul>
            ) : <p>No recent commits found.</p>}
          </div>
        </div>

        {/* Grid */}
        <div style={styles.projectsGrid}>
          <div style={{...styles.projectCard, textAlign:"center"}}>
            <h5 style={styles.cardHeading}>Commits Distribution</h5>
            {projectAnalytics.contributors.length ? <div style={styles.pieChart}><Pie data={commitChartData} /></div> : <p>No commits found.</p>}
          </div>

          <div style={styles.projectCard}>
            <h5 style={styles.cardHeading}>Languages</h5>
            {Object.keys(projectAnalytics.languages).length ? (
              <div>
                {Object.entries(projectAnalytics.languages).map(([lang, lines]) => (
                  <span key={lang} style={{...styles.languageBadge, backgroundColor: getLanguageColor(lang)}}>
                    {lang}: {lines} lines
                  </span>
                ))}
              </div>
            ) : <p>No languages found.</p>}
          </div>

          <div style={styles.projectCard}>
            <h5 style={styles.cardHeading}>Collaborators</h5>
            {projectAnalytics.collaborators.length ? (
              <ul>
                {projectAnalytics.collaborators.map(col => <li key={col.id}>{col.login}</li>)}
              </ul>
            ) : <p>No collaborators found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <AnalyticsErrorBoundary>
      <AnalyticsPageContent />
    </AnalyticsErrorBoundary>
  );
}
