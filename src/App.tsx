import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SchoolOnboarding from './pages/SchoolOnboarding';
import SchoolDashboard from './pages/SchoolDashboard';
import PageEditor from './pages/PageEditor';
import PublicSchoolPage from './pages/PublicSchoolPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<SchoolOnboarding />} />
        <Route path="/dashboard" element={<SchoolDashboard />} />
        <Route path="/editor" element={<PageEditor />} />
        <Route path="/ecole/:slug" element={<PublicSchoolPage />} />
      </Routes>
    </BrowserRouter>
  );
}
