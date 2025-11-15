import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function PostTrainingResources() {
  const { registrations, isLoggedIn } = useAuth();
  const [resources, setResources] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [userWorkshops, setUserWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState('');

  useEffect(() => {
    if (!isLoggedIn) return;

    try {
      // Load materials
      const materialsRaw = localStorage.getItem('trainingMaterials');
      if (materialsRaw) {
        setMaterials(JSON.parse(materialsRaw));
      }

      // Get user's workshops
      setUserWorkshops(registrations);

      // Load additional resources
      const resourcesRaw = localStorage.getItem('postTrainingResources');
      if (resourcesRaw) {
        setResources(JSON.parse(resourcesRaw));
      }
    } catch (err) {
      console.error('Error loading resources', err);
    }
  }, [isLoggedIn, registrations]);

  const getWorkshopName = (id) => {
    const workshops = [
      { id: 'wk-1', title: 'Advanced React Patterns' },
      { id: 'wk-2', title: 'UI/UX Design Fundamentals' }
    ];
    return workshops.find(w => w.id === id)?.title || id;
  };

  const getFilteredMaterials = () => {
    if (!selectedWorkshop) return materials;
    return materials.filter(m => m.workshopId === selectedWorkshop);
  };

  const getFilteredResources = () => {
    if (!selectedWorkshop) return resources;
    return resources.filter(r => r.workshopId === selectedWorkshop);
  };

  if (!isLoggedIn) {
    return (
      <div className="post-training-container">
        <div className="login-prompt">
          <h2>Please log in to access post-training resources</h2>
          <p>Complete a workshop to unlock exclusive training materials and resources.</p>
        </div>
      </div>
    );
  }

  const filteredMaterials = getFilteredMaterials();
  const filteredResources = getFilteredResources();

  return (
    <div className="post-training-container">
      <h1 className="page-title">📚 Post-Training Resources</h1>
      
      <p className="subtitle">
        Access comprehensive learning materials and resources for your completed workshops
      </p>

      {/* Workshop Filter */}
      <div className="filter-section">
        <h3>Filter by Workshop:</h3>
        <div className="workshop-filter">
          <button 
            className={`filter-btn ${selectedWorkshop === '' ? 'active' : ''}`}
            onClick={() => setSelectedWorkshop('')}
          >
            All Workshops ({userWorkshops.length})
          </button>
          {userWorkshops.map(workshop => (
            <button 
              key={workshop.workshopId}
              className={`filter-btn ${selectedWorkshop === workshop.workshopId ? 'active' : ''}`}
              onClick={() => setSelectedWorkshop(workshop.workshopId)}
            >
              {getWorkshopName(workshop.workshopId)}
            </button>
          ))}
        </div>
      </div>

      {/* Training Materials Section */}
      <section className="resources-section">
        <h2>📄 Training Materials</h2>
        
        {filteredMaterials.length === 0 ? (
          <div className="no-resources">
            <p>No training materials available for this workshop yet.</p>
          </div>
        ) : (
          <div className="materials-list">
            {filteredMaterials.map(material => (
              <div key={material.id} className="resource-card">
                <div className="resource-header">
                  <span className="resource-type">
                    {material.type === 'document' && '📄'}
                    {material.type === 'video' && '🎥'}
                    {material.type === 'resource' && '📚'}
                    {material.type === 'template' && '📋'}
                  </span>
                  <h3>{material.title}</h3>
                </div>

                {material.description && (
                  <p className="resource-description">{material.description}</p>
                )}

                <div className="resource-meta">
                  <span>📅 {material.uploadDate}</span>
                  <span>⬇️ {material.downloads} downloads</span>
                </div>

                <button 
                  className="btn-access"
                  onClick={() => window.open(material.url, '_blank')}
                >
                  📥 Access Material
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Additional Resources Section */}
      <section className="resources-section">
        <h2>💡 Learning Resources</h2>
        
        <div className="resources-grid">
          <div className="learning-resource">
            <h3>📖 Documentation</h3>
            <p>Official documentation and technical guides for the course topics.</p>
            <button className="btn-resource">View Documentation</button>
          </div>

          <div className="learning-resource">
            <h3>🎯 Practice Projects</h3>
            <p>Hands-on projects to reinforce your learning and build your portfolio.</p>
            <button className="btn-resource">View Projects</button>
          </div>

          <div className="learning-resource">
            <h3>🤝 Community Forum</h3>
            <p>Connect with other students, ask questions, and share your progress.</p>
            <button className="btn-resource">Join Forum</button>
          </div>

          <div className="learning-resource">
            <h3>🎓 Advanced Courses</h3>
            <p>Continue your learning journey with advanced and specialized courses.</p>
            <button className="btn-resource">Explore Courses</button>
          </div>

          <div className="learning-resource">
            <h3>📊 Assessment Tools</h3>
            <p>Test your knowledge with quizzes and practical assessments.</p>
            <button className="btn-resource">Start Assessment</button>
          </div>

          <div className="learning-resource">
            <h3>🏆 Career Path</h3>
            <p>Get guidance on career opportunities and skill development paths.</p>
            <button className="btn-resource">Explore Careers</button>
          </div>
        </div>
      </section>

      {/* Recommended Resources */}
      <section className="resources-section">
        <h2>⭐ Recommended Resources</h2>
        
        <div className="recommended-items">
          <div className="recommended-card">
            <span className="tag">Popular</span>
            <h3>React Hooks Deep Dive</h3>
            <p>Master React Hooks with practical examples and best practices.</p>
            <div className="card-meta">
              <span>📚 Article</span>
              <span>⏱️ 15 min read</span>
            </div>
            <button className="btn-read">Read Now</button>
          </div>

          <div className="recommended-card">
            <span className="tag">New</span>
            <h3>UI/UX Design Principles</h3>
            <p>Essential principles for creating user-centered designs.</p>
            <div className="card-meta">
              <span>🎥 Video</span>
              <span>⏱️ 45 min</span>
            </div>
            <button className="btn-read">Watch Now</button>
          </div>

          <div className="recommended-card">
            <span className="tag">Featured</span>
            <h3>Building Accessible Websites</h3>
            <p>Learn how to create inclusive digital experiences for all users.</p>
            <div className="card-meta">
              <span>📄 Guide</span>
              <span>⏱️ 20 min read</span>
            </div>
            <button className="btn-read">Explore</button>
          </div>
        </div>
      </section>

      {/* Resources Summary */}
      <section className="resources-summary">
        <h2>📊 Your Learning Stats</h2>
        <div className="stats-grid-resources">
          <div className="stat-item">
            <span className="stat-icon">🎓</span>
            <span className="stat-label">Workshops Completed</span>
            <span className="stat-count">{userWorkshops.length}</span>
          </div>

          <div className="stat-item">
            <span className="stat-icon">📚</span>
            <span className="stat-label">Materials Accessed</span>
            <span className="stat-count">{filteredMaterials.length}</span>
          </div>

          <div className="stat-item">
            <span className="stat-icon">🏆</span>
            <span className="stat-label">Certificates Earned</span>
            <span className="stat-count">{Math.floor(userWorkshops.length * 0.8)}</span>
          </div>

          <div className="stat-item">
            <span className="stat-icon">⏱️</span>
            <span className="stat-label">Learning Hours</span>
            <span className="stat-count">{userWorkshops.length * 12}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
