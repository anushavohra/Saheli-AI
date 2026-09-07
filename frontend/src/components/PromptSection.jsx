import React from 'react';

const promptCards = [
  {
    id: 1,
    text: "Instagram caption likh do",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C04A3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  {
    id: 2,
    text: "Customer ko reply draft karo",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#267A75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <path d="M8 9h8"></path>
        <path d="M8 13h6"></path>
      </svg>
    )
  },
  {
    id: 3,
    text: "Pricing suggest karo",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EAA536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
        <line x1="7" y1="7" x2="7.01" y2="7"></line>
      </svg>
    )
  },
  {
    id: 4,
    text: "Business register kaise karun?",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#267A75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
      </svg>
    )
  },
  {
    id: 5,
    text: "Eid sale ka idea do",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C04A3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6"></path>
        <path d="M10 22h4"></path>
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
      </svg>
    )
  },
  {
    id: 6,
    text: "Product description likh do",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EAA536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
    )
  }
];

const PromptSection = ({ onSelectPrompt }) => {
  return (
    <section className="prompt-section" id="prompt-section">
      {/* Background Decorative Accents */}
      <div className="left-accent-circles" aria-hidden="true">
        <div className="circle circle-teal"></div>
        <div className="circle circle-coral"></div>
      </div>
      <div className="left-sage-wash" aria-hidden="true"></div>

      <div className="prompt-container">
        {/* Section Header */}
        <h2 className="prompt-header">
          <span className="flower-icon left-flower">🌷</span>
          <span>Saheli se kya pooch sakti hain?</span>
          <span className="flower-icon right-flower">🌷</span>
        </h2>

        {/* 6 Interactive Prompt Cards */}
        <div className="prompt-grid">
          {promptCards.map((card) => (
            <button
              key={card.id}
              className="prompt-card"
              onClick={() => onSelectPrompt(card.text)}
              aria-label={`Ask prompt: ${card.text}`}
            >
              <div className="card-icon">{card.icon}</div>
              <p className="card-text">{card.text}</p>
            </button>
          ))}
        </div>

      </div>

      {/* Bottom Right Floral Motif Plaque */}
      <div className="bottom-right-plaque" aria-hidden="true">
        <div className="plaque-square">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C13.5 6 17.5 7.5 22 8C18 9.5 16.5 13.5 16 18C14.5 14 10.5 12.5 6 12C10 10.5 11.5 6.5 12 2Z" fill="#FFFFFF"/>
            <circle cx="12" cy="12" r="3" fill="#EAA536"/>
          </svg>
        </div>
        <span className="plaque-annotation">Hand-painted floral motifs</span>
      </div>
    </section>
  );
};

export default PromptSection;
