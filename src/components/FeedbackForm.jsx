import React, { useState } from 'react';

const FeedbackForm = ({ workshopId, moduleId }) => {
    const [feedback, setFeedback] = useState({
        rating: 5,
        contentQuality: 5,
        instructorEffectiveness: 5,
        practicalRelevance: 5,
        comments: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the feedback to your backend
        console.log('Feedback submitted:', { workshopId, moduleId, ...feedback });
        // Store feedback in localStorage for now (replace with API call later)
        const key = `feedback_${workshopId}_${moduleId}`;
        localStorage.setItem(key, JSON.stringify(feedback));
        setSubmitted(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (submitted) {
        return (
            <div className="feedback-success" style={{
                textAlign: 'center',
                padding: '2rem',
                background: '#f0f9f0',
                borderRadius: '8px',
                margin: '1rem 0'
            }}>
                <h4 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Thank You for Your Feedback! 🎉</h4>
                <p>Your feedback helps us improve our workshops.</p>
            </div>
        );
    }

    return (
        <div className="feedback-form-container" style={{
            padding: '2rem',
            background: '#f5f5f5',
            borderRadius: '8px',
            margin: '2rem 0'
        }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#6a1b9a' }}>Module Feedback</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="rating-group">
                    <label>Overall Rating</label>
                    <div className="rating-input" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            name="rating"
                            value={feedback.rating}
                            onChange={handleChange}
                            style={{ flex: 1 }}
                        />
                        <span>{feedback.rating}/5</span>
                    </div>
                </div>

                <div className="rating-group">
                    <label>Content Quality</label>
                    <div className="rating-input" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            name="contentQuality"
                            value={feedback.contentQuality}
                            onChange={handleChange}
                            style={{ flex: 1 }}
                        />
                        <span>{feedback.contentQuality}/5</span>
                    </div>
                </div>

                <div className="rating-group">
                    <label>Instructor Effectiveness</label>
                    <div className="rating-input" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            name="instructorEffectiveness"
                            value={feedback.instructorEffectiveness}
                            onChange={handleChange}
                            style={{ flex: 1 }}
                        />
                        <span>{feedback.instructorEffectiveness}/5</span>
                    </div>
                </div>

                <div className="rating-group">
                    <label>Practical Relevance</label>
                    <div className="rating-input" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            name="practicalRelevance"
                            value={feedback.practicalRelevance}
                            onChange={handleChange}
                            style={{ flex: 1 }}
                        />
                        <span>{feedback.practicalRelevance}/5</span>
                    </div>
                </div>

                <div className="comments-group">
                    <label>Additional Comments</label>
                    <textarea
                        name="comments"
                        value={feedback.comments}
                        onChange={handleChange}
                        placeholder="Share your thoughts about this module..."
                        style={{
                            width: '100%',
                            minHeight: '100px',
                            padding: '0.5rem',
                            marginTop: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#6a1b9a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        alignSelf: 'flex-start'
                    }}
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;