import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NotificationModal } from './components/NotificationModal';
import { Toast } from './components/Toast';

import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { LearningModule } from './pages/LearningModule';
import { LessonDetail } from './pages/LessonDetail';
import { QuizModule } from './pages/QuizModule';
import { CyberGamesPage } from './pages/CyberGamesPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { CertificatePage } from './pages/CertificatePage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLessonId, setSelectedLessonId] = useState('phishing-1');

  const currentView = !isAuthenticated ? 'auth' : activeTab;

  return (
    <div className="min-h-screen bg-[#050814] text-gray-100 font-sans relative selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Cyber Particle Background */}
      <ParticleBackground />

      {/* Main Layout Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Bar */}
        <Navbar activeTab={currentView} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="flex-grow">
          {currentView === 'auth' && <AuthPage setActiveTab={setActiveTab} />}
          {currentView === 'dashboard' && (
            <Dashboard 
              setActiveTab={setActiveTab} 
              setSelectedLessonId={setSelectedLessonId} 
            />
          )}
          {currentView === 'lessons' && (
            <LearningModule 
              setActiveTab={setActiveTab} 
              setSelectedLessonId={setSelectedLessonId} 
            />
          )}
          {currentView === 'lesson-detail' && (
            <LessonDetail 
              lessonId={selectedLessonId} 
              setActiveTab={setActiveTab} 
            />
          )}
          {currentView === 'quiz' && <QuizModule setActiveTab={setActiveTab} />}
          {currentView === 'games' && <CyberGamesPage />}
          {currentView === 'leaderboard' && <LeaderboardPage />}
          {currentView === 'analytics' && <AnalyticsPage />}
          {currentView === 'certificate' && <CertificatePage />}
          {currentView === 'settings' && <SettingsPage />}
          {currentView === 'profile' && <ProfilePage />}
        </main>

        {/* Floating Toast Notification */}
        <Toast />

        {/* Notification / Achievement Modal */}
        <NotificationModal />

        {/* Footer */}
        <Footer setActiveTab={setActiveTab} />

      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
