import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

import userImg from '../assets/user.png'; 



function LandingPage() {

  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('home');

  const [hoverStates, setHoverStates] = useState({});

  const [showScrollTop, setShowScrollTop] = useState(false);



  const handleNavClick = (section) => {

    setActiveSection(section);

    const element = document.getElementById(section);

    if (element) element.scrollIntoView({ behavior: 'smooth' });

  };



  const handleButtonHover = (buttonId, isHovering) => {

    setHoverStates(prev => ({ ...prev, [buttonId]: isHovering }));

  };



  const handleButtonClick = (buttonId) => {

    setHoverStates(prev => ({ ...prev, [buttonId]: 'clicked' }));

    setTimeout(() => setHoverStates(prev => ({ ...prev, [buttonId]: false })), 300);

    if (buttonId === 'scroll-top') window.scrollTo({ top: 0, behavior: 'smooth' });

  };



  useEffect(() => {

    const handleScroll = () => setShowScrollTop(window.scrollY > 300);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, []);



  // --- Inline Styles ---

  const heroSectionStyle = {

    minHeight: '100vh',

    width: '100vw',

    display: 'flex',

    alignItems: 'center',

    justifyContent: 'flex-start',

    background: 'linear-gradient(135deg, #87CEFA 0%, #f0f8ff 100%)',

    color: '#0a1f44',

    position: 'relative',

    overflow: 'hidden',

    margin: 0,

    padding: '0 5%',

    boxSizing: 'border-box',

  };



  const gradientTextStyle = {

    background: 'linear-gradient(90deg, #1e3c72, #2a5298)',

    WebkitBackgroundClip: 'text',

    WebkitTextFillColor: 'transparent',

  };



  const heroTextStyle = {

    maxWidth: '600px',

  };



  const heroImgStyle = {

    position: 'absolute',

    right: '5%',

    top: '20%',

    borderRadius: '15px',

    boxShadow: '0 10px 30px rgba(30, 60, 114, 0.3)',

    maxWidth: '300px',

    height: 'auto',

  };



  const chatbotWrapperStyle = {

    position: 'absolute',

    right: '5%',

    top: 'calc(20% + 320px)', // just below the image

    display: 'flex',

    flexDirection: 'column',

    alignItems: 'center',

    gap: '8px',

  };



  const chatbotIconStyle = {

    background: '#1e90ff',

    color: '#fff',

    width: '60px',

    height: '60px',

    borderRadius: '50%',

    display: 'flex',

    justifyContent: 'center',

    alignItems: 'center',

    cursor: 'pointer',

    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',

    transition: 'all 0.3s ease',

    fontSize: '1.5rem',

  };



  const chatbotTextStyle = {

    color: '#1e3c72',

    fontWeight: '500',

    fontSize: '0.9rem',

    textAlign: 'center',

  };



  const btnGradientStyle = {

    background: 'linear-gradient(90deg, #1e90ff, #00bfff)',

    border: 'none',

    color: '#fff',

    transition: 'all 0.3s ease',

    boxShadow: hoverStates['hero-cta'] ? '0 10px 20px rgba(30, 60, 114, 0.2)' : 'none',

    transform: hoverStates['hero-cta'] ? 'translateY(-3px)' : 'translateY(0)',

  };



  const scrollTopStyle = {

    position: 'fixed',

    bottom: '40px',

    right: '40px',

    background: '#1e3c72',

    color: '#fff',

    width: '50px',

    height: '50px',

    borderRadius: '50%',

    display: 'flex',

    justifyContent: 'center',

    alignItems: 'center',

    cursor: 'pointer',

    opacity: showScrollTop ? 1 : 0,

    visibility: showScrollTop ? 'visible' : 'hidden',

    transition: 'all 0.4s ease',

    zIndex: 99,

  };



  const brandStyle = {

    background: 'linear-gradient(90deg, #1e90ff, #00bfff)',

    WebkitBackgroundClip: 'text',

    WebkitTextFillColor: 'transparent',

    fontSize: '1.5rem',

    fontWeight: 'bold',

  };



  const navTextStyle = {

    color: '#ffffff',

    fontWeight: '500',

  };



  return (

    <>

      {/* Navigation Bar */}

      <nav

        className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top"

        style={{ backgroundColor: "#343a40" }}

      >

        <div className="container">

          <a className="navbar-brand" href="#" style={brandStyle}>

            CodeCollab

          </a>

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

          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav ms-auto align-items-center">

              {['home', 'features', 'contact'].map(sec => (

                <li className="nav-item" key={sec}>

                  <a

                    className="nav-link"

                    href={`#${sec}`}

                    style={navTextStyle}

                    onClick={(e) => { e.preventDefault(); handleNavClick(sec); }}

                  >

                    {sec.charAt(0).toUpperCase() + sec.slice(1)}

                  </a>

                </li>

              ))}

              <li className="nav-item ms-2">

                <button

                  className="btn btn-outline-light px-3 rounded-pill"

                  onClick={() => navigate('/login')}

                >

                  Login

                </button>

              </li>

              <li className="nav-item ms-2">

                <button

                  className="btn px-4 rounded-pill"

                  style={btnGradientStyle}

                  onMouseEnter={() => handleButtonHover('hero-cta', true)}

                  onMouseLeave={() => handleButtonHover('hero-cta', false)}

                  onClick={() => navigate('/signup')}

                >

                  Sign Up

                </button>

              </li>

            </ul>

          </div>

        </div>

      </nav>



      {/* Hero Section */}

      <section id="home" style={heroSectionStyle}>

        <div style={heroTextStyle}>

          <h1 className="display-4 fw-bold mb-4" style={{ lineHeight: '1.2' }}>

            Collaborate Smarter: <span style={gradientTextStyle}>AI-Powered Project Management</span>

          </h1>

          <p className="lead mb-4">

            Brainstorm ideas, manage projects, and chat in real-time — powered by AI.

          </p>

          <button

            className="btn btn-lg px-4 py-2"

            style={btnGradientStyle}

            onMouseEnter={() => handleButtonHover('hero-cta', true)}

            onMouseLeave={() => handleButtonHover('hero-cta', false)}

            onClick={() => navigate('/signup')}

          >

            Start Brainstorming

          </button>

        </div>



        {/* Image fixed to right corner */}

        <img

          src={userImg}

          alt="Dashboard Preview"

          style={heroImgStyle}

        />



        {/* Chatbot Icon + Text */}

        <div style={chatbotWrapperStyle}>

          <div

            style={chatbotIconStyle}

            onClick={() => window.open("https://codecollab-chat-1.onrender.com/", "_blank")}

            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}

            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}

          >

            <i className="fas fa-robot"></i>

          </div>

          <p style={chatbotTextStyle}>Click me, I will help you</p>

        </div>

      </section>



      {/* Scroll to Top */}

      <div style={scrollTopStyle} onClick={() => handleButtonClick('scroll-top')}>

        <i className="fas fa-arrow-up"></i>

      </div>

    </>

  );

}



export default LandingPage;