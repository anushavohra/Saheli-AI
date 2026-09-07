import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';

const Navbar = ({ onOpenChat }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleCtaClick = () => {
    setIsMobileMenuOpen(false);
    if (onOpenChat) {
      onOpenChat();
    } else {
      navigate('/saheli-ai');
    }
  };

  return (
    <header className="navbar-container" role="banner">
      {/* Top Truck Art Chamakpatti Pattern Border */}
      <div className="navbar-truck-border" aria-hidden="true"></div>

      <div className="navbar-content">
        {/* Brand Wordmark matching Image 1 */}
        <NavLink to="/" className="brand-logo" onClick={handleNavClick}>
          <div className="logo-flower-badge" aria-hidden="true">
            <span>🌸</span>
          </div>
          <div className="brand-text-block">
            <span className="brand-name font-yatra">Saheli-AI</span>
            <span className="brand-subtext">Aapki Business Saheli</span>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`} aria-label="Main Navigation">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/dukaan-ki-baat" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            Dukaan Ki Baat
          </NavLink>

          <NavLink 
            to="/seller-registration" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            Seller Registration
          </NavLink>

          <NavLink 
            to="/saheli-ai" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            Saheli Se Poocho
          </NavLink>

          {/* Mobile CTA */}
          <div className="mobile-cta-row">
            <Button 
              to="/saheli-ai"
              onClick={handleNavClick}
              ariaLabel="Saheli Se Poocho"
            >
              Saheli Se Poocho
            </Button>
          </div>
        </nav>

        {/* Desktop CTA & Mobile Hamburger */}
        <div className="nav-right-actions">
          <Button 
            to="/saheli-ai"
            className="desktop-cta"
            onClick={handleNavClick}
            ariaLabel="Saheli Se Poocho"
          >
            Saheli Se Poocho
          </Button>

          <button 
            type="button"
            className="hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open-1' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open-2' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open-3' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
