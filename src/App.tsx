import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SchoolsPage from './pages/SchoolsPage';
import SchoolDetailPage from './pages/SchoolDetailPage';
import SchoolOnboarding from './pages/SchoolOnboarding';
import SchoolAuth from './pages/SchoolAuth';
import SchoolDashboard from './pages/SchoolDashboard';
import ParentAuth from './pages/ParentAuth';
import ParentDashboard from './pages/ParentDashboard';
import ApplicationForm from './pages/ApplicationForm';
import PlatformAdminDashboard from './pages/PlatformAdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/schools" element={<SchoolsPage />} />
        <Route path="/schools/:schoolId" element={<SchoolDetailPage />} />
        
        {/* School routes */}
        <Route path="/school/onboarding" element={<SchoolOnboarding />} />
        <Route path="/school/auth" element={<SchoolAuth />} />
        <Route path="/school/dashboard" element={<SchoolDashboard />} />
        
        {/* Parent routes */}
        <Route path="/parent/auth" element={<ParentAuth />} />
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/apply/:schoolId" element={<ApplicationForm />} />
        
        {/* Platform admin routes */}
        <Route path="/admin" element={<PlatformAdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
