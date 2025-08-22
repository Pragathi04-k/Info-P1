import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function LandingPage() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('home');
  const [hoverStates, setHoverStates] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleNavClick = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleButtonHover = (buttonId, isHovering) => {
    setHoverStates(prev => ({
      ...prev,
      [buttonId]: isHovering
    }));
  };

  const handleButtonClick = (buttonId) => {
    setHoverStates(prev => ({
      ...prev,
      [buttonId]: 'clicked'
    }));

    setTimeout(() => {
      setHoverStates(prev => ({
        ...prev,
        [buttonId]: false
      }));
    }, 300);

    if (buttonId === 'scroll-top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    console.log(`Button ${buttonId} clicked`);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand fw-bold" href="#">
            <span className="brand-highlight">Code</span>Collab
          </a>

          {/* Mobile Toggle */}
          <button 
            className={`navbar-toggler ${hoverStates['nav-toggle'] === 'clicked' ? 'active' : ''}`} 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
            onMouseEnter={() => handleButtonHover('nav-toggle', true)}
            onMouseLeave={() => handleButtonHover('nav-toggle', false)}
            onClick={() => handleButtonClick('nav-toggle')}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} 
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('home');
                  }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeSection === 'features' ? 'active' : ''}`} 
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('features');
                  }}
                >
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('contact');
                  }}
                >
                  Contact
                </a>
              </li>

              {/* Login Button */}
              <li className="nav-item ms-2">
                <a 
                  href="#" 
                  className={`btn btn-outline-primary px-3 rounded-pill ${hoverStates['nav-login'] === 'clicked' ? 'btn-clicked' : ''}`}
                  onMouseEnter={() => handleButtonHover('nav-login', true)}
                  onMouseLeave={() => handleButtonHover('nav-login', false)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick('nav-login');
                    navigate('/login');
                  }}
                >
                  Login
                </a>
              </li>

              {/* Sign Up Button */}
              <li className="nav-item ms-2">
                <a 
                  href="#" 
                  className={`btn btn-primary px-3 rounded-pill ${hoverStates['nav-signup'] === 'clicked' ? 'btn-clicked' : ''}`}
                  onMouseEnter={() => handleButtonHover('nav-signup', true)}
                  onMouseLeave={() => handleButtonHover('nav-signup', false)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick('nav-signup');
                    navigate('/signup');
                  }}
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Collaborate Smarter: <span className="text-primary">AI-Powered Project Management for Modern Teams</span>
              </h1>
              <p className="lead text-muted-custom mb-4">
                Brainstorm ideas, manage projects, and chat in real-time — powered by AI.
              </p>
              <div className="d-flex gap-3 mb-4">
                <button 
                  className={`btn btn-primary btn-lg ${hoverStates['hero-cta'] === 'clicked' ? 'btn-clicked' : ''}`}
                  onMouseEnter={() => handleButtonHover('hero-cta', true)}
                  onMouseLeave={() => handleButtonHover('hero-cta', false)}
                  onClick={() => {
                    handleButtonClick('hero-cta');
                    navigate('/signup');
                  }}
                >
                  Start Brainstorming
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="dashboard-mockup">
                <div className="dashboard-mockup-header">
                  <div className="dot" style={{ backgroundColor: "#ff5f56" }}></div>
                  <div className="dot" style={{ backgroundColor: "#ffbd2e" }}></div>
                  <div className="dot" style={{ backgroundColor: "#27c93f" }}></div>
                </div>
                <img src="/kanban dashboard.png" alt="Dashboard Preview" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ... (Features, How It Works, Trusted By, Testimonials, Footer — unchanged) ... */}

      {/* Scroll to Top Button */}
      <div 
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''} ${hoverStates['scroll-top'] === 'clicked' ? 'btn-clicked' : ''}`}
        onMouseEnter={() => handleButtonHover('scroll-top', true)}
        onMouseLeave={() => handleButtonHover('scroll-top', false)}
        onClick={() => handleButtonClick('scroll-top')}
      >
        <i className="fas fa-arrow-up"></i>
      </div>
    </>
  )
}

export default LandingPage
