import React from 'react';
import { useNavigate } from 'react-router-dom';

const generalGuidance = [
  {
    id: 'pricing',
    title: 'Pricing',
    urduTitle: 'قیمت کا درست حساب',
    shortNote: 'Kacha maal + aap ka waqt + overheads + 30% profit margin ka formula.',
    prompt: 'Mere handmade product ki pricing kaise calculate karun?',
    tag: 'Formula'
  },
  {
    id: 'photography',
    title: 'Product Photography',
    urduTitle: 'پروڈکٹ فوٹوگرافی',
    shortNote: 'Bina mehangay camera ke natural daylight aur neutral background par shots.',
    prompt: 'Mobile se achhi product photography ke aasan tips batao.',
    tag: 'Visuals'
  },
  {
    id: 'listings',
    title: 'Listings & Descriptions',
    urduTitle: 'پروڈکٹ کی تفصیل',
    shortNote: 'Catchy captions, exact size measurements, aur care instructions.',
    prompt: 'Product description aur listing likhne ka behtareen tareeqa batao.',
    tag: 'Copywriting'
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Selling',
    urduTitle: 'واٹس ایپ پر فروخت',
    shortNote: 'Shayista customer replies, catalog setup, aur order confirmation templates.',
    prompt: 'WhatsApp par customers ko politely handle karne ke templates do.',
    tag: 'Customer Care'
  },
  {
    id: 'instagram',
    title: 'Instagram Selling',
    urduTitle: 'انسٹاگرام مارکیٹنگ',
    shortNote: 'Process reels, clear bio links, aur review highlights se trust build karna.',
    prompt: 'Instagram par handmade business ke orders kaise barhayein?',
    tag: 'Social Growth'
  }
];

const categoryGuidance = [
  {
    id: 'jewelry',
    name: 'Jewelry',
    urduName: 'زیورات و جھمکے',
    note: 'Anti-tarnish packing, size scale, aur metal clarity.',
    prompt: 'Handmade jewelry sell karne ke khaas tips aur packaging batao.'
  },
  {
    id: 'baking',
    name: 'Baked Goods',
    urduName: 'ہوم بیکنگ',
    note: 'Freshness date stickers, Bykea rider care, aur PFA hygiene standards.',
    prompt: 'Home bakery business ke liye packaging aur delivery tips do.'
  },
  {
    id: 'embroidery',
    name: 'Embroidery',
    urduName: 'کڑھائی اور سلائی',
    note: 'Fabric bleeding test, inches size chart, aur handmade story.',
    prompt: 'Embroidery aur silai collection ki marketing kaise karein?'
  },
  {
    id: 'candles',
    name: 'Candles',
    urduName: 'خوشبودار موم بتیاں',
    note: 'Burn instruction cards, fragrance notes, aur heat safety.',
    prompt: 'Scented candles business ke liye safety labels aur marketing batao.'
  },
  {
    id: 'crochet',
    name: 'Crochet & Knitting',
    urduName: 'اون اور بنائی',
    note: 'Yarn details, custom orders advance deposits, aur washing care.',
    prompt: 'Crochet aur handmade knitting items ki pricing aur care kaise batayein?'
  },
  {
    id: 'clay',
    name: 'Clay Crafts',
    urduName: 'مٹی کا ہنر',
    note: 'Double bubble-wrap transit packing, sealing varnish, aur natural texture.',
    prompt: 'Handmade clay pottery aur crafts ko safely kaise ship karein?'
  }
];

const TrustSection = () => {
  const navigate = useNavigate();

  const handleTopicClick = (prompt) => {
    navigate('/saheli-ai', { state: { initialPrompt: prompt } });
  };

  return (
    <section className="knowledge-editorial-section" id="what-saheli-helps-with" aria-label="What Saheli Can Help With">
      <div className="knowledge-section-wrapper">
        {/* Section Header */}
        <div className="knowledge-header">
          <span className="knowledge-badge-pill">KNOWLEDGE BASE</span>
          <h2 className="knowledge-heading">
            Saheli Kis Kis Mein Madad Kar Sakti Hai?
          </h2>
          <p className="knowledge-subheading">
            Packaging se le kar pricing aur category-specific guidance tak — har baat aasan aur seedhay alfaz mein.
          </p>
        </div>

        {/* 1. General Business Guidance Notes */}
        <div className="knowledge-block">
          <div className="block-label-row">
            <span className="block-label-icon">✦</span>
            <h3 className="block-label-title">Aam Karobari Rehnumai</h3>
            <span className="block-label-line"></span>
          </div>

          <div className="scrapbook-tiles-grid">
            {generalGuidance.map((item) => (
              <div 
                key={item.id} 
                className="scrapbook-tile paper-note"
                onClick={() => handleTopicClick(item.prompt)}
                role="button"
                tabIndex={0}
                aria-label={`Learn about ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTopicClick(item.prompt);
                  }
                }}
              >
                <div className="paper-tape-accent" aria-hidden="true"></div>
                <div className="tile-top-row">
                  <span className="tile-tag">{item.tag}</span>
                  <span className="tile-urdu">{item.urduTitle}</span>
                </div>
                <h4 className="tile-title">{item.title}</h4>
                <p className="tile-note">{item.shortNote}</p>
                <div className="tile-action-prompt">
                  <span>Poochhein &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Category Guides */}
        <div className="knowledge-block category-block">
          <div className="block-label-row">
            <span className="block-label-icon">✦</span>
            <h3 className="block-label-title">Khaas Hunnar & Category Guides</h3>
            <span className="block-label-line"></span>
          </div>

          <div className="category-crafts-grid">
            {categoryGuidance.map((cat) => (
              <div 
                key={cat.id} 
                className="category-craft-card"
                onClick={() => handleTopicClick(cat.prompt)}
                role="button"
                tabIndex={0}
                aria-label={`Guide for ${cat.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTopicClick(cat.prompt);
                  }
                }}
              >
                <div className="craft-card-content">
                  <div className="craft-title-row">
                    <h4 className="craft-name">{cat.name}</h4>
                    <span className="craft-urdu">{cat.urduName}</span>
                  </div>
                  <p className="craft-note">{cat.note}</p>
                </div>
                <div className="craft-card-arrow" aria-hidden="true">&rarr;</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
