import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/feedback', {
        userId,
        message,
      });
      
      if (response.status === 200) {
        setStatus('✅ Feedback submitted successfully!');
      }
    } catch (error) {
      setStatus('❌ Failed to submit feedback.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Your feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
      </form>
      {status && <p style={{ marginTop: '10px', color: 'green' }}>{status}</p>}
    </div>
  );
};

export default FeedbackForm;
