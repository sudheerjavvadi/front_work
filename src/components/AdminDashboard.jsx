// src/components/AdminDashboard.jsx (CORRECTED)

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 💡 IMPORT useAuth

const adminWorkshopsData = [
  { title: "Advanced React Patterns", category: "Technology", schedule: "Aug 15, 2024, 7:30 PM" },
  { title: "UI/UX Design Fundamentals", category: "Arts", schedule: "Aug 20, 2024, 11:50 PM" },
  // ... (rest of mock data remains the same)
];

const AdminDashboard = () => {
  // 💡 Use the logout function from your context
  const { logout } = useAuth();

  return (
    <div className="admin-dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
            <span className="logo-name">WorkshopFlow</span>
            <Link to="/" className="nav-link">Workshops</Link>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin" className="nav-item active">Workshops</Link>
          <Link to="/admin/create" className="nav-item">Create Workshop</Link>
          <Link to="/admin/settings" className="nav-item">Settings</Link>
        </nav>

        <div className="admin-user-info">
          <div className="user-avatar">A</div>
          <div className="user-details">
            <div className="user-name">Admin User</div>
            <div className="user-email">gopal@workshop.flow</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <div className="dashboard-header-bar">
          {/* 💡 REPLACE Link with a button that calls logout() */}
          <button 
             onClick={logout} 
             className="logout-button"
          >
             Logout
          </button>
        </div>

        <h2 className="dashboard-title">Admin Dashboard</h2>
        <div className="dashboard-section-header">
          <h3>Manage Workshops</h3>
          <button className="create-workshop-button">Create Workshop</button>
        </div>

        {/* Workshop Table */}
        <table className="workshop-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminWorkshopsData.map((workshop, index) => (
              <tr key={index}>
                <td className="table-title">{workshop.title}</td>
                <td className="table-category">{workshop.category}</td>
                <td className="table-schedule">{workshop.schedule}</td>
                <td className="table-actions">
                  <span className="action-link">Edit</span> | <span className="action-link delete">Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminDashboard;