import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './pages/auth/Login.jsx';
import SignUpPage from './pages/auth/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import Home from './pages/Home.jsx';
import Navbar from './components/layout/Navbar.jsx';
import About from './pages/About.jsx';
import AddSubject from './pages/admin/AddSubject.jsx';
import SubjectList from './pages/subjects/SubjectList';
import ResourceList from './pages/resources/ResourceList';
import PracticeList from './pages/practice/PracticeList';
import PracticeDetail from './pages/practice/PracticeDetail';
import AddResource from './pages/admin/AddResource';
import AddTest from './pages/admin/AddTest';
import UserProfile from './pages/profile/UserProfile';
import UserManagement from './pages/admin/UserManagement';
import api from './services/api.js';


// Authentication Context
export const AuthContext = React.createContext();

const App = () => {
  const [auth, setAuth] = useState(null);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/api/auth/user'); // Call API to check authentication
        setAuth(res.data); // Store user data
      } catch (error) {
        setAuth(null); // Not authenticated
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={auth?.role === 'admin' ? <AdminDashboard /> : auth ? <Dashboard /> : <Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          {/* View All Subjects (Public) */}
          <Route path="/subjects" element={<SubjectList allSubjects={!auth} />} />
          <Route path="/tests" element={<PracticeList allTests={!auth} />} />
        

          {/* Protected Routes for Authenticated Users */}
          <Route path="/subjects/:subjectId" element={auth ? <ResourceList /> : <Navigate to="/sign-in" />} />
          <Route path="/subjects/:subjectId/tests" element={auth ? <PracticeList /> : <Navigate to="/sign-in" />} />
          <Route path="/practice/test/:testId" element={auth ? <PracticeDetail /> : <Navigate to="/sign-in" />} />
          <Route path="/profile" element={auth ? <UserProfile /> : <Navigate to="/sign-in" />} />

          {/* Protected Admin Routes */}
          {auth?.role === 'admin' && (
            <>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/add-subject" element={<AddSubject />} />
              <Route path="/admin/add-resource" element={<AddResource />} />
              <Route path="/admin/add-test" element={<AddTest />} />
              
            </>
          )}

          {/* Protected Dashboard Route */}
          <Route path="/dashboard" element={auth ? <Dashboard /> : <Navigate to="/sign-in" />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;

