import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import DomainPage from './pages/DomainPage';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/domain"
                    element={
                        <ProtectedRoute>
                            <DomainPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
