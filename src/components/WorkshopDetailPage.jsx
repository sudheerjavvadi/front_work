import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// --- START: MOCK DEPENDENCIES ---

// Mock Workshops Data (Remains the same with module/lesson structure)
const mockWorkshopsData = [
  { 
    id: 'wk-1', 
    title: 'Advanced React Patterns', 
    date: 'Thursday, August 15, 2024', 
    time: '7:30 PM', 
    duration: '120 minutes',
    audience: 'Professionals',
    category: 'Technology',
    description: 'Dive deep into advanced React patterns, including hooks, context, and performance optimization techniques. This workshop is for experienced developers looking to level up their skills.',
    instructor: { name: 'Areapalli Gopi', expertise: 'Technology Specialist' },
    imageUrl: 'https://images.unsplash.com/photo-1549692520-2195f2a1b920?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    modules: [
        { title: 'Module 1: Custom Hooks & Performance', lessons: [
            { type: 'video', name: 'What is a Custom Hook?', duration: '12 min' },
            { type: 'video', name: 'Optimizing Re-renders with memo()', duration: '20 min' },
            { type: 'exam', name: 'Module 1 Exam: Hooks Fundamentals' }
        ]},
        { title: 'Module 2: Advanced Context & State', lessons: [
            { type: 'video', name: 'The Power of the useReducer Hook', duration: '15 min' },
            { type: 'video', name: 'Building a Centralized State Store', duration: '18 min' },
            { type: 'exam', name: 'Module 2 Exam: State Management' }
        ]},
        { title: 'Module 3: Error Boundaries & Testing', lessons: [
            { type: 'video', name: 'Implementing Error Boundaries', duration: '10 min' },
            { type: 'exam', name: 'Module 3 Final Quiz' }
        ]}
    ]
  },
  { 
    id: 'wk-2', 
    title: 'UI/UX Design Fundamentals', 
    date: 'Tuesday, August 20, 2024', 
    time: '11:30 PM', 
    duration: '90 minutes',
    audience: 'Beginners',
    category: 'Arts',
    description: 'Learn the fundamentals of UI/UX design, from user research to wireframing and prototyping. Perfect for beginners who want to start a career in design.',
    instructor: { name: 'Areapalli Gopi', expertise: 'Arts' },
    imageUrl: 'https://images.unsplash.com/photo-1594950486241-d68a91c13d39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    modules: [
        { title: 'Module 1: Introduction to UX', lessons: [
            { type: 'video', name: 'What is User Experience?', duration: '10 min' },
            { type: 'video', name: 'User Research Methods', duration: '25 min' },
            { type: 'exam', name: 'Module 1 Exam' }
        ]},
        { title: 'Module 2: Wireframing and Prototyping', lessons: [
            { type: 'video', name: 'Sketching Low-Fidelity Wireframes', duration: '15 min' },
            { type: 'video', name: 'Creating Interactive Prototypes', duration: '22 min' },
            { type: 'exam', name: 'Module 2 Exam' }
        ]}
    ]
  },
  { 
    id: 'wk-3', 
    title: 'Growth Hacking for Startups', 
    date: 'Saturday, September 1, 2024', 
    time: '9:30 PM', 
    duration: '90 minutes',
    audience: 'Students',
    category: 'Marketing',
    description: 'Strategies for rapid business growth using low-cost digital techniques. Understand AARRR metrics and how to scale your startup effectively.',
    instructor: { name: 'Areapalli Gopi', expertise: 'Marketing' },
    imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97aa23aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    modules: [
        { title: 'Module 1: Foundations of Growth', lessons: [
            { type: 'video', name: 'The AARRR Funnel Explained', duration: '14 min' },
            { type: 'video', name: 'Identifying Your Core Metric', duration: '16 min' },
            { type: 'exam', name: 'Module 1 Quiz' }
        ]},
        { title: 'Module 2: Acquisition & Retention', lessons: [
            { type: 'video', name: 'Running Viral Loops', duration: '20 min' },
            { type: 'video', name: 'Email Marketing Strategies', duration: '10 min' },
            { type: 'exam', name: 'Module 2 Final Exam' }
        ]}
    ]
  }
];

// Mock Auth Context Hook
const useAuth = () => {
  const [registrations, setRegistrations] = useState([]);
  
  useEffect(() => {
    const savedRegs = localStorage.getItem('mockRegistrations');
    if (savedRegs) {
      setRegistrations(JSON.parse(savedRegs));
    }
    const handleStorageChange = () => {
        const updatedRegs = localStorage.getItem('mockRegistrations');
        if (updatedRegs) {
            setRegistrations(JSON.parse(updatedRegs));
        }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Set to TRUE/STUDENT for successful registration test, as requested in previous steps.
  // Set mockIsLoggedIn = false to test the "Login Required" error message.
  const mockIsLoggedIn = true; 
  const mockUserRole = 'student'; 

  const isRegistered = (workshopId) => {
    return registrations.some(w => w.id === workshopId);
  };
  
  const registerWorkshop = (workshop) => {
    if (!mockIsLoggedIn || mockUserRole !== 'student' || isRegistered(workshop.id)) {
      return false; 
    }
    const newRegs = [...registrations, workshop];
    setRegistrations(newRegs);
    localStorage.setItem('mockRegistrations', JSON.stringify(newRegs));
    window.dispatchEvent(new Event('storage'));
    return true;
  };

  return {
    isLoggedIn: mockIsLoggedIn,
    userRole: mockUserRole,
    registerWorkshop,
    isRegistered,
  };
};

// --- END: MOCK DEPENDENCIES ---

// --- NEW COMPONENT: Module (Handles Collapsible Content and Interactions) ---
const Module = ({ module, index }) => {
    const [isOpen, setIsOpen] = useState(index === 0);
    const [status, setStatus] = useState({}); // { lessonIndex: 'status' }
    const SIMULATION_DURATION = 2000; // 2 seconds

    const getLessonIcon = (type) => {
        if (type === 'video') return <span className="text-purple-600 mr-3">▶️</span>; 
        if (type === 'exam') return <span className="text-green-600 mr-3">📄</span>;
        return null;
    };

    const handleLessonClick = (lesson, lessonIndex) => {
        const actionType = lesson.type;
        const initialStatus = actionType === 'video' ? 'Playing...' : 'Loading Exam...';
        const successMessage = actionType === 'video' 
            ? `Successfully started video: ${lesson.name}`
            : `Exam started: ${lesson.name}. Good luck!`;
        
        // 1. Set status to simulate loading/playing
        setStatus({ ...status, [lessonIndex]: initialStatus });

        // 2. Show alert (simulating the external action)
        alert(initialStatus);

        // 3. Simulate completion/return to normal state after 2 seconds
        setTimeout(() => {
            alert(successMessage);
            setStatus({ ...status, [lessonIndex]: 'Complete' }); // Use 'Complete' for a visual change
            
            // Revert back to ready state after a short delay (optional, for re-testing)
            setTimeout(() => {
                setStatus({});
            }, 3000);
        }, SIMULATION_DURATION);
    };
    
    // Helper to get button text and style
    const getLessonButton = (lesson, lessonIndex) => {
        const currentStatus = status[lessonIndex];
        const isDisabled = !!currentStatus && currentStatus !== 'Complete';
        
        let buttonText = lesson.type === 'video' ? 'Play Video' : 'Start Exam';
        let buttonClass = lesson.type === 'video' 
            ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
            : 'bg-green-100 text-green-700 hover:bg-green-200';
            
        if (currentStatus === 'Playing...') {
            buttonText = 'Video Playing...';
            buttonClass = 'bg-purple-600 text-white cursor-not-allowed';
        } else if (currentStatus === 'Loading Exam...') {
            buttonText = 'Loading Exam...';
            buttonClass = 'bg-green-600 text-white cursor-not-allowed';
        } else if (currentStatus === 'Complete') {
             buttonText = lesson.type === 'video' ? 'Re-play' : 'Review Exam';
             buttonClass = 'bg-gray-200 text-gray-700 hover:bg-gray-300';
        }

        return (
            <button
                onClick={() => handleLessonClick(lesson, lessonIndex)}
                disabled={isDisabled}
                className={`py-1 px-3 text-sm rounded-md font-semibold transition-colors ${buttonClass}`}
            >
                {buttonText}
            </button>
        );
    };

    return (
        <div className="border-b border-gray-200">
            {/* Module Header (Clickable for toggling) */}
            <button
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg">{module.title}</span>
                <span className="text-gray-500 transform transition-transform duration-300">
                    {isOpen ? '▲' : '▼'}
                </span>
            </button>

            {/* Module Content (Collapsible) */}
            {isOpen && (
                <div className="p-0 border-l-4 border-purple-300 ml-4 mb-4">
                    {module.lessons.map((lesson, lessonIndex) => (
                        <div 
                            key={lessonIndex}
                            className={`flex items-center justify-between py-3 px-4 transition-colors 
                                ${lesson.type === 'exam' 
                                    ? 'bg-green-50 text-gray-700 border-l-4 border-green-400' 
                                    : 'text-gray-700 hover:bg-purple-50'}`}
                        >
                            <div className="flex items-center flex-1">
                                {getLessonIcon(lesson.type)}
                                <span className="font-medium">{lesson.name}</span>
                                {lesson.duration && (
                                    <span className="text-sm text-gray-500 flex items-center ml-4">
                                        <span className="mr-1 text-base">📹</span> {lesson.duration}
                                    </span>
                                )}
                            </div>
                            
                            {/* Action Button */}
                            {getLessonButton(lesson, lessonIndex)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
// --- END: NEW COMPONENT ---

const WorkshopDetailPage = () => {
  const { id } = useParams(); 
  const { isLoggedIn, userRole, registerWorkshop, isRegistered } = useAuth(); 

  const workshop = mockWorkshopsData.find(w => w.id === id); 
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false); 
  const [currentTab, setCurrentTab] = useState('details'); 
  
  const isCurrentlyRegistered = isRegistered(id);
  const isStudent = userRole === 'student';

  let buttonText = "Register for Workshop";
  let buttonDisabled = isCurrentlyRegistered; 

  if (isCurrentlyRegistered) {
    buttonText = "Registered";
  }


  const handleRegistration = () => {
    // 1. CRITICAL CHECK: If not logged in OR role is not 'student', show error and stop.
    if (!isLoggedIn || !isStudent) {
      setShowLoginError(true);
      setShowSuccess(false);
      return; 
    }
    
    // 2. If already registered, do nothing.
    if (isCurrentlyRegistered) {
        setShowLoginError(false); 
        return;
    }

    // 3. SUCCESSFUL REGISTRATION PATH
    const success = registerWorkshop(workshop); 
    if (success) {
      setShowLoginError(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  if (!workshop) {
    return (
        <div className="workshop-detail-container p-8">
            <div className="workshop-content-box bg-white p-6 rounded-xl shadow-lg">
                <h1 className="text-red-600 text-3xl font-bold">404: Workshop Not Found</h1>
            </div>
        </div>
    );
  }

  // Helper function to render tab content
  const renderTabContent = () => {
    switch (currentTab) {
      case 'instructor':
        return (
          <div className="p-6">
            <p className="text-gray-700">
                {workshop.instructor.name} is a seasoned expert in {workshop.instructor.expertise}. 
                They have conducted numerous successful workshops, focusing on practical, hands-on learning.
            </p>
          </div>
        );
      case 'modules':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Workshop Modules</h2>
            <div className="space-y-2">
                {workshop.modules && workshop.modules.map((module, index) => (
                    <Module key={index} module={module} index={index} />
                ))}
            </div>
          </div>
        );
      case 'details':
      default:
        return (
          <div className="p-6">
            <p className="text-gray-700">{workshop.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="workshop-detail-container p-4 lg:p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* --- MAIN CONTENT LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Main Workshop Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. IMAGE AND TITLE BLOCK */}
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl bg-gray-100">
                <img 
                    src={workshop.imageUrl} 
                    alt={workshop.title} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1200x400/9333ea/ffffff?text=Workshop+Image' }}
                />
                {/* Text Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative p-8 h-full flex items-end">
                    <h1 className="text-white text-4xl lg:text-5xl font-extrabold drop-shadow-lg max-w-2xl">
                        {workshop.title}
                    </h1>
                </div>
            </div>

            {/* 2. TABS AND DETAILS BLOCK */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                
                {/* Tabs Navigation */}
                <div className="flex bg-gray-100 rounded-t-xl p-0">
                    {['details', 'instructor', 'modules'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setCurrentTab(tab)}
                            className={`flex-1 py-3 text-sm font-semibold transition-colors capitalize border-r last:border-r-0 border-gray-200 
                                ${currentTab === tab 
                                    ? 'bg-white text-purple-700 rounded-t-xl border-t-2 border-purple-600' 
                                    : 'text-gray-600 hover:bg-gray-50' 
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                
                {/* Tabs Content */}
                <div>
                    {renderTabContent()}
                </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (1/3 width) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Schedule/Registration Box */}
            <div className="workshop-info-box bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                
                {/* Simplified Info Display */}
                <div className="info-item flex items-start mb-3">
                    <span className="icon text-xl mr-3 text-purple-600 mt-0.5">📅</span>
                    <p className="font-bold text-gray-800">{workshop.date}</p>
                </div>
                <div className="info-item flex items-start mb-3">
                    <span className="icon text-xl mr-3 text-purple-600 mt-0.5">⏰</span>
                    <p className="font-bold text-gray-800">{workshop.time}</p>
                </div>
                <div className="info-item flex items-start mb-6">
                    <span className="icon text-xl mr-3 text-purple-600 mt-0.5">👤</span>
                    <p className="font-bold text-gray-800">{workshop.audience}</p>
                </div>

                {/* Registration Button Area */}
                <div className="registration-area border-t pt-4">
                    <button 
                        className={`register-button w-full py-3 rounded-lg text-white font-bold transition-all shadow-md 
                                    ${isCurrentlyRegistered ? 'bg-green-600 hover:bg-green-700' : 
                                      'bg-purple-600 hover:bg-purple-700'}`}
                        onClick={handleRegistration}
                        disabled={buttonDisabled} 
                    >
                        {buttonText}
                    </button>
                    
                </div>
            </div>
            
            {/* About Instructor Block */}
            <div className="instructor-box bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-lg font-extrabold text-gray-800 mb-4 border-b pb-2">About the Instructor</h2>
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-xl mr-4 border border-gray-300">
                        {workshop.instructor.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{workshop.instructor.name}</p>
                        <p className="text-sm text-purple-600">{workshop.instructor.expertise}</p>
                    </div>
                </div>
            </div>

            {/* LOGIN REQUIRED ERROR MESSAGE */}
            {showLoginError && (
                <div className="p-4 bg-red-500 text-white rounded-lg shadow-lg text-sm font-semibold transition-all">
                    <p className="font-bold">Login Required</p>
                    <p className="mt-1">Please log in as a student to register.</p>
                </div>
            )}
          </div>
        </div>

        {/* SUCCESS MESSAGE BLOCK */}
        {showSuccess && (
            <div className="fixed bottom-0 right-0 m-6 p-4 bg-green-500 text-white rounded-lg shadow-2xl z-50 transition-transform transform translate-y-0">
                <p className="font-bold text-lg">Registration Successful!</p>
                <p className="text-sm mt-1">You have been registered for **"{workshop.title}"**.</p>
            </div>
        )}

      </div>
    </div>
  );
};

export default WorkshopDetailPage;