import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';
import TrustSection from '../components/TrustSection';
import EmpowermentSection from '../components/EmpowermentSection';

const HomePage = ({ onOpenChat }) => {
  return (
    <div className="homepage-content">
      {/* 1. Hero Section matching Image 1 */}
      <HeroSection onOpenChat={onOpenChat} />

      {/* 2. Three Illustrated Feature Cards matching Image 1 */}
      <FeatureCards onOpenChat={onOpenChat} />

      {/* 6. What Saheli Can Help With (Knowledge Base Sections) */}
      <TrustSection />

      {/* 7. Warm Brand Ending Section */}
      <EmpowermentSection />
    </div>
  );
};

export default HomePage;
