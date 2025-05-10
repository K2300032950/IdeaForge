import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import axios from "axios";
import video1 from "../assets/video1.mp4";
import logo from "../assets/logo1.png";
import "./style.css";

const HomePage = () => {
  const [isSignupVisible, setSignupVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isAdminLoginVisible, setAdminLoginVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [adminData, setAdminData] = useState({ email: "", password: "" });

  const navigate = useNavigate(); // Initialize navigate for routing

  const toggleSignupForm = () => {
    setSignupVisible(true);
    setLoginVisible(false);
    setAdminLoginVisible(false);
  };

  const toggleLoginForm = () => {
    setLoginVisible(true);
    setSignupVisible(false);
    setAdminLoginVisible(false);
  };

  const toggleAdminLoginForm = () => {
    setAdminLoginVisible(true);
    setLoginVisible(false);
    setSignupVisible(false);
  };

  const closeForm = () => {
    setSignupVisible(false);
    setLoginVisible(false);
    setAdminLoginVisible(false);
  };

  const navigateToAbout = () => {
    navigate("/about");
  };

  const navigateToBlog = () => {
    navigate("/blog"); // Navigate to the Blog page
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleAdminLoginInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Prepare the data for signup (Ensure it includes the correct properties for User)
    const signupPayload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    axios
      .post("http://localhost:8051/user", signupPayload) // Send POST request to the correct signup endpoint
      .then((response) => {
        alert("Signup successful!");
        setSignupVisible(false); // Hide signup form after successful submission
        setLoginVisible(true); // Show login form
      })
      .catch((error) => {
        console.error("Signup error:", error);
        alert("Error during signup.");
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8051/check", loginData)
      .then((response) => {
        const userRole = response.data.role; // Assuming backend sends role

        if (userRole === "admin") {
          // Redirect to admin dashboard
          navigate("/admin/dashboard");
        } else {
          // Regular user logic
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("userName", response.data.name);
          localStorage.setItem("userEmail", response.data.email);
          closeForm();
          navigate("/dashboard"); // User dashboard
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Login failed. Please try again.");
      });
  };

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8051/api/admin/login", adminData)
      .then((response) => {
        alert("Admin login successful!");
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminEmail", response.data.email);
        closeForm();
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        console.error("Admin login error:", error);
        alert("Admin login failed.");
      });
  };

  return (
    <div className="home-page">
      <video className="background-video" src={video1} autoPlay loop muted />
      <img className="logo" src={logo} alt="Idea Forge Logo" />
      <h1 className="animated-title">
        Welcome to the <span>Idea Forge 💡🗣️</span>!
      </h1>

      <div className="content">
        <h2 className="animated-subtitle">Engage, Share, and Collaborate</h2>
        <p className="animated-description">
          Join discussions, post your questions, share knowledge, and be a part
          of a vibrant community.
        </p>
      </div>

      <div className="buttons">
        <button className="about-btn" onClick={navigateToAbout}>
          About
        </button>
        <button className="me-btn" onClick={navigateToAbout}>
          Explore
        </button>
      </div>
      <div className="home-btns">
        <button className="Home-btn">Home</button>
      </div>
      <div className="blog-btn">
        <button className="Blog-btn" onClick={navigateToBlog}>
          Blog
        </button>
      </div>
      <div className="signin-btn">
        <button className="signin-btn" onClick={toggleSignupForm}>
          SignUp
        </button>
      </div>

      {/* Signup Form */}
      {isSignupVisible && (
        <div className="form-container">
          <form className="signup-form" onSubmit={handleSignupSubmit}>
            <button type="button" className="close-btn" onClick={closeForm}>
              ×
            </button>
            <h2>Sign Up</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleSignupInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleSignupInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleSignupInputChange}
                required
              />
            </div>
            <div className="btn">
              <button type="submit" className="submit-btn">
                SignUp
              </button>
            </div>
            <p className="switch-form" onClick={toggleLoginForm}>
              Already have an account? Log In
            </p>
          </form>
        </div>
      )}

      {/* User Login Form */}
      {isLoginVisible && (
        <div className="form-container">
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <button type="button" className="close-btn" onClick={closeForm}>
              ×
            </button>
            <h2>Log In</h2>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginInputChange}
                required
              />
            </div>
            <div className="btns">
              <button type="submit" className="submit-btn">
                Log In
              </button>
            </div>
            <p className="switch-form" onClick={toggleSignupForm}>
              Don't have an account? Sign Up
            </p>
            <p
              className="switch-form"
              onClick={toggleAdminLoginForm}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Login as Admin
            </p>
          </form>
        </div>
      )}

      {/* Admin Login Form */}
      {isAdminLoginVisible && (
        <div className="form-container">
          <form className="login-form" onSubmit={handleAdminLoginSubmit}>
            <button type="button" className="close-btn" onClick={closeForm}>
              ×
            </button>
            <h2>Admin Login</h2>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={adminData.email}
                onChange={handleAdminLoginInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={adminData.password}
                onChange={handleAdminLoginInputChange}
                required
              />
            </div>
            <div className="btns">
              <button type="submit" className="submit-btn">
                Login as Admin
              </button>
            </div>
            <p className="switch-form" onClick={toggleLoginForm}>
              Back to User Login
            </p>
          </form>
        </div>
      )}

      <footer className="footer">
        <p>
          &copy; 2025 IdeaForge. Connecting people with shared ideas. | Privacy
          Policy | Terms of Use
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
