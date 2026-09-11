import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Mascot from './components/Mascot';
import ChatbotDrawer from './components/ChatbotDrawer';
import HomePage from './pages/HomePage';
import DukaanKiBaatPage from './pages/DukaanKiBaatPage';
import SellerRegistrationPage from './pages/SellerRegistrationPage';
import AskSaheliPage from './pages/AskSaheliPage';
import './App.css';
import './components/SaheliLanding.css';

// Instant ScrollToTop on route transition
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function MainLayout() {
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [initialDrawerPrompt, setInitialDrawerPrompt] = useState('');

  const handleOpenDrawer = (prompt = '') => {
    setInitialDrawerPrompt(prompt);
    setIsChatDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsChatDrawerOpen(false);
    setInitialDrawerPrompt('');
  };

  return (
    <div className="saheli-app-container">
      {/* Background Decorative Pattern Layer with 5-8% Opacity & Soft Blur */}
      <div className="saheli-background-pattern" aria-hidden="true"></div>
      <div className="saheli-background-overlay" aria-hidden="true"></div>

      <ScrollToTop />

      {/* Top Editorial Navbar with Route Navigation */}
      <Navbar onOpenChat={() => handleOpenDrawer()} />

      {/* Main Routed Page Content */}
      <main className="saheli-main-content">
        <Routes>
          <Route path="/" element={<HomePage onOpenChat={handleOpenDrawer} />} />
          <Route path="/dukaan-ki-baat" element={<DukaanKiBaatPage />} />
          <Route path="/seller-registration" element={<SellerRegistrationPage />} />
          <Route path="/saheli-ai" element={<AskSaheliPage />} />
          <Route path="/ask-saheli" element={<AskSaheliPage />} />
          <Route path="*" element={<HomePage onOpenChat={handleOpenDrawer} />} />
        </Routes>
      </main>

      {/* Floating Cultural Mascot on all pages */}
      <Mascot onOpenChat={() => handleOpenDrawer()} />

      {/* Quick Chatbot Drawer */}
      <ChatbotDrawer 
        isOpen={isChatDrawerOpen}
        onClose={handleCloseDrawer}
        initialPrompt={initialDrawerPrompt}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;