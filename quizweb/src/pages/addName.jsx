import React, { useState } from 'react';
import './addName.css';

function AddName({ onSubmitName }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmitName(name.trim());
    }
  };

  return (
    <div className="add-name-wrapper">
      <div className="add-name-card">
        <img src="https://firebasestorage.googleapis.com/v0/b/um-ar-d0418.firebasestorage.app/o/portfolio(tumpang)%2Fquizweb%2Fperson%20image.png?alt=media&token=8f8b1654-2104-47f7-80ef-c4d45dd2c919" alt="Quiz Illustration" className="name-illustration" />
        <form onSubmit={handleSubmit} className="name-form">
          <h2 className="name-title">Welcome to the Worksheet - Quiz Style!</h2>
          <p className="name-subtitle">Please enter your name to begin</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="name-input"
          />
          <button type="submit" className="start-button">Start Quiz</button>
        </form>
      </div>
    </div>
  );
}

export default AddName;