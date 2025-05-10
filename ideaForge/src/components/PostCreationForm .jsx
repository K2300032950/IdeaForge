import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PostCreationForm.css";
import backgroundImage from "../assets/pb3.jpg";

const PostCreationForm = () => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [fileDomain, setFileDomain] = useState(""); // Initialize as an empty string
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerToggle = (index) => {
    if (correctAnswers.includes(index)) {
      setCorrectAnswers(correctAnswers.filter((i) => i !== index));
    } else {
      setCorrectAnswers([...correctAnswers, index]);
    }
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    setCorrectAnswers(correctAnswers.filter((i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    const formData = new FormData();
    if (fileDomain !== "q/a" && file) {
      formData.append("file", file);
    }

    formData.append("description", description);
    formData.append("fileDomain", fileDomain);
    formData.append("userName", userName);
    formData.append("userEmail", userEmail);

    if (fileDomain === "q/a") {
      formData.append("question", question);
      formData.append("options", JSON.stringify(options));
      formData.append("correctAnswers", JSON.stringify(correctAnswers));

      // Add the image if provided for Q/A
      if (file) {
        formData.append("file", file);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/media/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div
      className="background-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay"></div>

      <div className="animated-heading">
        <h1>📤 Upload Your Content</h1>
        <p>Share your thoughts, media, and ideas with the world.</p>
      </div>

      <div className="post-form-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back To Dashboard
        </button>

        <form onSubmit={handleSubmit} className="post-form">
          <label>Post Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Domain:</label>
          <select
            value={fileDomain}
            onChange={(e) => setFileDomain(e.target.value)}
            required
          >
            <option value="">Select Domain</option>
            <option value="games">Games</option>
            <option value="technology">Technology</option>
            <option value="news">News</option>
            <option value="q/a">Q/A</option>
            <option value="sports">Sports</option>
          </select>

          {fileDomain === "q/a" && (
            <div className="qa-section">
              <label>Question:</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />

              <label>Options:</label>
              {options.map((option, index) => (
                <div key={index} className="option-input">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={correctAnswers.includes(index)}
                      onChange={() => handleCorrectAnswerToggle(index)}
                    />
                    Correct
                  </label>
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    disabled={options.length <= 1}
                  >
                    ❌
                  </button>
                </div>
              ))}
              <button type="button" onClick={addOption}>
                ➕ Add Option
              </button>

              {/* File Upload for Q/A */}
              <label>Upload Image (optional):</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
          )}

          {fileDomain !== "q/a" && (
            <>
              <label>Upload File:</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </>
          )}

          <button type="submit">Submit Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostCreationForm;
