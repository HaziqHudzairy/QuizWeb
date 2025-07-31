import React, { useRef } from 'react';
import './ConfirmButton.css';

const ConfirmButton = ({ text = "Confirm", onClick }) => {
  const btnRef = useRef(null);

  const handleClick = (e) => {
    const button = btnRef.current;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) ripple.remove();
    button.appendChild(circle);

    if (onClick) onClick(e);
  };

  return (
    <button ref={btnRef} className="confirm-button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default ConfirmButton;
