import React, { useState, useEffect } from 'react';
import { database, ref, get, auth, signInAnonymously } from '../js/firebaseConfig.js';
import QuestionCard from '../components/containers/questionCard.jsx';
import DarkVeil from '../components/reactBits/DarkVeil.jsx';
import QuizSummary from './quizSummary.jsx';
import AddName from './addName.jsx';
import ClipLoader from "react-spinners/ClipLoader";
import './questionPages.css';

import { push } from 'firebase/database';

function QuestionPage() {
    const [questions, setQuestions] = useState([]);
    const [loadingQuestions, setLoadingQuestions] = useState(true);
    const [userName, setUserName] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCountdown, setShowCountdown] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [questionConfirmed, setQuestionConfirmed] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showLoading, setShowLoading] = useState(false);
    const [questionTimings, setQuestionTimings] = useState([]);
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [hasSaved, setHasSaved] = useState(false);

    const saveHighscore = async () => {
        try {
            const correctCount = questions.reduce((score, question, index) => {
                if (userAnswers[index] === question.correctAnswer) return score + 1;
                return score;
            }, 0);

            const totalTime = questionTimings.reduce((sum, t) => sum + t, 0);
            await push(ref(database, 'highscores'), {
                name: userName,
                score: correctCount,
                time: totalTime,
                submittedAt: Date.now()
            });

            console.log('Highscore saved');
        } catch (error) {
            console.error('Failed to save highscore:', error);
        }
    };

    useEffect(() => {
        signInAnonymously(auth)
            .then(() => {
                console.log("Signed in anonymously");
            })
            .catch((error) => {
                console.error("Anonymous sign-in failed:", error);
            });
    }, []);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const snapshot = await get(ref(database, 'questions'));
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const formatted = Object.values(data);
                    setQuestions(formatted);
                } else {
                    console.warn('No questions found');
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setLoadingQuestions(false);
            }
        }

        fetchQuestions();
    }, []);

    const handleConfirm = () => {
        if (selectedAnswer === null) return;

        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

        setUserAnswers((prev) => {
            const updated = [...prev];
            updated[currentIndex] = selectedAnswer;
            return updated;
        });

        setQuestionTimings((prev) => {
            const updated = [...prev];
            updated[currentIndex] = timeSpent;
            return updated;
        });

        setQuestionConfirmed(true);

        if (currentIndex === questions.length - 1) {
            setShowLoading(true);
            setTimeout(() => {
                setShowLoading(false);
                setCurrentIndex((prev) => prev + 1);
            }, 1000);
        } else {
            setCountdown(3);
            setShowCountdown(true);
        }
    };

    useEffect(() => {
        if (!showCountdown || currentIndex === questions.length - 1) return;

        if (countdown === 0) {
            setShowCountdown(false);
            setQuestionConfirmed(false);
            setSelectedAnswer(null);
            setCurrentIndex((prev) => {
                setQuestionStartTime(Date.now());
                return prev + 1;
            });
        } else {
            const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown, showCountdown]);

    useEffect(() => {
        if (userName) {
            setQuestionStartTime(Date.now());
        }
    }, [userName]);

    useEffect(() => {
        if (
            currentIndex === questions.length &&
            !hasSaved &&
            questions.length > 0 &&
            userAnswers.length === questions.length &&
            questionTimings.length === questions.length
        ) {
            saveHighscore();
            setHasSaved(true);
        }
    }, [currentIndex, userAnswers, questionTimings, hasSaved]);

    return (
        <div className="question-page">
            <div className="question-background">
                <DarkVeil hueShift={29} warpAmount={3.3} />
            </div>

            <div className="question-content">
                {!userName ? (
                    <AddName onSubmitName={setUserName} />
                ) : questions[currentIndex] ? (
                    <div className="flashcard-mode" style={{ textAlign: 'center' }}>
                        <div className="question-counter">
                            <span>{currentIndex + 1}</span>
                            <span>/</span>
                            <span>{questions.length}</span>
                        </div>

                        <QuestionCard
                            key={currentIndex}
                            currentIndex={currentIndex}
                            question={questions[currentIndex].question}
                            answerList={questions[currentIndex].answerList}
                            correctAnswer={questions[currentIndex].correctAnswer}
                            selectedAnswer={selectedAnswer}
                            setSelectedAnswer={setSelectedAnswer}
                            onConfirm={handleConfirm}
                            disabled={questionConfirmed}
                            isWorksheetMode={false}
                        />

                        {showCountdown && (
                            <div className="countdown-container">
                                <div className="countdown-text">Next question in</div>
                                <div key={countdown} className="countdown-number animate-slide">
                                    {countdown}
                                </div>
                            </div>
                        )}

                        {showLoading && (
                            <div className="countdown-container">
                                <div className="countdown-text">Loading results...</div>
                                <ClipLoader color="#38b09d" size={40} />
                            </div>
                        )}
                    </div>
                ) : (
                    <QuizSummary
                        questions={questions}
                        userAnswers={userAnswers}
                        userName={userName}
                        questionTimings={questionTimings}
                    />
                )}
            </div>

            <div className="copyright">
                <p>© haziq hudzairy <br /> © www.mathinenglish.com</p>
            </div>
        </div>
    );

}

export default QuestionPage;
