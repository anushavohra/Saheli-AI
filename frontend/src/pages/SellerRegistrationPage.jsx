import React, { useState, useEffect } from 'react';
import { createSellerProfile, getSavedSellerProfile } from '../services/api';
import cardRegistration from '../assets/card-registration.png';

const registrationSteps = [
  {
    step: '01',
    title: 'Zaroori Cheezein (What You Need)',
    urduTitle: 'لازمی دستاویزات',
    badge: 'Checklist',
    desc: 'Registration shuru karne se pehle yeh 4 cheezein apne paas rakh lein:',
    items: [
      'Asl CNIC (National Identity Card) ki saaf copy ya photo',
      'Mobile SIM jo aap ke apne CNIC par registered ho (verification code aayega)',
      'Ghar ya workshop ka bijli/utility bill (address verification ke liye)',
      'Active Email address jo aap ba-qaedgi se check karti hon'
    ]
  },
  {
    step: '02',
    title: 'Business Information & Sole Proprietorship',
    urduTitle: 'کاروباری نوعیت',
    badge: 'Structure',
    desc: 'Pakistani qanoon ke mutabiq home-based business ke liye Sole Proprietorship sab se aasan hai:',
    items: [
      'Sole Proprietor ka matlab hai: "Aap khud apne karobar ki malik hain"',
      'Iski koi official fee ya sarkari registery stamp nahi hota',
      'Apni dukaan ka aik pyara aur munfarid naam rakhein jo kisi aur brand ka na ho',
      'Visiting card ya simple letterhead print karwa lein (bank account mein kaam aayega)'
    ]
  },
  {
    step: '03',
    title: 'FBR Iris Portal Par Free NTN',
    urduTitle: 'این ٹی این بنوانا',
    badge: '10 Min Process',
    desc: 'National Tax Number (NTN) aap ki official business pehchaan hai FBR ke sath:',
    items: [
      'Official website iris.fbr.gov.pk par jayein',
      '"Registration for Unregistered Person" par click karein',
      'Apna CNIC, Mobile Number, aur Email darj karein',
      'SMS aur Email par aane wala 4-digit code enter karein aur Form 181 certificate download kar lein — NTN tayar!'
    ]
  },
  {
    step: '04',
    title: 'Sales Tax Guidance & Chhoot',
    urduTitle: 'سیلز ٹیکس کی رہنمائی',
    badge: 'Tax Clarity',
    desc: 'Bohot si khawateen tax se ghabrati hain, halanke cottage industries ko khaas chhoot hoti hai:',
    items: [
      'Cottage Industry Exemption: Chhotay paimaanay par ghar se banne wale crafts aam taur par general sales tax se exempt hotay hain',
      'Annual Income Threshold: Agar saalana aamdani basic taxable limit se kam ho, toh koi income tax nahi banta',
      'Filer banne ka faida: Bank transactions aur courier delivery par tax deduction kam hoti hai'
    ]
  },
  {
    step: '05',
    title: 'Next Steps: Bank Account & Raast',
    urduTitle: 'بینک اکاؤنٹ اور آن لائن ادائیگیاں',
    badge: 'Online Payments',
    desc: 'Personal aur business paison ko alag rakhna kamiyabi ki nishani hai:',
    items: [
      'Apne qareebi bank (Meezan, HBL, Bank Alfalah) jayein aur "Asaan Women Account" ya "Sole Proprietor Account" ki maloomat lein',
      'NTN certificate aur business letterhead pesh karein',
      'State Bank ke "Raast" system se apna mobile number link karein taake customer bina kisi bank charges ke fori payment bhej sakein'
    ]
  }
];

const SellerRegistrationPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sellerName, setSellerName] = useState('');
  const [category, setCategory] = useState('Jewelry');
  const [bio, setBio] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const saved = getSavedSellerProfile();
    if (saved) {
      if (saved.name) setSellerName(saved.name);
      if (saved.category) setCategory(saved.category);
      if (saved.bio) setBio(saved.bio);
    }
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!sellerName.trim()) return;

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await createSellerProfile({
        name: sellerName.trim(),
        category,
        bio: bio.trim()
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="registration-feature-page" aria-label="Seller Registration Guide">
      {/* 1. Header Banner matching Image 1 */}
      <header className="reg-intro-banner">
        <div className="reg-intro-container">
          <div className="reg-intro-left">
            <span className="editorial-badge terracotta-badge">LEGAL & TAX GUIDANCE</span>
            <h1 className="reg-page-heading">
              Seller Registration
            </h1>
            <p className="reg-page-lead">
              Apne business ko register karne ke safar mein FBR, NTN aur zaroori registration steps ko asaan tareeqay se samjhein.
            </p>
            <div className="reg-intro-highlights">
              <span className="hl-item">🏛️ FBR Iris Step-by-Step</span>
              <span className="hl-item">📋 Free NTN Generation</span>
              <span className="hl-item">🏦 Sole Proprietor Bank Account</span>
              <span className="hl-item">🌱 Cottage Industry Exemptions</span>
            </div>
          </div>

          <div className="reg-intro-art-frame">
            <img 
              src={cardRegistration} 
              alt="Seller Registration clipboard and seal illustration" 
              className="reg-intro-thumb"
            />
          </div>
        </div>
      </header>

      <main className="reg-main-content">
        <div className="reg-content-container">
          {/* Informational Disclaimer Notice */}
          <div className="reg-disclaimer-card" role="note">
            <span className="disclaimer-icon" aria-hidden="true">💡</span>
            <div className="disclaimer-text">
              <strong>Taleemi Rehnumai (Educational UI Guidance):</strong> Yeh guidance Pakistani khawateen ko FBR aur basic registration samajhne ke liye tayar ki gayi hai. Yeh qanooni ya official tax advice nahi hai.
            </div>
          </div>

          {/* 2. Step-by-Step Educational Road Map */}
          <section className="reg-roadmap-section" aria-label="Registration Steps">
            <div className="roadmap-tabs-header">
              <h2 className="roadmap-section-title">Registration Ke 5 Aasan Marahil</h2>
              <p className="roadmap-section-sub">
                Kisi step par click karein aur mukammal tafseel aasan Roman Urdu mein dekhein:
              </p>
            </div>

            <div className="roadmap-navigation-bar">
              {registrationSteps.map((step, idx) => (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`roadmap-nav-btn ${activeTab === idx ? 'nav-active' : ''}`}
                  aria-selected={activeTab === idx}
                >
                  <span className="nav-step-num">{step.step}</span>
                  <span className="nav-step-label">{step.badge}</span>
                </button>
              ))}
            </div>

            {/* Active Step Card */}
            <article className="active-step-card">
              <div className="step-card-header">
                <div className="step-card-meta">
                  <span className="step-number-tag">Step {registrationSteps[activeTab].step}</span>
                  <span className="step-badge-tag">{registrationSteps[activeTab].badge}</span>
                  <span className="step-urdu-title">{registrationSteps[activeTab].urduTitle}</span>
                </div>
                <h3 className="step-card-heading">
                  {registrationSteps[activeTab].title}
                </h3>
                <p className="step-card-lead">
                  {registrationSteps[activeTab].desc}
                </p>
              </div>

              <div className="step-card-body">
                <ul className="step-checklist">
                  {registrationSteps[activeTab].items.map((item, i) => (
                    <li key={i} className="step-check-item">
                      <span className="check-bullet" aria-hidden="true">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="step-card-footer">
                <div className="step-pager">
                  {activeTab > 0 && (
                    <button 
                      type="button" 
                      onClick={() => setActiveTab(activeTab - 1)}
                      className="step-pager-btn prev-btn"
                    >
                      &larr; Pichla Step ({registrationSteps[activeTab - 1].badge})
                    </button>
                  )}
                  {activeTab < registrationSteps.length - 1 && (
                    <button 
                      type="button" 
                      onClick={() => setActiveTab(activeTab + 1)}
                      className="step-pager-btn next-btn"
                    >
                      Agla Step ({registrationSteps[activeTab + 1].badge}) &rarr;
                    </button>
                  )}
                </div>
              </div>
            </article>
          </section>

          {/* 3. Connects to backend /seller/create */}
          <section className="seller-profile-card" aria-label="Save Seller Profile for Personalization">
            <div className="profile-card-header">
              <span className="profile-header-icon" aria-hidden="true">🌸</span>
              <div>
                <h2 className="profile-card-title">Apna Seller Profile Save Karein</h2>
                <p className="profile-card-sub">
                  Apne business ka naam aur category darj karein taake Saheli aap ko personalized mashwaray de sakay.
                </p>
              </div>
            </div>

            {saveSuccess && (
              <div className="profile-success-alert" role="status">
                <span>✓ Mubarak! Aap ka seller profile kamiyabi se mehfooz ho gaya hai. Ab Saheli aap ke business ko yaad rakhegi.</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="seller-profile-form">
              <div className="form-group">
                <label className="form-label" htmlFor="seller-name-input">
                  Aap Ki Dukaan / Business Ka Naam <span className="label-required">*</span>
                </label>
                <input 
                  id="seller-name-input"
                  type="text" 
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="Jaise: Hunar Crafts, Noor Baking Studio, Rangrez Silai..."
                  className="form-text-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="seller-cat-input">
                  Hunnar / Business Category
                </label>
                <select 
                  id="seller-cat-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select-input"
                >
                  <option value="Jewelry">Jewelry & Accessories</option>
                  <option value="Baked Goods">Baked Goods & Food</option>
                  <option value="Embroidery">Embroidery, Silai & Boutique</option>
                  <option value="Candles">Candles & Aromatherapy</option>
                  <option value="Crochet & Knitting">Crochet & Knitting</option>
                  <option value="Clay Crafts">Clay Crafts & Terracotta Pottery</option>
                  <option value="Other">Other Handcrafted Products</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="seller-bio-textarea">
                  Mukhtasir Bio (Aap kya banati hain?)
                </label>
                <textarea 
                  id="seller-bio-textarea"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Jaise: 3 saal se ghar par scented candles aur wax melts banati hoon, custom gift hampers bhi deliver karti hoon..."
                  rows={3}
                  className="form-textarea"
                />
              </div>

              <div className="form-submit-row">
                <button 
                  type="submit" 
                  className="seller-save-btn"
                  disabled={isSaving}
                  aria-busy={isSaving}
                >
                  {isSaving ? 'Save ho raha hai...' : 'Profile Save Karein →'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SellerRegistrationPage;
