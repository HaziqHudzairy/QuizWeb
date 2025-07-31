import React from 'react'
import './answerButton.css'

const AnswerButton = ({ answer, onClick, isActive, variant, disabled }) => {
  let iconClass = '';
  if (variant === 'correct') iconClass = 'bi bi-check-circle-fill';
  else if (variant === 'wrong') iconClass = 'bi bi-x-circle-fill';

  return (
    <button
      className={`ab-btn ${isActive ? 'active' : ''} ${variant || ''}`}
      onClick={disabled ? null : onClick}
      disabled={disabled}
    >
      <span className="ab-front">
        <span className="ab-dot"></span>
        <span className="ab-text">
          {iconClass && <i className={iconClass} style={{ marginRight: '0.5rem' }}></i>}
          {answer}
        </span>
      </span>
      <span className="ab-back">
        <span className="ab-icon">
          {iconClass && <i className={iconClass}></i>}
        </span>
        <span>{answer}</span>
      </span>
    </button>
  );
};

export default AnswerButton
