import React from 'react';
import heroMarketplace from '../assets/hero-marketplace.jpg';

const HeroSection = ({ onOpenChat }) => {
  return (
    <section className="hero-reference-section" aria-label="Saheli AI Hero">
      <div className="hero-artwork-frame">
        <div className="hero-stage">
          {/* Background Artwork Frame */}
          <div className="hero-artwork-wrapper hero-fade-in">
            <img 
              src={heroMarketplace} 
              alt="Vibrant Pakistani traditional bazaar marketplace with artisan craft shops" 
              className="hero-artwork-image"
              fetchPriority="high"
            />

            {/* Overlaid Brand Identity matching Image 1 */}
            <div className="hero-overlay-content">
              <h1 className="hero-wordmark hero-title-enter">
                Saheli-AI
              </h1>
              <p className="hero-tagline hero-subtitle-enter">
                Har business ko chahiye aik saheli
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
