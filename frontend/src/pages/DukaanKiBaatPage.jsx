import React, { useState, useEffect } from 'react';
import { submitDukaanKiBaatReview, getSavedSellerProfile } from '../services/api';
import cardDukaan from '../assets/card-dukaan.png';

const DukaanKiBaatPage = () => {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bio, setBio] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [copied, setCopied] = useState(false);

  // Prepopulate bio from saved seller profile if available
  useEffect(() => {
    const saved = getSavedSellerProfile();
    if (saved?.bio) {
      setBio(saved.bio);
    }
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() && !photoFile) {
      setErrorMessage('Baraye meharbani product ka naam ya photo zaroor shamil karein.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const review = await submitDukaanKiBaatReview({
        photo: photoFile,
        title: title.trim(),
        description: description.trim(),
        bio: bio.trim()
      });
      setReviewResult(review);
      // Smooth scroll down to review results
      setTimeout(() => {
        document.getElementById('review-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } catch (err) {
      setErrorMessage('Review generate karne mein masla hua. Baraye meharbani dobara koshish karein.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleWhatsAppShare = (text) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleResetForm = () => {
    setReviewResult(null);
    setTitle('');
    setDescription('');
    setPhotoFile(null);
    setPhotoPreview(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="dukaan-feature-page" aria-label="Dukaan Ki Baat Product Review">
      {/* 1. Feature Intro Banner */}
      <header className="dukaan-intro-banner">
        <div className="dukaan-intro-container">
          <div className="dukaan-intro-left">
            <span className="editorial-badge">AI DUKAAN REVIEW</span>
            <h1 className="dukaan-page-heading">
              Dukaan Ki Baat
            </h1>
            <p className="dukaan-page-lead">
              Apni dukaan aur product ko Saheli ki nazar se dekhein — behtari ke seedhay, kaam ke mashwaray ke saath.
            </p>
            <div className="dukaan-intro-highlights">
              <span className="hl-item">Strength review</span>
              <span className="hl-item">Practical improvements</span>
              <span className="hl-item">Ready-to-use rewritten caption</span>
              <span className="hl-item">Weekly small goal</span>
            </div>
          </div>

          <div className="dukaan-intro-art-frame">
            <img 
              src={cardDukaan} 
              alt="Dukaan Ki Baat kiosk illustration" 
              className="dukaan-intro-thumb"
            />
          </div>
        </div>
      </header>

      <main className="dukaan-main-content">
        <div className="dukaan-content-container">
          {/* 2. Review Form */}
          <section className="dukaan-form-card" aria-label="Submit Product for Review">
            <div className="form-card-header">
              <h2 className="form-card-title">Product Ki Maloomaat Shamil Karein</h2>
              <p className="form-card-subtitle">
                Product photo aur description share karein, Saheli aap ko behtari ka review faraham karegi.
              </p>
            </div>

            {errorMessage && (
              <div className="form-error-alert" role="alert">
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="dukaan-input-form">
              {/* Product Photo Upload Field */}
              <div className="form-group photo-upload-group">
                <label className="form-label" htmlFor="product-photo-input">
                  Product Photo <span className="label-optional">(Recommended)</span>
                </label>
                
                {photoPreview ? (
                  <div className="photo-preview-box">
                    <img src={photoPreview} alt="Uploaded product preview" className="preview-image" />
                    <button 
                      type="button" 
                      onClick={handleRemovePhoto}
                      className="remove-photo-btn"
                      aria-label="Remove uploaded photo"
                    >
                      &times; Remove Photo
                    </button>
                  </div>
                ) : (
                  <div className="photo-dropzone">
                    <input 
                      id="product-photo-input"
                      type="file" 
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="file-input-hidden"
                    />
                    <label htmlFor="product-photo-input" className="dropzone-label">
                      <span className="dropzone-main-text">Product ki tasweer yahan upload karein</span>
                      <span className="dropzone-sub-text">PNG, JPG, JPEG (Max 10MB)</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Product Title */}
              <div className="form-group">
                <label className="form-label" htmlFor="product-title-input">
                  Product Ka Naam <span className="label-required">*</span>
                </label>
                <input 
                  id="product-title-input"
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Jaise: Handcrafted Terracotta Tea Set, Shadow Work Kurti..."
                  className="form-text-input"
                  required
                />
              </div>

              {/* Product Description */}
              <div className="form-group">
                <label className="form-label" htmlFor="product-desc-input">
                  Mawjooda Description / Caption <span className="label-optional">(Optional)</span>
                </label>
                <textarea 
                  id="product-desc-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Aap Instagram ya WhatsApp par is product ke sath kya likhti hain? (Ya koi khaas baat jaise material, size, pricing)..."
                  rows={4}
                  className="form-textarea"
                />
              </div>

              {/* Shop / Seller Bio */}
              <div className="form-group">
                <label className="form-label" htmlFor="seller-bio-input">
                  Aap Ki Dukaan / Shop Bio <span className="label-optional">(Optional)</span>
                </label>
                <input 
                  id="seller-bio-input"
                  type="text" 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Jaise: Ghar se handmade jewelry banati hoon, Lahore se deliver karti hoon..."
                  className="form-text-input"
                />
              </div>

              {/* Action Submit Button */}
              <div className="form-submit-row">
                <button 
                  type="submit" 
                  className="dukaan-submit-btn"
                  disabled={isLoading}
                  aria-busy={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner" aria-hidden="true"></span>
                      <span>Saheli review tayar kar rahi hai...</span>
                    </>
                  ) : (
                    <>
                      <span>Review Haasil Karein</span>
                      <span className="btn-arrow" aria-hidden="true">&rarr;</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* 3. Review Results Section (Illustrated/Editorial Format) */}
          {reviewResult && (
            <section className="dukaan-review-results" id="review-results" aria-label="Saheli Product Review Results">
              <div className="review-results-banner">
                <div>
                  <h2 className="review-results-title">
                    Saheli Ka Review: {title || 'Aap Ka Product'}
                  </h2>
                  <p className="review-results-sub">
                    Behtari ke seedhay, aasan mashwaray jo aap aaj hi apni dukaan par apply kar sakti hain.
                  </p>
                </div>
              </div>

              <div className="review-sections-grid">
                {/* 1. Jo acha hai */}
                {reviewResult.strength && (
                  <article className="review-card card-strength">
                    <div className="review-card-header">
                      <h3 className="review-section-heading">Jo Acha Hai</h3>
                    </div>
                    <div className="review-card-body">
                      <p>{reviewResult.strength}</p>
                    </div>
                  </article>
                )}

                {/* 2. Thori si behtari */}
                {reviewResult.improvements && (
                  <article className="review-card card-improvements">
                    <div className="review-card-header">
                      <h3 className="review-section-heading">Thori Si Behtari</h3>
                    </div>
                    <div className="review-card-body">
                      {Array.isArray(reviewResult.improvements) ? (
                        <ul className="improvements-list">
                          {reviewResult.improvements.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{reviewResult.improvements}</p>
                      )}
                    </div>
                  </article>
                )}

                {/* 3. Yeh text use kar sakti hain */}
                {reviewResult.rewritten_text && (
                  <article className="review-card card-rewritten">
                    <div className="review-card-header">
                      <h3 className="review-section-heading">Yeh Text Use Kar Sakti Hain</h3>
                    </div>
                    <div className="review-card-body">
                      <pre className="rewritten-copy-block">{reviewResult.rewritten_text}</pre>
                      
                      <div className="rewritten-actions-bar">
                        <button 
                          type="button" 
                          onClick={() => handleCopyText(reviewResult.rewritten_text)}
                          className="action-btn copy-btn"
                        >
                          {copied ? 'Copied!' : 'Copy Text'}
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleWhatsAppShare(reviewResult.rewritten_text)}
                          className="action-btn whatsapp-share-btn"
                        >
                          WhatsApp Par Bhejo
                        </button>
                      </div>
                    </div>
                  </article>
                )}

                {/* 4. Is haftay ka chhota goal */}
                {reviewResult.weekly_goal && (
                  <article className="review-card card-goal">
                    <div className="review-card-header">
                      <h3 className="review-section-heading">Is Haftay Ka Chhota Goal</h3>
                    </div>
                    <div className="review-card-body">
                      <p className="goal-text">{reviewResult.weekly_goal}</p>
                    </div>
                  </article>
                )}
              </div>

              <div className="review-bottom-actions">
                <button 
                  type="button" 
                  onClick={handleResetForm}
                  className="reset-review-btn"
                >
                  &larr; Aik Aur Product Review Karein
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default DukaanKiBaatPage;
