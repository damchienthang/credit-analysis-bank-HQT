import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import PlatformPage from './pages/PlatformPage';
import TrendsPage from './pages/TrendsPage';
import ReportsPage from './pages/ReportsPage';
import ArchitecturePage from './pages/ArchitecturePage';
import AboutPage from './pages/AboutPage';

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
