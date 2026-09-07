import React from 'react';
import Button from './Button';

const EmpowermentSection = () => {
  return (
    <section className="brand-ending-section" aria-label="Brand Closing Message">
      <div className="ending-wrapper">
        <div className="ending-inner-frame">
          {/* Subtle hand-drawn border flourish */}
          <div className="ending-flourish-top" aria-hidden="true">
            <span>🌸</span>
            <span className="flourish-divider"></span>
            <span>🪡</span>
            <span className="flourish-divider"></span>
            <span>🌸</span>
          </div>

          <h2 className="ending-heading">
            Har business ko chahiye aik Saheli.
          </h2>

          <p className="ending-subtext">
            Apna business, apni mehnat, aur har qadam par aapki Saheli. Home-based business shuru karna ya chalana ab tanha safar nahi.
          </p>

          <div className="ending-cta-wrap">
            <Button 
              to="/saheli-ai"
              variant="primary"
              ariaLabel="Start conversation with Saheli AI"
            >
              Saheli Se Baat Karein
            </Button>
          </div>

          <div className="ending-trust-badges">
            <span className="badge-item">🇵🇰 Pakistan Ke Hunnar Ke Liye</span>
            <span className="badge-sep">•</span>
            <span className="badge-item">Grounded AI Mashwara</span>
            <span className="badge-sep">•</span>
            <span className="badge-item">100% Free & Aasan</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmpowermentSection;
