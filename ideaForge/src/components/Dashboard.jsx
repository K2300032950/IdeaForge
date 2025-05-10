import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Gamepad2,
  Cpu,
  Newspaper,
  MessageSquare,
  Trophy,
  PlusSquareIcon,
  User,
  MoreHorizontal,
  Flame,
  Lock,
  Award,
} from "lucide-react";
import PostList from "./PostList";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showStreakCard, setShowStreakCard] = useState(false);
  const [streakCount, setStreakCount] = useState(7); // Example: user has 7-day streak
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/");
    }

    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }

    if (activeSection === "Home") {
      fetch("http://localhost:8080/media/all")
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .catch((err) => console.error("Failed to fetch all posts:", err));
    }

    window.history.replaceState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, [navigate, activeSection]);

  const handleSectionClick = (section) => {
    if (section === "Create Post") {
      navigate("/create-post");
    } else {
      setActiveSection(section);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("darkMode");
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <aside className="sidebar">
        <div className="top">
          <h2>IDEA⤷FORGE</h2>
        </div>
        <ul>
          <li
            onClick={() => handleSectionClick("Home")}
            className={activeSection === "Home" ? "active" : ""}
          >
            <Home size={18} /> Home
          </li>
          <li
            onClick={() => handleSectionClick("Games")}
            className={activeSection === "Games" ? "active" : ""}
          >
            <Gamepad2 size={18} /> Fun
          </li>
          <li
            onClick={() => handleSectionClick("Technology")}
            className={activeSection === "Technology" ? "active" : ""}
          >
            <Cpu size={18} /> Technology
          </li>
          <li
            onClick={() => handleSectionClick("News")}
            className={activeSection === "News" ? "active" : ""}
          >
            <Newspaper size={18} /> News
          </li>
          <li
            onClick={() => handleSectionClick("q/a")}
            className={activeSection === "q/a" ? "active" : ""}
          >
            <MessageSquare size={18} /> Q&As
          </li>
          <li
            onClick={() => handleSectionClick("Sports")}
            className={activeSection === "Sports" ? "active" : ""}
          >
            <Trophy size={18} /> Sports
          </li>
          <li
            onClick={() => handleSectionClick("Create Post")}
            className={activeSection === "Create Post" ? "active" : ""}
          >
            <PlusSquareIcon size={18} /> Create Post
          </li>
          <li
            onClick={handleProfileClick}
            className={activeSection === "Profile" ? "active" : ""}
          >
            <User size={18} /> Profile
          </li>
          <li
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={isMoreOpen ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            <MoreHorizontal size={18} /> More
          </li>
          {isMoreOpen && (
            <ul className="more-submenu">
              <li onClick={handleLogout}>🔓 Logout</li>
              <li onClick={toggleDarkMode}>
                🌓 {darkMode ? "Light Mode" : "Dark Mode"}
              </li>
            </ul>
          )}
        </ul>
      </aside>

      <main className="body">
        <h2>{activeSection}</h2>

        {activeSection === "Home" ? (
          <PostList posts={posts} domain="Home" />
        ) : (
          <PostList domain={activeSection} />
        )}

        {/* 🔥 Streak Icon */}
        <div
          className="streak-icon"
          onClick={() => setShowStreakCard(!showStreakCard)}
        >
          <Flame color="orange" />
          <span>{streakCount}d</span>
        </div>

        {/* 📜 Streak Card */}
        {showStreakCard && (
          <div className="streak-card">
            <h3>Your Streak: {streakCount} days</h3>
            <p>Login daily and post a video/image to maintain your streak.</p>
            <div className="badge-row">
              <div
                className={`badge ${streakCount >= 25 ? "unlocked" : "locked"}`}
              >
                <Award size={20} /> 25 Days
                {streakCount < 25 && <Lock size={16} className="lock-icon" />}
              </div>
              <div
                className={`badge ${streakCount >= 50 ? "unlocked" : "locked"}`}
              >
                <Award size={20} /> 50 Days
                {streakCount < 50 && <Lock size={16} className="lock-icon" />}
              </div>
              <div
                className={`badge ${
                  streakCount >= 100 ? "unlocked" : "locked"
                }`}
              >
                <Award size={20} /> 100 Days
                {streakCount < 100 && <Lock size={16} className="lock-icon" />}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
