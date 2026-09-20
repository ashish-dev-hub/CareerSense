import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import AnalysisPage from './pages/AnalysisPage';
import DashboardPage from './pages/DashboardPage';
import RoadmapPage from './pages/RoadmapPage';
import ProjectGeneratorPage from './pages/ProjectGeneratorPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import InterviewModePage from './pages/InterviewModePage';
import NotFoundPage from './pages/NotFoundPage';
import { ProfileProvider } from './context/ProfileContext';

export default function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="setup" element={<ProfileSetupPage />} />
            <Route path="analysis" element={<AnalysisPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="roadmap" element={<RoadmapPage />} />
            <Route path="projects" element={<ProjectGeneratorPage />} />
            <Route path="resume" element={<ResumeAnalyzerPage />} />
            <Route path="interview" element={<InterviewModePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  );
}
