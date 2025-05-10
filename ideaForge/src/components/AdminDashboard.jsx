import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("");
  const [users, setUsers] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleCustomersClick = async () => {
    setSelectedMenu("customers");
    try {
      const response = await fetch("http://localhost:8051/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleFeedbackClick = () => {
    setSelectedMenu("feedback");
  };

  const handleReportsClick = () => {
    setSelectedMenu("reports");
  };

  return (
    <div className="admin-dashboard">
      <div className="Admin-sidebar">
        <h2>Admin Panel</h2>
        <ul className="Admin-menu">
          <li>
            <button onClick={handleCustomersClick}>Customers</button>
          </li>
          <li>
            <button onClick={handleFeedbackClick}>Feedback</button>
          </li>
          <li>
            <button onClick={handleReportsClick}>Reports</button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

      <div className="Admin-main-content">
        <h1>Welcome, Admin</h1>

        {selectedMenu === "customers" && (
          <div className="customer-card-container">
            <h2>Customer List</h2>
            <div className="customer-cards">
              {users.map((user, index) => (
                <div className="customer-card" key={index}>
                  <h3>{user.name}</h3>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedMenu === "feedback" && (
          <div className="feedback-section">
            <h2>User Feedback</h2>
            <ul>
              <li>
                <strong>Koushik M:</strong> Great platform, very intuitive!
              </li>
              <li>
                <strong>VIJAY K:</strong> Would love to see dark mode support.
              </li>
              <li>
                <strong>Praveen N:</strong> Quick and helpful customer service.
              </li>
            </ul>
          </div>
        )}

        {selectedMenu === "reports" && (
          <div className="report-section">
            <h2>System Reports</h2>
            <ul>
              <li>Total Users: 34</li>
              {/* <li>Active Sessions: 27</li> */}
              {/* <li>Monthly Signups: 46</li> */}
              <li>Total Likes to the Posts : 13</li>
              <li>Total Dislike to the Posts: 4</li>
              <li>Reported Issues: 3</li>
              {/* <li>Server Uptime: 99.98%</li> */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
