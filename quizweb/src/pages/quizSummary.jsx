import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import Leaderboard from './leaderboard.jsx';
import { useWindowSize } from 'react-use';
import './quizSummary.css';

function QuizSummary({ questions, userAnswers, userName, questionTimings }) {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const [hideConfetti, setHideConfetti] = useState(false);

  const total = questions.length;
  const correct = questions.reduce((acc, q, index) => {
    return acc + (userAnswers[index] === q.correctAnswer ? 1 : 0);
  }, 0);

  const totalTime = questionTimings?.reduce((sum, t) => sum + t, 0) || 0;
  const avgTime = total > 0 ? (totalTime / total).toFixed(1) : 0;

  useEffect(() => {
    const fadeTimer = setTimeout(() => setShowConfetti(false), 5000);
    const removeTimer = setTimeout(() => setHideConfetti(true), 6500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="quiz-summary">
      <button
        className="btn btn-light reload-btn"
        onClick={() => window.location.reload()}
        aria-label="Reload"
      >
        <i className="bi bi-arrow-clockwise"></i>
      </button>
      {!hideConfetti && (
        <div
          className="confetti-wrapper"
          style={{
            opacity: showConfetti ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            pointerEvents: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: width,
            height: height,
            zIndex: 9999,
          }}
        >
          <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />
        </div>
      )}

      <h2 className="summary-title">🎉 Quiz Completed!</h2>
      <p className="summary-subtitle">Well done, {userName}!</p>
      <p className="score">
        You got <span className="score-highlight">{correct}</span> out of <span>{total}</span> correct.
      </p>

      <p className="summary-time">
        🕒 Total Time: <strong>{totalTime}s</strong> &nbsp; | &nbsp; Average Time: <strong>{avgTime}s</strong>
      </p>

      <Leaderboard userName={userName} />

      <p className="summary-question-review">Answer Review</p>

      <div className="summary-list">
        {questions.map((q, index) => {
          const isCorrect = userAnswers[index] === q.correctAnswer;
          const timeSpent = questionTimings?.[index] ?? 0;

          return (
            <div key={index} className={`summary-item ${isCorrect ? 'correct' : 'wrong'}`}>
              <div className="summary-header">
                <div className="summary-index">{index + 1}.</div>
                <div className="summary-question">{q.question}</div>
                <div className={`summary-status ${isCorrect ? 'correct' : 'wrong'}`}>
                  {isCorrect ? '✔️ Correct' : '❌ Wrong'}
                </div>
              </div>
              <div className="summary-details">
                <p>
                  Your answer:{' '}
                  <span className="user-answer">{userAnswers[index] || 'No answer'}</span>
                </p>
                {!isCorrect && (
                  <p>
                    Correct answer:{' '}
                    <span className="correct-answer">{q.correctAnswer}</span>
                  </p>
                )}
                <p>
                  ⏱️ Time spent: <span>{timeSpent}s</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuizSummary;
