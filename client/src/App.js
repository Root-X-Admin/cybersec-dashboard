import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from "./components/Navbar";
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import AnalystDashboard from './pages/dashboards/AnalystDashboard';
import SocDashboard from './pages/dashboards/SocDashboard';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Role-based Dashboards */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/analyst" element={
            <ProtectedRoute role="analyst">
              <AnalystDashboard />
            </ProtectedRoute>
          } />
          <Route path="/soc" element={
            <ProtectedRoute role="soc_manager">
              <SocDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
