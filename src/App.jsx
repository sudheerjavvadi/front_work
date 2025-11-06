import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Context
// Note: Changed path to '../context/AuthContext' for consistency, though './context/AuthContext' may also work depending on the environment.
import { AuthProvider } from './context/AuthContext'; 

// Components
import Header from './components/Header';
import SearchAndFilter from './components/SearchAndFilter';
import WorkshopList from './components/WorkshopList';
import LoginPage from './components/LoginPage'; 
import RegisterPage from './components/RegisterPage'; 
import AdminDashboard from './components/AdminDashboard'; 
import WorkshopDetailPage from './components/WorkshopDetailPage';
import MyRegistrationsPage from './components/MyRegistrationsPage'; 
import ExamPage from './components/ExamPage'; 
import ArticlePage from './components/ArticlePage';
import FeedbackPage from './components/FeedbackPage';

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
    
    <WorkshopList />
  </>
);

/**
 * Layout component: Manages conditional rendering of the Header
 * and applies conditional CSS classes to the main content wrapper for full-width admin view.
 */
const Layout = () => {
    // Hooks to determine the current path
    const location = useLocation();
    
    // Check if the route starts with /admin (to cover /admin, /admin/create, etc.)
    const isAdminRoute = location.pathname.startsWith('/admin');

    // Conditional class name: use 'main-content-full-width' for admin, otherwise use default 'main-content'
    const mainContentClass = isAdminRoute ? 'main-content-full-width' : 'main-content';

    return (
        <>
            {/* Header is hidden only on the Admin Dashboard */}
            {!isAdminRoute && <Header />} 
            
            <main className={mainContentClass}>
                <Routes>
                    {/* Public/Catalog Routes */}
                    <Route path="/" element={<WorkshopCatalogPage />} />
                    <Route path="/workshops/:id" element={<WorkshopDetailPage />} />
                    
                    {/* Exam/Quiz Route */}
                    <Route path="/exam/:workshopId/module/:moduleId" element={<ExamPage />} /> 
                    <Route path="/reading/:workshopId/module/:moduleId/lesson/:lessonIndex" element={<ArticlePage />} />
                    <Route path="/feedback/:workshopId/:moduleId" element={<FeedbackPage />} />
                    
                    {/* Authentication Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                    {/* Student Dashboard Route (Protected) */}
                    <Route path="/my-registrations" element={<MyRegistrationsPage />} />
                    
                    {/* Admin Dashboard Route (Protected, uses nested routing) */}
                    {/* The /* allows AdminDashboard to handle /admin/create, /admin/settings etc. */}
                    <Route path="/admin/*" element={<AdminDashboard />} />
                    
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