import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import cardDukaan from '../assets/card-dukaan.png';
import cardRegistration from '../assets/card-registration.png';
import cardSaheliPoocho from '../assets/card-saheli-poocho.png';

const featureList = [
  {
    id: 'dukaan-ki-baat',
    title: 'dukaan ki baat',
    cardImage: cardDukaan,
    alt: 'Dukaan Ki Baat - Illustrated traditional Pakistani shopfront with snacks and plants',
    theme: 'theme-cream',
    description: 'Apni dukaan aur product ko Saheli ki nazar se dekhein — behtari ke seedhay, kaam ke mashwaray ke saath.',
    buttonText: 'Dukaan Ki Baat',
    route: '/dukaan-ki-baat',
  },
  {
    id: 'seller-registration',
    title: 'seller registration',
    cardImage: cardRegistration,
    alt: 'Seller Registration - Illustrated clipboard with FBR registration, NTN number and sales tax booklet',
    theme: 'theme-terracotta',
    description: 'Apne business ko register karne ke safar mein FBR, NTN aur zaroori registration steps ko asaan tareeqay se samjhein.',
    buttonText: 'Seller Registration',
    route: '/seller-registration',
  },
  {
    id: 'saheli-ai',
    title: 'saheli se poocho',
    cardImage: cardSaheliPoocho,
    alt: 'Saheli AI - Illustrated woman talking on corded rotary phone',
    theme: 'theme-red',
    description: 'Pricing se le kar Instagram aur WhatsApp selling tak, business ke sawalon ka jawab apni Saheli se poochhein.',
    buttonText: 'Saheli Se Poocho',
    route: '/saheli-ai',
  },
];

const FeatureCards = ({ onOpenChat }) => {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    if (card.id === 'saheli-ai' && onOpenChat) {
      // Allows smooth chat drawer trigger while supporting full page routing
      navigate(card.route);
    } else {
      navigate(card.route);
    }
  };

  return (
    <section className="features-triptych-section" id="features" aria-label="Main Features">
      <div className="features-container">
        <div className="features-grid">
          {featureList.map((card) => (
            <article 
              key={card.id} 
              className={`poster-feature-card ${card.theme}`}
              onClick={() => handleCardClick(card)}
              tabIndex={0}
              role="button"
              aria-label={`Open ${card.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(card);
                }
              }}
            >
              {/* Illustrated Poster Card Artwork matching Image 1 */}
              <div className="poster-art-wrapper">
                <img 
                  src={card.cardImage} 
                  alt={card.alt} 
                  className="poster-art-image"
                  loading="lazy"
                />
              </div>

              {/* Editorial Description & Rectangular Action Button */}
              <div className="poster-card-footer">
                <p className="poster-card-desc">
                  {card.description}
                </p>

                <div className="poster-btn-wrapper">
                  <Button 
                    to={card.route}
                    variant="primary"
                    className="poster-unified-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    ariaLabel={`${card.buttonText} open`}
                  >
                    {card.buttonText}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
