import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
// Use the centralized data source
import workshopsData from '../data/workshops'; 

// Helper to find workshop from the imported data
const findWorkshopById = (id) => workshopsData.find(w => w.id === id); 

// --- VideoPlayerModal Component ---
const VideoPlayerModal = ({ videoId, onClose }) => {
    // If no video ID is provided, return null (nothing to render)
    if (!videoId) return null;

    const embedUrl = `https://youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    return (
        // Overlay covers the entire screen
        <div className="video-modal-overlay" onClick={onClose}>
            {/* Modal content prevents click-through to close when clicked inside */}
            <div className="video-modal-content" onClick={e => e.stopPropagation()}>
                <button className="video-modal-close" onClick={onClose}>
                    &times;
                </button>
                <div className="video-player-wrapper">
                    <iframe
                        src={embedUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Workshop Video Player"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};
// ------------------------------------


const WorkshopDetailPage = () => {
    const { id } = useParams();
    const { isLoggedIn, userRole, registerWorkshop, isRegistered } = useAuth();
    
    // State management
    const [workshop, setWorkshop] = useState(null);
    const [activeTab, setActiveTab] = useState('details'); 
    const [showSuccess, setShowSuccess] = useState(false);
    const [showLoginError, setShowLoginError] = useState(false);
    const [playingVideoId, setPlayingVideoId] = useState(null); 


    useEffect(() => {
        // Load data directly from the complete workshops.js file
        const foundWorkshop = findWorkshopById(id);
        
        if (foundWorkshop) {
            setWorkshop(foundWorkshop); 
        } else {
             // If ID is invalid, workshop remains null, and the loading message is shown
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

        if (registerWorkshop(workshop)) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); 
        }
    };
    
    // Crucial check: if workshop is null, render a loading state (prevents crash)
    if (!workshop) {
        return <div className="loading-message">Loading workshop details...</div>;
    }

    const registrationStatus = isRegistered(workshop.id);

    return (
        <>
            {/* 1. Video Player Modal */}
            <VideoPlayerModal 
                videoId={playingVideoId} 
                onClose={() => setPlayingVideoId(null)} 
            />

            {/* 2. Main Workshop Content */}
            <div className="workshop-detail-container">
                {/* Header / Hero Section */}
                <div className="detail-hero-section">
                    <img src={workshop.image} alt={workshop.title} className="detail-hero-image" /> 
                    <div className="detail-hero-overlay">
                        <p className="detail-hero-audience">{workshop.audience}</p>
                        <h1 className="detail-hero-title">{workshop.title}</h1>
                        <p className="detail-hero-description">{workshop.description}</p>
                        <div className="detail-hero-meta">
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
                    {/* Tabs */}
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
                                    {/* CRASH FIX: This will now safely map over the modules from workshops.js */}
                                    {/* Using optional chaining '?' as an extra safeguard, though workshop.modules should be guaranteed */}
                                    {workshop.modules?.map((moduleItem, index) => (
                                        <div key={index} className="module-item">
                                            <div className="module-header">
                                                <span className="module-number">Module {index + 1}</span>
                                                <h4 className="module-title-text">{moduleItem.title}</h4>
                                            </div>
                                            <ul className="lesson-list">
                                                {moduleItem.lessons.map((lesson, lessonIndex) => (
                                                    <li key={lessonIndex} className={`lesson-item lesson-type-${lesson.type}`}>
                                                        <span className="lesson-icon">{lesson.type === 'video' ? '🎬' : lesson.type === 'quiz' ? '📝' : '📄'}</span>
                                                        <p className="lesson-name">{lesson.name}</p>
                                                        
                                                        {lesson.type === 'video' && lesson.videoId ? (
                                                            <button 
                                                                className="play-video-button"
                                                                onClick={() => setPlayingVideoId(lesson.videoId)}
                                                            >
                                                                ▶️ Play Video
                                                            </button>
                                                        ) : (
                                                            <span className="lesson-duration">{lesson.duration}</span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                            {/* Exam/Quiz button */}
                                            {moduleItem.lessons.some(l => l.type === 'quiz') && (
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
        </>
    );
};

export default WorkshopDetailPage;