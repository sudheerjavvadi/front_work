// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <--- NEW IMPORT

const Header = () => {
  const { isLoggedIn, userRole, logout } = useAuth();

  return (
    <header className="main-header">
      <div className="header-left">
        <span className="logo-name">WorkshopFlow</span>
        <nav>
          {/* Workshop Link */}
          <Link to="/" className="nav-link">Workshops</Link>

          {/* NEW: My Registrations Link (Only for Students) */}
          {isLoggedIn && userRole === 'student' && (
            <Link to="/my-registrations" className="nav-link">              My Registrations</Link>
          )}
          {isLoggedIn && userRole === 'admin' && (
            <Link to="/admin" className="nav-link">              Admin</Link>
          )}

        </nav>
      </div>
      
      {/* Login / Logout Button */}
      {isLoggedIn ? (
        <button className="login-button" onClick={logout}>
          Logout
        </button>
      ) : (
        <Link to="/login" className="login-button-link">
          <button className="login-button">
            → Login
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;