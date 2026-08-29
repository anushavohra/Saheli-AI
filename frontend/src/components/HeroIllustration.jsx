import React from 'react';
import saheliHeroImg from '../assets/saheli-hero.jpg';

const HeroIllustration = () => {
  return (
    <div className="hero-illustration-frame">
      <div className="hero-illustration-inner">
        <img 
          src={saheliHeroImg} 
          alt="Illustration of a Pakistani woman entrepreneur working at her sewing machine" 
          className="hero-art-img"
        />

        {/* TOP RIGHT STICKY NOTE */}
        <div className="sticky-note top-right-note">
          <div className="pushpin"></div>
          <p className="note-text">
            Apna kaam, apni pehchaan, apni Saheli. ♥
          </p>
        </div>

        {/* BOTTOM LEFT STICKY NOTE */}
        <div className="sticky-note bottom-left-note">
          <p className="note-text-tan">
            Thank You!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroIllustration;
