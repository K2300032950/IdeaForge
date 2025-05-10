import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

// Import local feature images
import discussionsImg from "../assets/p1.jpg";
import userModerationImg from "../assets/p2.jpg";
import upvoteDownvoteImg from "../assets/p4.jpg";
import topicCategoriesImg from "../assets/p3.jpg";

// Import developer images
import vijayImg from "../assets/m3.jpg";
import praveenImg from "../assets/m1.jpg";
import koushikImg from "../assets/m2.jpg";

const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#2d2d2d",
    color: "#eaeaea",
    height: "100vh", // Full height of the screen
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#ADD8E6",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid rgb(95, 164, 183)",
    width: "100%", // Full width of the screen
  },
  headerTitle: {
    fontSize: "2.5rem",
    color: "#fff",
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: "1rem",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
  },
  main: {
    flex: 1, // Allow this section to grow and take available space
    maxWidth: "100%", // Full width of the screen
    margin: "3rem auto",
    padding: "0 1rem",
  },
  section: {
    marginBottom: "2rem",
    backgroundColor: "#333",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  },
  sectionTitle: {
    fontSize: "1rem",
    color: "#f1f1f1",
    marginBottom: "2rem",
  },
  featureList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "2rem",
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  featureItem: {
    backgroundColor: "#444",
    padding: "1.5rem",
    borderRadius: "8px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.3s",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
  },
  featureImage: {
    width: "100px",
    height: "90px",
    marginBottom: "1rem",
    objectFit: "cover",
    borderRadius: "8px",
  },
  featureTitle: {
    color: "#ff7f50",
    fontSize: "1.4rem",
    marginBottom: "1rem",
  },
  featureDesc: {
    fontSize: "1rem",
    color: "#ccc",
  },
  developerContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
  },
  devCard: {
    backgroundColor: "#444",
    borderRadius: "12px",
    padding: "1.5rem",
    textAlign: "center",
    boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  devImage: {
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    objectFit: "cover",
    marginBottom: "1rem",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
    boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
  },
  devImageHover: {
    transform: "scale(1.1)",
    boxShadow: "0 0 20px rgba(0, 255, 255, 0.8)",
  },
  devInfo: {
    margin: "8px 0",
    color: "#ccc",
  },
  footer: {
    backgroundColor: "#ADD8E6",
    textAlign: "center",
    padding: "0.7rem 0.5rem",
    fontSize: "1rem",
    color: "#fff",
    borderTop: "2px solid rgb(106, 165, 186)",
    width: "100%", // Full width of the screen
  },
  footerLink: {
    color: "#fff",
    textDecoration: "none",
  },
};

const developers = [
  {
    name: "K. Vijay",
    email: "vijaykollu6@gmail.com",
    contact: "9059461684",
    img: vijayImg,
  },
  {
    name: "N. Praveen",
    email: "n.praveen9961@gmail.com",
    contact: "9553792663",
    img: praveenImg,
  },
  {
    name: "M. Koushik",
    email: "m.koushik5432@gmail.com",
    contact: "7799777212",
    img: koushikImg,
  },
];

const AboutPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>IdeaForge</h1>
        <nav style={styles.nav}>
          <button onClick={() => navigate("/")}>Home</button>{" "}
          {/* Use navigate() */}
        </nav>
      </header>

      <main style={styles.main}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>About IdeaForge</h2>
          <p>
            IdeaForge is a collaborative platform that provides a space for
            users to engage in meaningful discussions, share knowledge, and seek
            answers to their questions. Whether you're a beginner looking for
            advice or an expert sharing insights, IdeaForge connects people with
            shared interests and helps them solve real-world problems together.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Key Features</h2>
          <ul style={styles.featureList}>
            {[
              {
                src: discussionsImg,
                title: "Discussion Threads",
                desc: "Post queries, share ideas, and contribute to threads across various topics.",
              },
              {
                src: userModerationImg,
                title: "User Moderation",
                desc: "Moderate posts and comments to ensure a respectful and constructive environment.",
              },
              {
                src: upvoteDownvoteImg,
                title: "Upvote & Downvote",
                desc: "Vote on responses to highlight the most useful and relevant content.",
              },
              {
                src: topicCategoriesImg,
                title: "Topic Categorization",
                desc: "Easily navigate and discover discussions by categories and subtopics.",
              },
            ].map((item, idx) => (
              <li style={styles.featureItem} key={idx}>
                <img
                  src={item.src}
                  alt={item.title}
                  style={styles.featureImage}
                />
                <h4 style={styles.featureTitle}>{item.title}</h4>
                <p style={styles.featureDesc}>{item.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Developed By</h2>
          <div style={styles.developerContainer}>
            {developers.map((dev, idx) => (
              <div
                style={styles.devCard}
                key={idx}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img");
                  Object.assign(img.style, styles.devImageHover);
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img");
                  img.style.transform = "";
                  img.style.boxShadow = styles.devImage.boxShadow;
                }}
              >
                <img src={dev.img} alt={dev.name} style={styles.devImage} />
                <p style={styles.devInfo}>
                  <strong>Name:</strong> {dev.name}
                </p>
                <p style={styles.devInfo}>
                  <strong>Email:</strong> {dev.email}
                </p>
                <p style={styles.devInfo}>
                  <strong>Contact:</strong> {dev.contact}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>
          &copy; 2025 IdeaForge. Connecting people with shared ideas. |{" "}
          <a style={styles.footerLink} href="#">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a style={styles.footerLink} href="#">
            Terms of Use
          </a>
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
