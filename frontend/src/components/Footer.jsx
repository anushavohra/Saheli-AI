import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-container" id="about">
      <div className="footer-content">
        <div className="footer-brand">
          <svg className="footer-logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C13.5 6 17.5 7.5 22 8C18 9.5 16.5 13.5 16 18C14.5 14 10.5 12.5 6 12C10 10.5 11.5 6.5 12 2Z" fill="#C04A3E"/>
            <circle cx="12" cy="12" r="3" fill="#EAA536"/>
          </svg>
          <span className="footer-title">SAHELI AI</span>
        </div>

        <p className="footer-tagline">
          banaya gaya pyaar se, Pakistan ke liye 🌸
        </p>

        <div className="footer-links">
          <a href="#instagram" className="footer-link">Instagram</a>
          <a href="#whatsapp" className="footer-link">WhatsApp</a>
          <a href="#about" className="footer-link">Humse Mile</a>
        </div>

        <p className="footer-copyright">
          &copy; 2026 Saheli AI. Har business ko chahiye ek saheli.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
