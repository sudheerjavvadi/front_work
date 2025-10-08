// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <--- NEW IMPORT

const LoginPage = () => {
  const { login } = useAuth(); // Use the login function from context
  const [selectedRole, setSelectedRole] = useState('student'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // --- SIMULATED LOGIN LOGIC ---
    // In a real app, you'd check email/password here.
    // For this mockup, we just call the login function with the selected role.
    login(selectedRole); 
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        {/* ... (Header and Subtitle remain the same) ... */}

        <form className="login-form" onSubmit={handleLogin}> 
          {/* Email Field */}
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Field */}
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Role Selection */}
          <div className="role-selection">
            <label>Role</label>
            <div className="roles">
              <label>
                <input 
                  type="radio" 
                  name="role" 
                  value="student" 
                  checked={selectedRole === 'student'}
                  onChange={() => setSelectedRole('student')}
                />
                Student
              </label>
              <label>
                <input 
                  type="radio" 
                  name="role" 
                  value="admin" 
                  checked={selectedRole === 'admin'}
                  onChange={() => setSelectedRole('admin')}
                />
                Admin
              </label>
            </div>
          </div>

          <button type="submit" className="login-submit-button">
            Login
          </button>
        </form>

        <p className="register-link-text">
          Don't have an account? <Link to="/register" className="register-link">Register</Link>
        </p>
      </div>

      <footer className="login-footer">
        © 2025 WorkshopFlow. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;