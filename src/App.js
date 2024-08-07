import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import EmployeeRegistration from './components/EmployeeRegistration';
import MedicalExamInput from './components/MedicalExamInput';
import ResultsViewer from './components/ResultsViewer';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
};

function AppContent() {
  const { user, logout } = useAuth();

  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Health Data System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user && (
                <>
                  <Nav.Link href="/register">Employee Registration</Nav.Link>
                  <Nav.Link href="/medical-exam">Medical Exam Input</Nav.Link>
                  <Nav.Link href="/results">View Results</Nav.Link>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<ProtectedRoute><EmployeeRegistration /></ProtectedRoute>} />
          <Route path="/medical-exam" element={<ProtectedRoute><MedicalExamInput /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><ResultsViewer /></ProtectedRoute>} />
        </Routes>
      </Container>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;