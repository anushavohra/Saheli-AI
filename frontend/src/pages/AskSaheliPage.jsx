import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { sendChatMessage, getSessionId, getSavedSellerProfile } from '../services/api';
import cardSaheliPoocho from '../assets/card-saheli-poocho.png';

const knowledgePrompts = [
  { label: 'Pricing Formula', prompt: 'Mere handmade product ki pricing kaise calculate karun? Formula batao.' },
  { label: 'Product Photography', prompt: 'Mobile se natural light mein achhi product photography kaise karein?' },
  { label: 'WhatsApp Customer Reply', prompt: 'WhatsApp par polite customer reply draft karo pricing aur delivery charges batane ke liye.' },
  { label: 'Instagram Reach & Reels', prompt: 'Instagram par handmade craft ke orders aur reach barhane ke tips do.' },
  { label: 'Catchy Listing Copy', prompt: 'Handmade product ke liye catchy product description aur hashtags likh do.' },
  { label: 'Safe Craft Packaging', prompt: 'Delivery mein handmade items tootne se bachane ke packaging tips do.' }
];

const AskSaheliPage = () => {
  const location = useLocation();
  const sellerProfile = getSavedSellerProfile();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'saheli',
      text: `Assalam-o-Alaikum!\nMain **Saheli** hoon — aap ki business mashwara dost.${sellerProfile?.name ? ` Mujhe pata hai aap ka brand **"${sellerProfile.name}"** hai!` : ''}\n\nPricing ho, photography, customer reply, ya Instagram selling — be-jhijhak poochhein. Main sun rahi hoon!`
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const isInitialMount = useRef(true);

  // Auto-fill prompt if passed via navigation state
  useEffect(() => {
    if (location.state?.initialPrompt) {
      setInputText(location.state.initialPrompt);
    }
  }, [location.state]);

  // Scroll to bottom only after user interactions or incoming messages (never on page load)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (messages.length > 1 || isTyping) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const sessionId = getSessionId();
      const reply = await sendChatMessage(text, sessionId);
      const saheliMsg = {
        id: Date.now() + 1,
        sender: 'saheli',
        text: reply
      };
      setMessages((prev) => [...prev, saheliMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareWhatsApp = (text) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="saheli-chat-page" aria-label="Ask Saheli Conversational Mentor">
      {/* 1. Header Banner matching brand identity */}
      <header className="chat-intro-banner">
        <div className="chat-intro-container">
          <div className="chat-intro-left">
            <span className="editorial-badge red-badge">GROUNDED AI MENTOR</span>
            <h1 className="chat-page-heading">
              Saheli Se Poocho
            </h1>
            <p className="chat-page-lead">
              Pricing se le kar Instagram aur WhatsApp selling tak, business ke sawalon ka jawab apni Saheli se poochhein.
            </p>
            {sellerProfile?.name && (
              <div className="seller-active-badge">
                <span>Personalized for <strong>{sellerProfile.name}</strong> ({sellerProfile.category || 'Handmade'})</span>
              </div>
            )}
          </div>

          <div className="chat-intro-art-frame">
            <img 
              src={cardSaheliPoocho} 
              alt="Saheli se poocho woman on rotary phone illustration" 
              className="chat-intro-thumb"
            />
          </div>
        </div>
      </header>

      {/* 2. Conversational Paper-Textured Interface */}
      <main className="chat-main-surface">
        <div className="chat-surface-wrapper">
          {/* Quick Guidance Prompt Cards */}
          <div className="chat-prompts-bar">
            <span className="prompts-bar-label">Mashwara Topics:</span>
            <div className="prompts-bar-scroll">
              {knowledgePrompts.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputText(item.prompt);
                    handleSend(item.prompt);
                  }}
                  className="editorial-topic-chip"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Stream */}
          <div className="chat-messages-container" role="log" aria-label="Saheli Conversation History">
            {messages.map((msg) => (
              <article 
                key={msg.id}
                className={`editorial-message-row ${msg.sender === 'user' ? 'row-user' : 'row-saheli'}`}
              >
                <div className="editorial-message-card">
                  <div className="message-sender-meta">
                    <span className="sender-tag">
                      {msg.sender === 'user' ? 'Aap' : 'Saheli AI'}
                    </span>
                  </div>

                  <div className="message-content-text">
                    {msg.text.split('\n').map((line, lineIdx) => {
                      const trimmed = line.trim();
                      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                        return <strong key={lineIdx} className="line-strong">{trimmed.slice(2, -2)}<br /></strong>;
                      }
                      if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
                        return <div key={lineIdx} className="line-bullet">{trimmed}</div>;
                      }
                      return (
                        <span key={lineIdx}>
                          {line}
                          {lineIdx < msg.text.split('\n').length - 1 && <br />}
                        </span>
                      );
                    })}
                  </div>

                  {msg.sender === 'saheli' && (
                    <div className="message-actions-bar">
                      <button 
                        type="button" 
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="msg-action-btn"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? 'Copied!' : 'Copy Text'}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleShareWhatsApp(msg.text)}
                        className="msg-action-btn whatsapp-action"
                        title="Share on WhatsApp"
                      >
                        WhatsApp
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}

            {isTyping && (
              <div className="editorial-message-row row-saheli">
                <div className="editorial-message-card typing-card">
                  <span className="typing-label">Saheli mashwara soch rahi hai...</span>
                  <div className="hand-drawn-dots" aria-hidden="true">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }} 
            className="chat-editorial-input-form"
          >
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Saheli se poochhein, jaise: 'Customer ke liye Eid special offer kaise banayein?'..."
              className="chat-text-input"
              disabled={isTyping}
              autoFocus
            />
            <button 
              type="submit" 
              className="chat-editorial-submit-btn"
              disabled={!inputText.trim() || isTyping}
              aria-label="Send question to Saheli"
            >
              <span>Poochhein</span>
              <span className="btn-arrow" aria-hidden="true">&rarr;</span>
            </button>
          </form>

          <footer className="chat-support-note">
            <span>Saheli Roman Urdu, Urdu aur English teeno zabanon mein behtareen mashwara deti hai.</span>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AskSaheliPage;
