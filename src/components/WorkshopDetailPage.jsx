import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext'; 
// 1. IMPORT WORKSHOP DATA FROM THE CENTRAL FILE
import workshopsData from '../data/workshops'; 

// Helper to find workshop from the imported data
const findWorkshopById = (id) => workshopsData.find(w => w.id === id); 

// Helper for mock data that is missing in workshops.js (Modules and Quiz link)
const getMockDetails = (workshopId) => {
    // This provides the necessary structure for the Curriculum (Modules) tab
    return {
        modules: [
            { 
                title: 'Module 1: Getting Started', 
                lessons: [
                    { type: 'video', name: 'Introduction and Setup', duration: '12 min' },
                    { type: 'article', name: 'Core Concepts Overview', duration: '20 min read' },
                ]
            },
            { 
                title: 'Module 2: Advanced Topics', 
                lessons: [
                    { type: 'video', name: 'Deep Dive into State', duration: '15 min' },
                    { type: 'quiz', name: 'Module 2 Quiz', duration: '10 questions' }, // Linkable quiz
                ]
            },
        ]
    };
};

const WorkshopDetailPage = () => {
    const { id } = useParams();
    // Using the real context for registration logic
    const { isLoggedIn, userRole, registerWorkshop, isRegistered } = useAuth();
    
    // State for the currently viewed workshop
    const [workshop, setWorkshop] = useState(null);
    const [activeTab, setActiveTab] = useState('details'); 
    const [showSuccess, setShowSuccess] = useState(false);
    const [showLoginError, setShowLoginError] = useState(false);


    useEffect(() => {
        const foundWorkshop = findWorkshopById(id);
        if (foundWorkshop) {
            // Merge the found data with the necessary mock structures 
            // until you add them to workshops.js
            const detailedWorkshop = {
                ...foundWorkshop,
                ...getMockDetails(foundWorkshop.id) 
            };
            setWorkshop(detailedWorkshop);
        } else {
             console.error(`Workshop with ID ${id} not found.`);
        }
    }, [id]);

    // Handle Registration Logic
    const handleRegister = () => {
        if (!isLoggedIn || userRole !== 'student') {
            setShowLoginError(true);
            setTimeout(() => setShowLoginError(false), 3000); 
            return;
        }

        // Pass the simplified workshop object needed for registration list
        if (registerWorkshop(workshop)) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); 
        }
    };
    
    if (!workshop) {
        return <div className="loading-message">Loading workshop details...</div>;
    }

    const registrationStatus = isRegistered(workshop.id);

    return (
        <div className="workshop-detail-container">
            {/* Header / Hero Section */}
            <div className="detail-hero-section">
                <img src={workshop.image} alt={workshop.title} className="detail-hero-image" /> 
                <div className="detail-hero-overlay">
                    <p className="detail-hero-audience">{workshop.audience}</p>
                    <h1 className="detail-hero-title">{workshop.title}</h1>
                    <p className="detail-hero-description">{workshop.description}</p>
                    <div className="detail-hero-meta">
                        {/* CORRECTED FIELD NAMES */}
                        <span>🗓️ {workshop.scheduleDate} at {workshop.scheduleTime}</span>
                        <span>⏱️ {workshop.duration}</span>
                        <span>🧑‍🏫 {workshop.instructorName}</span> 
                    </div>

                    <div className="registration-action-block">
                        <button 
                            onClick={handleRegister} 
                            className={`register-button ${registrationStatus ? 'registered' : ''}`}
                            disabled={registrationStatus}
                        >
                            {registrationStatus ? '✔️ Already Registered' : 'Register Now'}
                        </button>
                        {showLoginError && (
                            <div className="login-error-message">
                                <p className="error-title">Login Required</p>
                                <p className="error-subtitle">Please log in as a student to register.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="detail-main-content">
                <div className="detail-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                    >
                        {workshop.detailsTab}
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'modules' ? 'active' : ''}`}
                        onClick={() => setActiveTab('modules')}
                    >
                        {workshop.modulesTab}
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'instructor' ? 'active' : ''}`}
                        onClick={() => setActiveTab('instructor')}
                    >
                        {workshop.instructorTab}
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content-panel">
                    {/* DETAILS TAB */}
                    {activeTab === 'details' && (
                        <div className="details-tab-content">
                            <h3 className="section-title">Description</h3>
                            <p className="section-text">{workshop.description}</p>

                            <h3 className="section-title">Schedule</h3>
                            <div className="schedule-meta-grid">
                                <div><p className="meta-label">Date</p><p className="meta-value">{workshop.scheduleDate}</p></div>
                                <div><p className="meta-label">Time</p><p className="meta-value">{workshop.scheduleTime}</p></div>
                                <div><p className="meta-label">Duration</p><p className="meta-value">{workshop.duration}</p></div>
                                <div><p className="meta-label">Audience</p><p className="meta-value">{workshop.audience}</p></div>
                            </div>
                        </div>
                    )}

                    {/* MODULES/CURRICULUM TAB */}
                    {activeTab === 'modules' && (
                        <div className="modules-tab-content">
                            <h3 className="section-title">Learning Modules</h3>
                            <div className="module-list">
                                {/* Uses the mock modules from getMockDetails */}
                                {workshop.modules.map((moduleItem, index) => (
                                    <div key={index} className="module-item">
                                        <div className="module-header">
                                            <span className="module-number">Module {index + 1}</span>
                                            <h4 className="module-title-text">{moduleItem.title}</h4>
                                        </div>
                                        <ul className="lesson-list">
                                            {moduleItem.lessons.map((lesson, lessonIndex) => (
                                                <li key={lessonIndex} className="lesson-item">
                                                    <span className="lesson-icon">{lesson.type === 'video' ? '🎬' : lesson.type === 'quiz' ? '📝' : '📄'}</span>
                                                    <p className="lesson-name">{lesson.name}</p>
                                                    <span className="lesson-duration">{lesson.duration}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {/* Exam/Quiz button: Mocked for now */}
                                        {moduleItem.lessons.some(l => l.type === 'quiz') && (
                                            // You will need to define a route for this: /exam/:workshopId/module/:moduleId
                                            <Link to={`/exam/${workshop.id}/module/${index + 1}`} className="module-exam-link">
                                                Take Module Quiz →
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* INSTRUCTOR TAB */}
                    {activeTab === 'instructor' && (
                        <div className="instructor-tab-content">
                            <h3 className="section-title">About the Instructor</h3>
                            <div className="instructor-card">
                                <div className="instructor-avatar">
                                    {workshop.instructorName.charAt(0)}
                                </div>
                                <div className="instructor-info">
                                    {/* CORRECTED FIELD NAMES */}
                                    <p className="instructor-name">{workshop.instructorName}</p>
                                    <p className="instructor-expertise">{workshop.instructorTopic}</p> 
                                </div>
                            </div>
                            <p className="instructor-bio">
                                {workshop.instructorName} is a seasoned professional with over 10 years of experience in {workshop.instructorTopic}. 
                                They have trained hundreds of students and professionals globally, specializing in practical, hands-on learning.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* SUCCESS MESSAGE BLOCK */}
            {showSuccess && (
                <div className="success-message-toast">
                    <p className="toast-title">Registration Successful!</p>
                    <p className="toast-subtitle">You have been registered for **"{workshop.title}"**.</p>
                </div>
            )}
        </div>
    );
};

export default WorkshopDetailPage;