import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

function SignupPage() {
  const navigate = useNavigate();
  
  // State for form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Password match check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    try {
      setLoading(true)
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Signup failed")

      alert("Signup successful! Please login.")
      navigate('/login')   // ✅ redirect to login after success

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <section className="signup-section position-relative">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="signup-card">
              <div className="text-center mb-4">
                <h2 className="fw-bold">
                  <a href="/" className="text-decoration-none" onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                  }}>
                    <span className="brand-highlight">Code</span><span style={{ color: '#000' }}>Collab</span>
                  </a>
                </h2>
                <p className="text-muted">Create your account and start collaborating</p>
              </div>
              
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input 
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input 
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input 
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2 mb-3"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </form>
              
              <div className="signup-divider">
                <span>OR</span>
              </div>
              
              <div className="login-link">
                <p className="mb-0">
                  Already have an account?{" "}
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}>Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupPage
