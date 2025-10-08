// src/components/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const adminWorkshopsData = [
  { title: "Advanced React Patterns", category: "Technology", schedule: "Aug 15, 2024, 7:30 PM" },
  { title: "UI/UX Design Fundamentals", category: "Arts", schedule: "Aug 20, 2024, 11:50 PM" },
  { title: "Growth Hacking for Startups", category: "Marketing", schedule: "Sep 1, 2024, 9:30 PM" },
  { title: "Creative Writing: Finding Your Voice", category: "Creative Writing", schedule: "Sep 6, 2024, 12:30 AM" },
  { title: "Intro to Machine Learning", category: "Technology", schedule: "Sep 10, 2024, 7:30 PM" },
  { title: "Personal Finance & Investing 101", category: "Finance", schedule: "Sep 12, 2024, 10:30 PM" },
];

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
            <span className="logo-name">WorkshopFlow</span>
            <Link to="/workshops" className="nav-link">Workshops</Link>
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
          <Link to="/" className="logout-button">Logout</Link>
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