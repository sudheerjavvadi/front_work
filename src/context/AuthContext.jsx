import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'student', 'admin', or null

  // Registration State (Stores the list of workshop objects the user is registered for)
  const [registrations, setRegistrations] = useState([]); 

  const login = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    // Redirect after successful login
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'student') {
      navigate('/');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setRegistrations([]); // Clear registrations on logout
    navigate('/'); 
  };

  /**
   * Checks if a user is already registered for a specific workshop.
   * @param {string} workshopId 
   * @returns {boolean}
   */
  const isRegistered = (workshopId) => {
    return registrations.some(w => w.id === workshopId);
  };
  
  /**
   * Adds a workshop to the registrations list.
   * @param {object} workshop - The full workshop object to register for.
   * @returns {boolean} - true if successful, false if already registered.
   */
  const registerWorkshop = (workshop) => {
    if (!isRegistered(workshop.id)) {
      // Add the full workshop object to the state
      setRegistrations(prevRegs => [...prevRegs, workshop]);
      return true;
    }
    return false;
  };
  
  /**
   * Removes a workshop from the registrations list by ID.
   * This is called when the 'Unregister' button is clicked.
   * @param {string} workshopId 
   */
  const unregisterWorkshop = (workshopId) => {
    setRegistrations(prevRegs => 
        // Filter out the workshop with the matching ID
        prevRegs.filter(w => w.id !== workshopId)
    );

    // Also clear any locally stored completion state for this workshop so
    // re-registering requires completing quizzes again before generating a certificate.
    try {
      const key = 'completedModules';
      const raw = localStorage.getItem(key);
      if (raw) {
        const data = JSON.parse(raw);
        if (data && data[workshopId]) {
          delete data[workshopId];
          localStorage.setItem(key, JSON.stringify(data));
        }
      }
    } catch (err) {
      console.error('Failed to clear completed modules for workshop', workshopId, err);
    }
  };

  // The value exposed to consumers
  const contextValue = {
    isLoggedIn,
    userRole,
    registrations, // The list of workshops the student is enrolled in
    login,
    logout,
    isRegistered, 
    registerWorkshop,
    unregisterWorkshop, // Essential for the unregister button logic
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook to consume the context
export const useAuth = () => {
  return useContext(AuthContext);
};