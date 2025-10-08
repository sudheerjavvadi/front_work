// src/components/RegisterPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="login-page-container"> {/* Reusing the layout container style */}
      <div className="login-card">
        <div className="login-header">
          {/* Purple Book/Icon placeholder */}
          <div className="login-icon">📖</div> 
          <h2>Create an Account</h2>
          <p className="login-subtitle">
            Join WorkshopFlow to start your learning journey today.
          </p>
        </div>

        <form className="login-form">
          {/* Full Name Field */}
          <label htmlFor="fullName">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            placeholder="John Doe"
          />

          {/* Email Field */}
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="m@example.com"
          />

          {/* Password Field */}
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder=""
          />

          {/* Role Selection (NEW REQUIREMENT) */}
          <div className="role-selection">
            <label>Role</label>
            <div className="roles">
              <label>
                <input type="radio" name="role" value="student" defaultChecked />
                Student
              </label>
              <label>
                <input type="radio" name="role" value="admin" />
                Admin
              </label>
            </div>
          </div>

          {/* Register Button */}
          <button type="submit" className="login-submit-button">
            Create Account
          </button>
        </form>

        <p className="register-link-text">
          Already have an account? <Link to="/login" className="register-link">Login</Link>
        </p>
      </div>

      {/* Footer is placed outside the card in index.css using fixed positioning */}
    </div>
  );
};

export default RegisterPage;