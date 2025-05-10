import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Ensure your styles are correctly applied

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just simulate successful login
    localStorage.setItem("authToken", "your-auth-token-here"); // Set the auth token
    navigate('/dashboard'); // Redirect to the dashboard after login
  };

  return (
    <div className="admin-login-container">
      <div className="form-container">
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Log In as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
