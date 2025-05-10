import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage"; // Make sure this exists
import AboutPage from "./components/AboutPage";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage"; // Ensure this component is correct
import PostForm from "./components/PostCreationForm ";
import AdminDashboard from "./components/AdminDashboard";
import Blog from "./components/Blog"; // Import Blog component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-post" element={<PostForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/blog" element={<Blog />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
