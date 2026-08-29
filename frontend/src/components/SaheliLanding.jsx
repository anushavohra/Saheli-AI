import React, { useState } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import PromptSection from './PromptSection';
import ChatbotDrawer from './ChatbotDrawer';
import Footer from './Footer';
import './SaheliLanding.css';

const SaheliLanding = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState('');

  const handleOpenChat = (promptText = '') => {
    setInitialPrompt(promptText);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setInitialPrompt('');
  };

  return (
    <div className="saheli-page-wrapper">
      {/* Top Editorial Navbar */}
      <Navbar onOpenChat={() => handleOpenChat()} />

      {/* Main Hero Section */}
      <main>
        <HeroSection onOpenChat={() => handleOpenChat()} />

        {/* Prompt Examples Section */}
        <PromptSection onSelectPrompt={(promptText) => handleOpenChat(promptText)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Frontend-Only Chatbot Drawer */}
      <ChatbotDrawer 
        isOpen={isChatOpen} 
        onClose={handleCloseChat} 
        initialPrompt={initialPrompt} 
      />
    </div>
  );
};

export default SaheliLanding;