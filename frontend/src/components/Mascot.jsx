import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import mascotCat from '../assets/mascot-saheli-cat.png';

/**
 * Mascot Overlay Component
 * Route-aware:
 * - On Homepage: Hidden in hero (scrollY < 200px) -> Center-screen intro with speech bubble -> Dock to bottom-right corner
 * - On Sub-pages: Mounts already docked in the bottom-right corner
 */
const Mascot = ({ onOpenChat }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHomepage = pathname === '/';

  // State: 'hidden' | 'center' | 'docked'
  const [stage, setStage] = useState(isHomepage ? 'hidden' : 'docked');
  const [hasIntroduced, setHasIntroduced] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const timerRef = useRef(null);
  const triggerScrollRef = useRef(0);

  // Sync stage when route changes
  useEffect(() => {
    if (!isHomepage) {
      setStage('docked');
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      if (window.scrollY < 200) {
        setStage('hidden');
      } else if (hasIntroduced) {
        setStage('docked');
      }
    }
  }, [pathname, isHomepage, hasIntroduced]);

  // Handle scroll on homepage
  useEffect(() => {
    if (!isHomepage) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < 150) {
        // Returned back to top/hero
        setStage('hidden');
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      } else if (currentScroll >= 200) {
        if (!hasIntroduced && stage === 'hidden') {
          // Trigger center introduction
          setStage('center');
          triggerScrollRef.current = currentScroll;

          // Auto-dock after 3.5s
          timerRef.current = setTimeout(() => {
            setStage('docked');
            setHasIntroduced(true);
          }, 3500);
        } else if (stage === 'center') {
          // If user continues scrolling while in center intro, dock early
          if (Math.abs(currentScroll - triggerScrollRef.current) > 120) {
            if (timerRef.current) clearTimeout(timerRef.current);
            setStage('docked');
            setHasIntroduced(true);
          }
        } else if (hasIntroduced && stage === 'hidden') {
          setStage('docked');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount in case already scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isHomepage, hasIntroduced, stage]);

  const handleDismissIntro = (e) => {
    e.stopPropagation();
    if (timerRef.current) clearTimeout(timerRef.current);
    setStage('docked');
    setHasIntroduced(true);
  };

  const handleMascotClick = () => {
    if (stage === 'center') {
      if (timerRef.current) clearTimeout(timerRef.current);
      setStage('docked');
      setHasIntroduced(true);
      navigate('/saheli-ai');
    } else {
      navigate('/saheli-ai');
    }
  };

  if (stage === 'hidden') {
    return null;
  }

  return (
    <aside 
      className={`mascot-overlay-root mascot-stage-${stage}`}
      aria-label="Saheli AI Companion"
    >
      {/* 1. Center Intro Viewport Mode */}
      {stage === 'center' && (
        <div 
          className="mascot-center-backdrop"
          onClick={handleDismissIntro}
          aria-modal="false"
          role="region"
        >
          <div 
            className="mascot-center-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mascot Avatar Figure */}
            <div className="mascot-avatar-wrapper">
              <img 
                src={mascotCat} 
                alt="Saheli AI cat mascot companion" 
                className="mascot-avatar-img"
              />
              <span className="mascot-glow-ring" aria-hidden="true"></span>
            </div>

            {/* Floating Speech Bubble */}
            <div className="mascot-intro-bubble" role="dialog" aria-label="Saheli Welcome Message">
              <div className="speech-badge">AAPKI SAHELI</div>
              <h2 className="speech-heading">
                Khushamdeed, main aapki Saheli hoon.
              </h2>
              <p className="speech-paragraph">
                Aap ke hunar ko aik kamiyab karobar mein badalna mera maqsad hai. Chahay dukaan ki setting ho, FBR registration ho, ya roz ke business sawalat — aaiye mil kar shuru karein!
              </p>
              
              <div className="speech-action-row">
                <button 
                  type="button" 
                  className="speech-btn-chat"
                  onClick={handleMascotClick}
                >
                  <span>Baat Shuru Karein</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
                <button 
                  type="button" 
                  className="speech-btn-dismiss"
                  onClick={handleDismissIntro}
                  aria-label="Continue browsing"
                >
                  Aagey Dekhein &times;
                </button>
              </div>

              {/* Speech bubble pointer pointing to cat */}
              <div className="speech-pointer-left" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Docked Persistent Corner Companion */}
      {stage === 'docked' && (
        <div 
          className={`mascot-docked-pin ${isHovered ? 'docked-hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleMascotClick}
          role="button"
          tabIndex={0}
          aria-label="Ask Saheli AI companion"
          title="Saheli se poocho"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleMascotClick();
            }
          }}
        >
          {/* Gentle Hover Tooltip */}
          <div 
            className={`mascot-hover-tooltip ${isHovered ? 'tooltip-visible' : ''}`}
            aria-hidden="true"
          >
            <span>Koi sawaal hai? Poochhein! 🌸</span>
          </div>

          {/* Clean Mascot Portrait Stamp */}
          <div className="mascot-stamp-frame">
            <img 
              src={mascotCat} 
              alt="Saheli mascot" 
              className="mascot-stamp-img"
            />
            <span className="stamp-pulse-ring" aria-hidden="true"></span>
          </div>
        </div>
      )}
    </aside>
  );
};

// Backwards compatibility stub if anything references MascotWelcomeBanner
export const MascotWelcomeBanner = () => null;
export const MascotFloating = Mascot;

export default Mascot;
