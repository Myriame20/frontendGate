import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SchoolOnboarding from './pages/SchoolOnboarding';
import SchoolDashboard from './pages/SchoolDashboard';
import PageEditor from './pages/PageEditor';
import PublicSchoolPage from './pages/PublicSchoolPage';
import ParentDashboard from './pages/ParentDashboard';
import SchoolsSearch from './pages/SchoolsSearch';
import SchoolDetailParent from './pages/SchoolDetailParent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/ecoles" element={<SchoolsSearch />} />
        <Route path="/ecole/:slug" element={<SchoolDetailParent />} />
        
        {/* School */}
        <Route path="/ecole/onboarding" element={<SchoolOnboarding />} />
        <Route path="/ecole/dashboard" element={<SchoolDashboard />} />
        <Route path="/ecole/editor" element={<PageEditor />} />
        <Route path="/ecole/page/:slug" element={<PublicSchoolPage />} />
        
        {/* Parent */}
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
