import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Dashboard from './pages/Dashboard';
import Domains from './pages/Domains';
import Roles from './pages/Roles';
import Skills from './pages/Skills';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import TargetCursor from './components/TargetCursor';

function App() {
    return (
        <Router>
            <TargetCursor
                spinDuration={2}
                hideDefaultCursor={true}
                parallaxOn={true}
            />
            <Routes>
                {/* Public Routes - Redirect to dashboard if logged in */}
                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                <Route path="/signup" element={
                    <PublicRoute>
                        <Signup />
                    </PublicRoute>
                } />

                {/* Protected Routes - Redirect to login if not logged in */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/domains" element={
                    <ProtectedRoute>
                        <Domains />
                    </ProtectedRoute>
                } />
                <Route path="/roles/:domain" element={
                    <ProtectedRoute>
                        <Roles />
                    </ProtectedRoute>
                } />
                <Route path="/skills/:role" element={
                    <ProtectedRoute>
                        <Skills />
                    </ProtectedRoute>
                } />

                {/* Default Redirects */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
