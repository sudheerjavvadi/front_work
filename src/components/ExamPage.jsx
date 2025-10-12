import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import workshopsData from '../data/workshops'; // Central data source

// --- MOCK DATA ---
const PASSING_SCORE = 70; // 70% to pass
const mockExamData = {
    id: 'e1',
    title: 'Module Quiz: Assessment',
    questions: [
        { 
            id: 'q1', 
            text: 'Which hook manages side effects in functional components?', 
            options: ['useState', 'useContext', 'useEffect', 'useMemo'], 
            correctAnswer: 'useEffect' 
        },
        { 
            id: 'q2', 
            text: 'What is the primary use of the `useState` hook?', 
            options: ['Routing', 'State management', 'API fetching', 'DOM manipulation'], 
            correctAnswer: 'State management' 
        },
        { 
            id: 'q3', 
            text: 'When should you use `useMemo`?', 
            options: ['To memoize function calls', 'To manage side effects', 'To manage state', 'To handle routing'], 
            correctAnswer: 'To memoize function calls' 
        },
        { 
            id: 'q4', 
            text: 'What does JSX stand for?', 
            options: ['JavaScript XML', 'JavaScript Syntax Extension', 'JSON Xpath', 'Java XML'], 
            correctAnswer: 'JavaScript XML' 
        },
        { 
            id: 'q5', 
            text: 'What is the purpose of `react-router-dom`?', 
            options: ['State management', 'Styling components', 'Handling navigation', 'API calls'], 
            correctAnswer: 'Handling navigation' 
        },
    ]
};
// -----------------

// Helper to find the workshop details
const findWorkshopById = (id) => workshopsData.find(w => w.id === id); 

const ExamPage = () => {
    // Get parameters from the URL: /exam/:workshopId/module/:moduleId
    const { workshopId, moduleId } = useParams();
    const navigate = useNavigate();

    const [workshop, setWorkshop] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    
    // Total number of questions for score calculation
    const totalQuestions = mockExamData.questions.length;

    // Load workshop details on component mount
    useEffect(() => {
        const foundWorkshop = findWorkshopById(workshopId);
        setWorkshop(foundWorkshop);
    }, [workshopId]);

    // Handler for selecting an answer
    const handleAnswerChange = (questionId, selectedOption) => {
        if (!submitted) {
            setAnswers(prevAnswers => ({
                ...prevAnswers,
                [questionId]: selectedOption,
            }));
        }
    };

    // Handler for submitting the quiz
    const handleSubmit = (e) => {
        e.preventDefault();
        if (submitted) return;

        let correctCount = 0;
        mockExamData.questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });
        
        const calculatedScore = (correctCount / totalQuestions) * 100;
        setScore(calculatedScore);
        setSubmitted(true);
        
        // --- Mock Module Completion Save ---
        if (calculatedScore >= PASSING_SCORE) {
            // In a real app, this would be an API call to save progress.
            console.log(`Module ${moduleId} of Workshop ${workshopId} completed!`);
        }
        // ------------------------------------
    };

    if (!workshop) {
        return <div className="loading-message">Loading exam details...</div>;
    }

    const isPassing = score >= PASSING_SCORE;

    return (
        <div className="exam-page-container">
            <div className="exam-card">
                <div className="exam-header">
                    <h2>{workshop.title}</h2>
                    <h3 className="exam-subtitle">Module {moduleId}: {mockExamData.title}</h3>
                </div>

                <form className="exam-form" onSubmit={handleSubmit}>
                    <div className="exam-questions-list">
                        {mockExamData.questions.map((q, qIndex) => (
                            <div key={q.id} className="question-item">
                                <p className="question-text">
                                    {qIndex + 1}. {q.text}
                                </p>
                                <div className="options-list">
                                    {q.options.map((option, oIndex) => (
                                        <label key={oIndex} className="option-label">
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={option}
                                                checked={answers[q.id] === option}
                                                onChange={() => handleAnswerChange(q.id, option)}
                                                disabled={submitted}
                                            />
                                            {option}
                                            {submitted && (
                                                <span className="feedback-icon">
                                                    {option === q.correctAnswer ? '✅' : 
                                                     answers[q.id] === option ? '❌' : ''}
                                                </span>
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submission / Results Area */}
                    {!submitted ? (
                        <button type="submit" className="submit-exam-button" disabled={Object.keys(answers).length < totalQuestions}>
                            Submit Exam
                        </button>
                    ) : (
                        <div className="exam-results-box">
                            <h4 className="results-title">
                                {isPassing ? 'Congratulations! 🎉' : 'Keep Studying 📚'}
                            </h4>
                            <p className="results-score">
                                Your Score: <span className={isPassing ? 'score-pass' : 'score-fail'}>{score.toFixed(0)}%</span>
                            </p>
                            <p className="results-message">
                                {isPassing 
                                    ? `You passed the quiz! Module ${moduleId} is now complete.` 
                                    : `The passing score is ${PASSING_SCORE}%. Review the module and try again.`}
                            </p>
                        </div>
                    )}
                </form>

                {/* Footer Actions */}
                <div className="exam-actions">
                    <button 
                        onClick={() => navigate(`/workshops/${workshopId}`)} 
                        className="back-to-workshop-button"
                    >
                        ← Back to Workshop
                    </button>
                    {submitted && (
                         <button 
                            onClick={() => { setSubmitted(false); setAnswers({}); setScore(0); }}
                            className="retake-exam-button"
                         >
                            Retake Exam
                         </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExamPage;