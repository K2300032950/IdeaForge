import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

// Import the video from the assets folder
import blogVideo from "../assets/idea.mp4"; // Replace with your actual video file name

const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#000", // Black background
    color: "#fff", // White text
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // Ensures content starts from the top of the screen
    alignItems: "center",
    minHeight: "100vh", // Ensure the body takes full screen height
    width: "100vw", // Ensure body takes full width of the screen
    overflowX: "hidden", // Prevent horizontal scroll
    position: "relative", // Positioning for the Home button
  },
  container: {
    width: "100vw", // Full width of the screen
    minHeight: "100%", // Full height of screen
    padding: "2rem",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",
  },
  header: {
    marginBottom: "2rem",
    color: "#fff", // Change header text to white
    zIndex: 1, // Ensure the header is above the video
  },
  videoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2rem",
    width: "100%", // Full width
    position: "relative",
    zIndex: 0, // Ensure video is behind content
  },
  video: {
    width: "100%", // Full width of the screen
    height: "auto", // Adjust height to maintain aspect ratio
    maxHeight: "80vh", // Limit video height to 80% of the viewport height
    objectFit: "cover", // Make sure video fills the screen without stretching
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  content: {
    fontSize: "1.2rem",
    lineHeight: "1.8",
    color: "#fff", // Change content text to white
    maxWidth: "900px",
    padding: "0 20px",
    zIndex: 1, // Ensure content stays above video
  },
  button: {
    padding: "0.8rem 2rem",
    fontSize: "1rem",
    backgroundColor: "#007bff", // Blue color (same as before)
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "2rem",
    transition: "background-color 0.3s ease",
    zIndex: 1, // Ensure button is above video
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  homeButton: {
    position: "absolute", // Position it absolutely
    top: "1rem", // 1rem from the top
    right: "1rem", // 1rem from the right
    padding: "0.8rem 2rem",
    fontSize: "1rem",
    backgroundColor: "#007bff", // Same blue as the "Watch Video" button
    color: "#fff", // White text
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    zIndex: 2, // Ensure it is above other content
  },
  homeButtonHover: {
    backgroundColor: "#0056b3", // Darker blue on hover
  },
};

const Blog = () => {
  const [showVideo, setShowVideo] = useState(false); // State to toggle video visibility
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleVideo = () => {
    setShowVideo(!showVideo); // Toggle the video visibility
  };

  const goHome = () => {
    navigate("/"); // Navigate to the homepage
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            Curious Minds
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#ddd" }}>
            A brief description of the blog post that gives an overview of the
            content.
          </p>
        </header>

        {/* Button to toggle video visibility */}
        <button
          style={styles.button}
          onClick={toggleVideo}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          {showVideo ? "Hide Video" : "Watch Video"}
        </button>

        {/* Video section */}
        {showVideo && (
          <section style={styles.videoContainer}>
            <video
              style={styles.video}
              controls
              src={blogVideo}
              type="video/mp4"
            >
              Your browser does not support the video tag.
            </video>
          </section>
        )}

        <section style={styles.content}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            About the Video
          </h2>
          <p>
            In this blog post, we are showcasing some interesting content that
            is discussed in the video above. The video dives deep into the topic
            and provides useful insights. Make sure to watch the video to get
            the full experience!
          </p>
        </section>
      </div>

      {/* Home button in the top-right corner */}
      <button
        style={styles.homeButton}
        onClick={goHome}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Home
      </button>
    </div>
  );
};

export default Blog;
