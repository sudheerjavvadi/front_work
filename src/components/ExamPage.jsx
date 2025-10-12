/**
 * Workshop Exam Page Component (JSX/React)
 * - Simulates a quiz interface with radio buttons.
 * - Calculates score and displays results (pass/fail).
 * - Saves module completion to localStorage and dispatches a 'storage' event.
 * - Uses mock data and mock UI components for standalone functionality.
 */

import React, { useState, useEffect, useCallback } from 'react';

// --- MOCK DATA AND UI COMPONENTS (REDEFINED for clarity) ---

// Mock Lucide Icons
const CheckCircle = (props) => <span className="icon-check-circle text-green-500" {...props}>✅</span>;
const XCircle = (props) => <span className="icon-x-circle text-red-500" {...props}>❌</span>;

// Mock Constants and Data Structure
const PASSING_SCORE = 70;

const mockExamData = {
    id: 'e1',
    title: 'Module 1 Exam: Hooks Fundamentals',
    questions: [
        { id: 'q1', text: 'Which hook manages side effects in functional components?', options: ['useState', 'useContext', 'useEffect', 'useMemo'], correctAnswer: 'useEffect' },
        { id: 'q2', text: 'What is the primary use of the `useState` hook?', options: ['Routing', 'State management', 'API fetching', 'DOM manipulation'], correctAnswer: 'State management' },
        { id: 'q3', text: 'Which hook is used to access context?', options: ['useReducer', 'useCallback', 'useContext', 'useEffect'], correctAnswer: 'useContext' },
    ],
};

const workshops = [{
    id: 'wk-1',
    title: 'Advanced React Patterns',
    modules: [
        { id: 'm1', title: 'Module 1: Custom Hooks & Performance', exam: mockExamData },
        { id: 'm2', title: 'Module 2: Advanced Context & State', exam: { ...mockExamData, id: 'e2', title: 'Module 2 Exam: State Management' } }
    ]
}];

// Mock Next.js Hooks
const useParams = () => ({ id: 'wk-1', moduleId: 'm1' });
const useRouter = () => ({ 
    push: (path) => {
        alert(`Navigating back to Workshop Details (Mock): ${path}`);
    } 
});
const notFound = () => {
    alert("404: Workshop or Module not found (Using Mock Data)");
    return null;
};

// Mock useToast (Same as WorkshopDetailPage's mock)
const useToast = () => ({
    toast: (options) => {
        const { title, description, variant } = options;
        const style = variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-green-500 text-white';
        console.log(`[Toast ${variant || 'default'}]: ${title} - ${description}`);
        const toastDiv = document.createElement('div');
        toastDiv.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-xl z-50 transition-transform transform translate-y-0 ${style}`;
        toastDiv.innerHTML = `<strong>${title}</strong><p class='text-sm mt-1'>${description}</p>`;
        document.body.appendChild(toastDiv);
        setTimeout(() => {
            toastDiv.classList.add('translate-y-full');
            toastDiv.remove();
        }, 5000);
    },
});

// Mock Shadcn/ui Components (Minimalist versions)
const Card = ({ children, className }) => <div className={`bg-white rounded-xl shadow-2xl border border-gray-100 ${className}`}>{children}</div>;
const CardHeader = ({ children }) => <div className="p-6 border-b">{children}</div>;
const CardTitle = ({ children, className }) => <h3 className={`text-3xl font-bold ${className}`}>{children}</h3>;
const CardDescription = ({ children }) => <p className="text-gray-500 mt-2">{children}</p>;
const CardContent = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardFooter = ({ children, className }) => <div className={`p-6 border-t flex justify-between ${className}`}>{children}</div>;
const RadioGroupItem = ({ value, id, checked, onChange }) => (
    <input 
        type="radio" 
        name={id.split('-')[0]} 
        id={id} 
        value={value} 
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500" 
    />
);
const Label = ({ children, htmlFor }) => (
    <label htmlFor={htmlFor} className="ml-2 text-sm font-medium text-gray-700">{children}</label>
);
const Button = ({ children, onClick, disabled, className, type, variant = 'default' }) => {
    let baseStyle = 'py-2 px-4 rounded-lg font-semibold transition-opacity';
    if (variant === 'outline') {
        baseStyle = 'py-2 px-4 rounded-lg font-semibold transition-colors border bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
    return (
        <button 
            onClick={onClick} 
            disabled={disabled} 
            type={type || 'button'} 
            className={`${baseStyle} ${className} ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
            {children}
        </button>
    );
};
const Progress = ({ value }) => (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
            className="h-full bg-blue-500 transition-all duration-500 ease-out" 
            style={{ width: `${value}%` }} 
            aria-valuenow={value}
            role="progressbar"
        ></div>
    </div>
);


// --- MAIN COMPONENT ---

export default function ExamPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const { id: workshopId, moduleId } = params;

    const workshop = workshops.find((w) => w.id === workshopId);
    const module = workshop?.modules.find((m) => m.id === moduleId);
    const exam = module?.exam;

    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    // Initial check for already passed status
    useEffect(() => {
        if (workshopId && moduleId) {
            const completedKey = `completedExams_${workshopId}`;
            try {
                const completedExams = JSON.parse(localStorage.getItem(completedKey) || '[]');
                if (completedExams.includes(String(moduleId))) {
                    setSubmitted(true);
                    setScore(100); 
                    toast({
                        title: "Already Passed",
                        description: "You have already passed this exam. Reviewing results.",
                    });
                }
            } catch (error) {
                console.error("Error parsing localStorage:", error);
            }
        }
    }, [workshopId, moduleId]);

    if (!workshop || !module || !exam) {
        return notFound();
    }

    const handleAnswerChange = (questionId, value) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(answers).length !== exam.questions.length) {
            toast({
                title: 'Incomplete Exam',
                description: 'Please answer all questions before submitting.',
                variant: 'destructive',
            });
            return;
        }

        let correctAnswers = 0;
        exam.questions.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                correctAnswers++;
            }
        });

        const finalScore = (correctAnswers / exam.questions.length) * 100;
        setScore(finalScore);
        setSubmitted(true);

        if (finalScore >= PASSING_SCORE) {
            const completedKey = `completedExams_${workshopId}`;
            let completedExams = [];
            
            try {
                completedExams = JSON.parse(localStorage.getItem(completedKey) || '[]');
            } catch (error) {
                console.error("Error reading completed exams from localStorage:", error);
                completedExams = []; 
            }
            
            if (!completedExams.includes(String(moduleId))) {
                completedExams.push(String(moduleId));
                localStorage.setItem(completedKey, JSON.stringify(completedExams));
                window.dispatchEvent(new Event('storage')); // Notify WorkshopDetailPage
            }

            toast({
                title: 'Congratulations, you passed!',
                description: `Your score: ${finalScore.toFixed(0)}%. Your progress has been saved.`,
            });
        } else {
            toast({
                title: 'Try again',
                description: `Your score: ${finalScore.toFixed(0)}%. You need ${PASSING_SCORE}% to pass.`,
                variant: 'destructive'
            });
        }
    };

    const allQuestionsAnswered = Object.keys(answers).length === exam.questions.length;
    const progress = (Object.keys(answers).length / exam.questions.length) * 100;

    return (
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 min-h-screen bg-gray-50">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-gray-800">{exam.title}</CardTitle>
                    <CardDescription>
                        Test your knowledge from the **"{module.title}"** module. A score of **{PASSING_SCORE}%** is required to pass.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <Label>Progress: {progress.toFixed(0)}%</Label>
                                <Progress value={progress} />
                            </div>
                            {exam.questions.map((question, index) => (
                                <div key={question.id} className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
                                    <p className="font-semibold text-lg text-gray-800">
                                        Question {index + 1}: {question.text}
                                    </p>
                                    <div className="space-y-3">
                                        {question.options.map((option) => (
                                            <div key={option} className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-blue-50 transition-colors">
                                                <RadioGroupItem 
                                                    value={option} 
                                                    id={`${question.id}-${option}`}
                                                    checked={answers[question.id] === option}
                                                    onChange={() => handleAnswerChange(question.id, option)}
                                                />
                                                <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <Button 
                                type="submit" 
                                className="w-full py-3 text-lg" 
                                disabled={!allQuestionsAnswered}
                            >
                                Submit Answers
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6 p-6 border-2 rounded-xl" style={{ borderColor: score >= PASSING_SCORE ? '#10B981' : '#EF4444' }}>
                            <h2 className="text-3xl font-bold font-headline text-gray-800">Exam Results</h2>
                            <p className={`text-6xl font-extrabold ${score >= PASSING_SCORE ? 'text-green-600' : 'text-red-600'}`}>{score.toFixed(0)}%</p>
                            
                            {score >= PASSING_SCORE ? (
                                <p className="text-lg text-green-700 font-medium flex items-center justify-center gap-2">
                                    <CheckCircle className="h-6 w-6" /> Congratulations! You have passed the exam.
                                </p>
                            ) : (
                                <p className="text-lg text-red-700 font-medium flex items-center justify-center gap-2">
                                    <XCircle className="h-6 w-6" /> You did not pass. A score of {PASSING_SCORE}% is required.
                                </p>
                            )}
                            
                            <p className="text-gray-500">
                                You answered **{Math.round(score / 100 * exam.questions.length)}** out of **{exam.questions.length}** questions correctly.
                            </p>
                            
                            <div className="space-y-4 text-left pt-4 border-t mt-6">
                                <h3 className='text-xl font-bold'>Answer Review</h3>
                                {exam.questions.map((q) => (
                                    <div key={q.id} className="p-4 rounded-lg border bg-gray-50">
                                        <p className="font-semibold text-gray-800">{q.text}</p>
                                        <div className="mt-2 text-sm space-y-1">
                                            {answers[q.id] === q.correctAnswer ? (
                                                <p className="flex items-center gap-2 text-green-600 font-medium">
                                                    <CheckCircle className="h-5 w-5" /> Your answer: {answers[q.id]} (Correct)
                                                </p>
                                            ) : (
                                                <>
                                                    <p className="flex items-center gap-2 text-red-600 font-medium">
                                                        <XCircle className="h-5 w-5" /> Your answer: {answers[q.id] || 'Not answered'} (Incorrect)
                                                    </p>
                                                    <p className="flex items-center gap-2 text-green-700">
                                                        <CheckCircle className="h-5 w-5 opacity-70" /> Correct answer: **{q.correctAnswer}**
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button 
                        onClick={() => router.push(`/workshops/${workshopId}`)} 
                        variant="outline"
                    >
                        Back to Workshop
                    </Button>
                    {submitted && score < PASSING_SCORE && (
                         <Button 
                            onClick={() => { setSubmitted(false); setAnswers({}); setScore(0); }}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                         >
                            Retake Exam
                         </Button>
                    )}
                     {submitted && score >= PASSING_SCORE && (
                         <Button 
                            onClick={() => { setSubmitted(false); setAnswers({}); setScore(0); }}
                            className="bg-gray-500 hover:bg-gray-600 text-white"
                         >
                            Review & Retake
                         </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}