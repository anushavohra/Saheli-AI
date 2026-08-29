import React from 'react';
import HeroIllustration from './HeroIllustration';

const HeroSection = ({ onOpenChat }) => {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      {/* Background Cultural Concentric Ornaments */}
      <div className="cultural-ornament ornament-top-left" aria-hidden="true">
        <div className="ring outer-ring"></div>
        <div className="ring middle-ring"></div>
        <div className="ring inner-ring"></div>
        <div className="ring center-dot"></div>
      </div>

      <div className="cultural-ornament ornament-top-right" aria-hidden="true">
        <div className="ring outer-ring"></div>
        <div className="ring middle-ring"></div>
        <div className="ring inner-ring"></div>
        <div className="ring center-dot"></div>
      </div>

      <div className="hero-container">
        {/* LEFT COLUMN: Editorial Text & Actions */}
        <div className="hero-left">

          {/* Editorial Serif Headline */}
          <h1 className="hero-headline">
            HAR BUSINESS<br />
            KO CHAHIYE EK<br />
            SAHELI <span className="headline-leaf" stroke="none">🍃</span>
          </h1>

          {/* Subheadline */}
          <h2 className="hero-subheadline">
            Your AI business companion for everyday business questions.
          </h2>

          {/* Description */}
          <p className="hero-description">
            Get help with customer replies, Instagram captions, pricing, planning, content ideas and more — in your language.
          </p>

          {/* Action CTAs */}
          <div className="hero-actions">
            <button 
              className="btn-primary-coral"
              onClick={() => onOpenChat()}
            >
              ASK SAHELI &rarr;
            </button>
            <a 
              href="#how-it-helps" 
              onClick={(e) => scrollToSection(e, 'prompt-section')}
              className="btn-secondary-teal"
            >
              HOW IT HELPS
            </a>
          </div>

          {/* Handwritten Annotation below CTA */}
          <div className="hero-annotation">
            <span>Aap poochhein, Saheli sunti hai.</span>
            <svg className="annotation-arrow" viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12 Q 40 18 70 8" stroke="#C04A3E" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M62 4 L 72 8 L 66 16" stroke="#C04A3E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* RIGHT COLUMN: Framed Illustration */}
        <div className="hero-right">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
