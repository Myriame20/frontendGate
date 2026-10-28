import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCurrentUser, setCurrentUser } from './data/store';
import Layout from './components/Layout';
import Home from './pages/Home';
import Schools from './pages/Schools';
import SchoolDetail from './pages/SchoolDetail';
import Auth from './pages/Auth';
import ParentDashboard from './pages/ParentDashboard';
import SchoolDashboard from './pages/SchoolDashboard';

export default function App() {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogin = (type: 'parent' | 'school', id: string) => {
    setCurrentUser({ type, id });
    setUser({ type, id });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/schools/:id" element={<SchoolDetail user={user} />} />
          <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
          <Route
            path="/parent-dashboard"
            element={
              user?.type === 'parent' ? (
                <ParentDashboard parentId={user.id} />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
          <Route
            path="/school-dashboard"
            element={
              user?.type === 'school' ? (
                <SchoolDashboard adminId={user.id} />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
