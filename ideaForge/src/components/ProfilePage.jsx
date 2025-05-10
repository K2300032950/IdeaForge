import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [isPicEnlarged, setIsPicEnlarged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (userName && userEmail) {
      setProfile({
        name: userName,
        email: userEmail,
        followers: 0,
        following: 0,
        posts: 0,
      });
    }
  }, [navigate]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleProfilePicEnlarge = () => {
    setIsPicEnlarged(!isPicEnlarged);
  };

  return (
    <div className="profile-page">
      {profile ? (
        <div className="profile-container">
          <div className="profile-pic-section">
            <div className="upload-wrapper">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className={`profile-pic ${isPicEnlarged ? 'enlarged' : ''}`}
                  onClick={toggleProfilePicEnlarge}
                />
              ) : (
                <div className="profile-pic-placeholder">Upload Picture</div>
              )}
              <label htmlFor="profile-pic-upload" className="upload-btn">+</label>
              <input
                id="profile-pic-upload"
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="file-input"
              />
            </div>
            <div className="user-stats">
              <div className="stat"><span>{profile.posts}</span><p>Posts</p></div>
              <div className="stat"><span>{profile.followers}</span><p>Followers</p></div>
              <div className="stat"><span>{profile.following}</span><p>Following</p></div>
            </div>
            <div className="user-details">
              <h3>{profile.name}</h3>
              <p>{profile.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      <button className="back-btn" onClick={() => navigate('/dashboard')}>
  ← Back to Dashboard
</button>

    </div>
  );
};

export default ProfilePage;
