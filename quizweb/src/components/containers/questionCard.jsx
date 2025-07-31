import React, { useEffect, useState } from 'react';
import './questionCard.css';
import AnswerButton from '../buttons/answerButton.jsx';
import ConfirmButton from '../buttons/confirmButton.jsx';

function QuestionCard({
  question,
  answerList,
  correctAnswer,
  onConfirm,
  disabled,
  isWorksheetMode,
  selectedAnswer,
  setSelectedAnswer,
  currentIndex
}) {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    setConfirmed(false);
  }, [currentIndex]);

  const handleAnswerClick = (answer) => {
    if (disabled || confirmed) return;
    const newSelection = selectedAnswer === answer ? null : answer;
    setSelectedAnswer(newSelection);
  };

  const handleClear = () => {
    if (disabled || confirmed) return;
    setSelectedAnswer(null);
  };

  const handleConfirm = () => {
    if (selectedAnswer !== null) {
      setConfirmed(true);
      onConfirm?.();
    }
  };

  const shouldExpand = !isWorksheetMode && selectedAnswer;

  return (
    <div className={`question-card ${shouldExpand ? 'expanded' : ''}`}>
      <div className="question-card-header">
        <h2 className="question-title">{question}</h2>
      </div>

      <ul className="answer-list">
        {answerList.map((answer, index) => {
          const isCorrect = answer === correctAnswer;
          const isSelected = selectedAnswer === answer;
          const isWrongSelection = confirmed && isSelected && !isCorrect;

          let variant = '';
          if (confirmed) {
            if (isCorrect) variant = 'correct';
            else if (isWrongSelection) variant = 'wrong';
          }

          return (
            <li key={index}>
              <AnswerButton
                answer={answer}
                isActive={isSelected || (confirmed && isCorrect)}
                variant={variant}
                onClick={() => handleAnswerClick(answer)}
                disabled={confirmed || disabled}
              />
            </li>
          );
        })}
      </ul>

      {!isWorksheetMode && !confirmed && (
        <div className={`button-row ${selectedAnswer ? 'visible' : ''}`}>
          <div style={{ width: '130px' }}>
            <span className="clear-selection-button" onClick={handleClear}>
              Clear Selection
            </span>
          </div>
          <ConfirmButton onClick={handleConfirm} />
        </div>
      )}

    </div>
  );
}

export default QuestionCard;
