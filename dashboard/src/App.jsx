import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/Landing';
import DashboardPage from './pages/Dashboard';
import PlatformPage from './pages/Platform';
import TrendsPage from './pages/Trends';
import ReportsPage from './pages/Reports';
import ArchitecturePage from './pages/Architecture';
import AboutPage from './pages/About';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="platform" element={<PlatformPage />} />
          <Route path="trends" element={<TrendsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="architecture" element={<ArchitecturePage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
