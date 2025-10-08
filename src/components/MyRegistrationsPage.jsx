import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- START: MOCK DEPENDENCIES (Simulating AuthContext using localStorage) ---

// Mock Auth Context Hook (Uses localStorage to share state between mock components)
const useAuth = () => {
    const [registrations, setRegistrations] = useState([]);
    
    // Load state from local storage on mount and set up listener for changes
    useEffect(() => {
        const loadRegistrations = () => {
            const savedRegs = localStorage.getItem('mockRegistrations');
            if (savedRegs) {
                setRegistrations(JSON.parse(savedRegs));
            } else {
                setRegistrations([]);
            }
        };

        // Load immediately on mount
        loadRegistrations();

        // Listen for storage changes. This allows the page to update 
        // when the WorkshopDetailPage modifies the state.
        window.addEventListener('storage', loadRegistrations);

        return () => {
            window.removeEventListener('storage', loadRegistrations);
        };
    }, []);

    const unregisterWorkshop = (workshopId) => {
        // Filter out the workshop with the matching ID
        const newRegs = registrations.filter(w => w.id !== workshopId);
        
        // Update local state and local storage
        setRegistrations(newRegs);
        localStorage.setItem('mockRegistrations', JSON.stringify(newRegs));
    };

    return {
        registrations, // The live list read from localStorage
        unregisterWorkshop,
    };
};
// --- END: MOCK DEPENDENCIES ---


const MyRegistrationsPage = () => {
  // Get the list of registered workshops and the unregister function
  const { registrations, unregisterWorkshop } = useAuth(); 
  
  const [showUnregisterMessage, setShowUnregisterMessage] = useState(false);
  const [unregisteredTitle, setUnregisteredTitle] = useState('');

  const handleUnregister = (workshopId, workshopTitle) => {
    // Call the function from the (mocked) AuthContext to update the global state
    unregisterWorkshop(workshopId); 
    
    // Show success message
    setUnregisteredTitle(workshopTitle);
    setShowUnregisterMessage(true);
    setTimeout(() => setShowUnregisterMessage(false), 5000); // Hide after 5 seconds
  };

  return (
    <div className="my-registrations-container p-8 max-w-7xl mx-auto">
      <div className="my-registrations-header flex justify-between items-center border-b pb-4 mb-8">
        <div>
            <h1 className="reg-title text-3xl font-bold text-gray-800">My Registrations</h1>
            <p className="reg-subtitle text-gray-500 mt-1">Here are the workshops you've enrolled in.</p>
        </div>
        <button className="my-profile-button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors">
            My Profile
        </button>
      </div>

      {/* Unregistration Success Message */}
      {showUnregisterMessage && (
        <div className="p-4 mb-6 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg font-medium">
            Successfully unregistered from **{unregisteredTitle}**.
        </div>
      )}

      {registrations.length === 0 ? (
        // Display empty message if no registrations exist
        <div className="registration-content-box empty-state bg-white p-12 rounded-xl shadow-lg text-center border border-gray-100">
          <p className="empty-message text-xl font-semibold text-gray-700">You haven't registered for any workshops yet.</p>
          <p className="explore-link mt-4 text-lg">
            {/* NOTE: Link to "/" is used as a placeholder for the catalog page */}
            <Link to="/" className="register-link text-purple-600 hover:text-purple-800 font-medium transition-colors underline">
                Explore our catalog to get started
            </Link>
            .
          </p>
        </div>
      ) : (
        // Display the list of registered workshops
        <div className="registration-list grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {registrations.map((workshop) => (
            <div key={workshop.id} className="registered-card bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:shadow-xl hover:scale-[1.02]">
              
              <div className="card-image-placeholder h-40 bg-gray-100 flex items-center justify-center border-b border-gray-200">
                 <span className="text-2xl font-bold text-gray-500 p-2 bg-white/70 rounded-md">
                    {workshop.category || 'Workshop'}
                 </span>
              </div>
              
              <div className="card-details p-5">
                <p className="card-audience text-xs font-bold uppercase text-purple-600 mb-1">
                    {workshop.audience}
                </p>
                <h3 className="card-title text-xl font-extrabold text-gray-800 mb-3">
                    {workshop.title}
                </h3>
                
                <p className="card-time text-sm text-gray-600 flex items-center mb-4">
                  <span className="icon mr-2 text-lg">📅</span> 
                  {workshop.date} at {workshop.time}
                </p>
                
                <div className="flex justify-between items-center pt-3 border-t">
                    <Link to={`/workshops/${workshop.id}`} className="view-details-link text-sm text-blue-500 hover:text-blue-700 font-semibold transition-colors">
                      View Details →
                    </Link>
                    
                    {/* Unregister Button with onClick handler */}
                    <button 
                        onClick={() => handleUnregister(workshop.id, workshop.title)}
                        className="unregister-button bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded-md transition-colors font-medium"
                    >
                        Unregister
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrationsPage;