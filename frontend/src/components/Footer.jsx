import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container" role="contentinfo" id="about">
      {/* Decorative Truck-Art Inspired Geometric Border */}
      <div className="footer-truck-border" aria-hidden="true">
        <div className="truck-stripes"></div>
      </div>

      <div className="footer-content">
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <span className="footer-flower" aria-hidden="true">🌸</span>
              <span className="footer-title font-yatra">Saheli-AI</span>
            </div>
            <p className="footer-tagline">
              Har business ko chahiye aik saheli. AI mentor designed specifically for Pakistani women entrepreneurs running home-based businesses.
            </p>
            <p className="footer-desi-quote">
              "Apna business, apni mehnat, aur har qadam par aapki Saheli."
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-title font-yatra">Features</h4>
            <ul className="footer-links-list">
              <li><Link to="/dukaan-ki-baat" className="footer-link">Dukaan Ki Baat</Link></li>
              <li><Link to="/seller-registration" className="footer-link">Seller Registration</Link></li>
              <li><Link to="/saheli-ai" className="footer-link">Saheli Se Poocho</Link></li>
              <li><a href="/#what-saheli-helps-with" className="footer-link">Knowledge Base</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-title font-yatra">Guidance Topics</h4>
            <ul className="footer-links-list">
              <li><Link to="/saheli-ai" className="footer-link">Pricing Formulas</Link></li>
              <li><Link to="/saheli-ai" className="footer-link">Product Photography</Link></li>
              <li><Link to="/saheli-ai" className="footer-link">WhatsApp & Instagram Selling</Link></li>
              <li><Link to="/seller-registration" className="footer-link">FBR Iris & NTN Guide</Link></li>
            </ul>
          </div>

          {/* Mission & Community */}
          <div className="footer-links-col">
            <h4 className="footer-col-title font-yatra">Community</h4>
            <p className="footer-contact-text">
              Desi handmade crafts, jewelry, baking, silai, candles & pottery support:
            </p>
            <div className="footer-badges-list">
              <span className="desi-badge">🇵🇰 For Pakistan</span>
              <span className="desi-badge">🪡 Artisan Focused</span>
              <span className="desi-badge">🌱 100% Free Guidance</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Saheli-AI. Har business ko chahiye aik saheli.
          </p>
          <div className="footer-accent-symbols" aria-hidden="true">
            <span>🪡</span>
            <span>🪴</span>
            <span>🧁</span>
            <span>🕯️</span>
            <span>🧵</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
