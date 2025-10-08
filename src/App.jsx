import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Components (All component files must be explicitly defined in ./components/)
import Header from './components/Header';
import SearchAndFilter from './components/SearchAndFilter';
import WorkshopList from './components/WorkshopList';
import LoginPage from './components/LoginPage'; 
import RegisterPage from './components/RegisterPage'; 
import AdminDashboard from './components/AdminDashboard';
import WorkshopDetailPage from './components/WorkshopDetailPage';
import MyRegistrationsPage from './components/MyRegistrationsPage'; 

// Context (The AuthProvider must be in ./context/AuthContext.jsx)
import { AuthProvider } from './context/AuthContext'; 

// Global Stylesheet
import './index.css'; 

/**
 * Component combining the Workshop Catalog title, search bar, and workshop list.
 */
const WorkshopCatalogPage = () => (
  <>
    <section className="catalog-title-section">
      <h1>Workshop Catalog</h1>
      <p>Find the perfect workshop to advance your skills.</p>
    </section>
    <SearchAndFilter />
    <WorkshopList />
  </>
);

/**
 * Layout component: Manages conditional rendering of the Header
 * based on the current route (hides Header for the Admin Dashboard).
 */
const Layout = () => {
    // Hooks to determine the current path
    const location = useLocation();
    
    // Check if the route is dedicated to the admin dashboard
    const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');
    
    // 1. Admin Dashboard Path: Renders only the Dashboard component 
    if (isAdminRoute) {
        return (
            <main>
                <Routes>
                    {/* Admin Dashboard Route */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    {/* Allows for admin/settings or other sub-routes */}
                    <Route path="/admin/*" element={<AdminDashboard />} /> 
                </Routes>
            </main>
        );
    }

    // 2. Default Paths: Renders the standard Header and the main content area
    return (
        <>
            <Header /> 
            <main className="main-content">
                <Routes>
                    {/* Public/Catalog Routes */}
                    <Route path="/" element={<WorkshopCatalogPage />} />
                    <Route path="/workshops/:id" element={<WorkshopDetailPage />} />
                    
                    {/* Authentication Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                    {/* Student Dashboard Route (Only visible to students after login via conditional logic in Header.jsx) */}
                    <Route path="/my-registrations" element={<MyRegistrationsPage />} />
                    
                    {/* Catch-all for 404 */}
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </main>
        </>
    );
}

/**
 * Main App component: Sets up the routing context and global authentication provider.
 */
const App = () => {
  return (
    // BrowserRouter provides the routing capability
    <BrowserRouter>
      {/* AuthProvider makes the global login state available */}
      <AuthProvider>
          <div className="app-container">
            <Layout /> 
          </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
