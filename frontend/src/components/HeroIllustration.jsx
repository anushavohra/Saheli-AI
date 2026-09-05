import React, { useState, useEffect } from 'react';
import craftSilai from '../assets/craft-silai.jpg';
import craftClay from '../assets/craft-clay.jpg';
import craftLoom from '../assets/craft-loom.jpg';
import craftBaking from '../assets/craft-baking.jpg';
import craftFragrance from '../assets/craft-fragrance.jpg';

const showcaseItems = [
  {
    id: 'silai',
    title: 'Silai & Stitching',
    urduTitle: 'سلائی اور کڑھائی',
    subtitle: 'Tailoring & Boutique Crafts',
    image: craftSilai,
    stickyNote: 'Apna kaam, apni pehchaan, apni Saheli. ♥',
    tag: 'Fashion & Textiles'
  },
  {
    id: 'clay',
    title: 'Clay & Craft',
    urduTitle: 'مٹی کا ہنر',
    subtitle: 'Handmade Pottery & Terracotta',
    image: craftClay,
    stickyNote: 'Safar apnay hunnar ka. ♥',
    tag: 'Pottery & Ceramics'
  },
  {
    id: 'loom',
    title: 'Loom & Legacy',
    urduTitle: 'دستکاری اور بنائی',
    subtitle: 'Weaving & Traditional Looms',
    image: craftLoom,
    stickyNote: 'Safar apnay hunnar ka. ♥',
    tag: 'Handloom & Weaving'
  },
  {
    id: 'baking',
    title: 'Baking & Flour Power',
    urduTitle: 'ہوم بیکنگ کا ذائقہ',
    subtitle: 'Custom Cakes & Home Bakeries',
    image: craftBaking,
    stickyNote: 'Safar apnay hunnar ka. ♥',
    tag: 'Home Bakery'
  },
  {
    id: 'fragrance',
    title: 'Fragrance & Glow',
    urduTitle: 'خوشبو اور روشنی',
    subtitle: 'Scented Candles & Organic Oils',
    image: craftFragrance,
    stickyNote: 'Safar apnay hunnar ka. ♥',
    tag: 'Candles & Aromatherapy'
  }
];

const HeroIllustration = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentCraft = showcaseItems[currentIndex];

  return (
    <div 
      className="hero-showcase-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Pakistani women home businesses showcase"
    >
      {/* Decorative truck-art corner floral flourish */}
      <div className="showcase-floral-badge" aria-hidden="true">
        <span>🌸</span>
        <span className="badge-text">{currentCraft.tag}</span>
      </div>

      <div className="hero-illustration-frame floating-frame">
        <div className="hero-illustration-inner">
          {/* Images stacked for smooth gentle crossfade & slide transition */}
          {showcaseItems.map((item, index) => {
            const isActive = index === currentIndex;
            return (
              <div 
                key={item.id}
                className={`showcase-slide ${isActive ? 'slide-active' : 'slide-inactive'}`}
                aria-hidden={!isActive}
              >
                <img 
                  src={item.image} 
                  alt={`${item.title} - ${item.subtitle}`} 
                  className="hero-art-img"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* TOP RIGHT STICKY NOTE */}
                <div className="sticky-note top-right-note">
                  <div className="pushpin" aria-hidden="true"></div>
                  <p className="note-text">
                    {item.stickyNote}
                  </p>
                </div>

                {/* BOTTOM LEFT CRAFT BADGE */}
                <div className="sticky-note bottom-left-craft">
                  <span className="craft-badge-urdu">{item.urduTitle}</span>
                  <span className="craft-badge-eng">{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Navigation Indicators & Craft Selector */}
      <div className="showcase-controls">
        <div className="showcase-dots">
          {showcaseItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`showcase-dot ${idx === currentIndex ? 'dot-active' : ''}`}
              aria-label={`View ${item.title}`}
              title={item.title}
            >
              <span className="dot-fill"></span>
            </button>
          ))}
        </div>

        <span className="showcase-caption">
          {currentCraft.title} • <em>Safar Apnay Hunnar Ka</em>
        </span>
      </div>
    </div>
  );
};

export default HeroIllustration;
