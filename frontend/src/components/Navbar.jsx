import React from 'react';

const Navbar = ({ onOpenChat }) => {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Brand Logo */}
        <div className="brand-logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C13.5 6 17.5 7.5 22 8C18 9.5 16.5 13.5 16 18C14.5 14 10.5 12.5 6 12C10 10.5 11.5 6.5 12 2Z" fill="#C04A3E"/>
            <circle cx="12" cy="12" r="3" fill="#EAA536"/>
          </svg>
          <span className="brand-name">SAHELI AI</span>
        </div>

        {/* Center Nav Links */}
        <nav className="nav-links">
          <a href="#how-it-helps" onClick={(e) => scrollToSection(e, 'how-it-helps')} className="nav-link">
            HOW IT HELPS
          </a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="nav-link">
            ABOUT
          </a>
        </nav>

        {/* Right Action Button */}
        <button 
          className="nav-cta-btn" 
          onClick={() => onOpenChat()}
          aria-label="Open Ask Saheli Chat"
        >
          ASK SAHELI
        </button>
      </div>
    </header>
  );
};

export default Navbar;
