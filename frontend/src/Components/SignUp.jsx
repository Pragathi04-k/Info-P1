import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name, email and password are required");
    }
    try {
      const url = `http://localhost:8080/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw", // ✅ full width
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // ✅ center horizontally
        background: "linear-gradient(135deg, #0f0f0f, #1a2e1a, #0d0d0d)",
        fontFamily: "Arial, sans-serif",
        margin: "0", // ✅ remove unwanted body margin
        padding: "0",
      }}
    >
      {/* Signup Box */}
      <div
        style={{
          background: "rgba(0,0,0,0.75)",
          border: "1px solid rgba(34,197,94,0.5)",
          borderRadius: "20px",
          padding: "40px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 0 30px rgba(34,197,94,0.5)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#22c55e",
            marginBottom: "25px",
            textShadow: "0 0 10px rgba(34,197,94,0.6)",
          }}
        >
          Create Account
        </h1>

        <form
          onSubmit={handleSignup}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label style={{ color: "#ccc", fontSize: "14px", fontWeight: "500" }}>
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter your name..."
              value={signupInfo.name}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ color: "#ccc", fontSize: "14px", fontWeight: "500" }}>
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ color: "#ccc", fontSize: "14px", fontWeight: "500" }}>
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={signupInfo.password}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "10px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(90deg, #22c55e, #15803d)",
              color: "#fff",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg,#16a34a,#14532d)")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #22c55e, #15803d)")
            }
          >
            Sign Up
          </button>

          <p
            style={{
              fontSize: "14px",
              color: "#bbb",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#22c55e",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </p>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
