import React, { useState, useEffect, useRef } from 'react';

const demoResponses = [
  "Shukriya poochne ke liye! Main aapke business ke liye perfect Instagram caption ya customer reply likhne mein madad kar sakti hoon. 🌸",
  "Bohot achha sawaal hai! Pricing set karte waqt raw material cost, aap ka waqt, aur market rate teenon ko shamil karein.",
  "Zaroor! WhatsApp par customer ko reply bhejte waqt Hamesha 'Assalam-o-Alaikum' se shuru karein aur polite tone rakhein. 🌸"
];

const ChatbotDrawer = ({ isOpen, onClose, initialPrompt }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'saheli',
      text: "Assalam-o-Alaikum 🌸\nMain Saheli hoon.\nAaj business mein kis cheez mein madad chahiye?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Sync initial prompt when opened from a prompt card
  useEffect(() => {
    if (initialPrompt) {
      setInputText(initialPrompt);
    }
  }, [initialPrompt]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /* 
   * FRONTEND-ONLY SEND MESSAGE HANDLER
   * Note: This function manages local frontend chat state for demo interaction.
   * When integrating the real AI backend, replace the setTimeout demo logic below 
   * with your actual backend API call (e.g. fetch('/api/chat', ...)).
   */
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isTyping) return;

    // 1. Add User Message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: trimmed
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // 2. Simulate AI Response Delay (Frontend Demo Only)
    setTimeout(() => {
      const randomReply = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      const saheliMsg = {
        id: Date.now() + 1,
        sender: 'saheli',
        text: randomReply
      };
      setMessages((prev) => [...prev, saheliMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleChipClick = (chipText) => {
    setInputText(chipText);
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-overlay" onClick={onClose}>
      <div 
        className="chatbot-drawer" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Saheli AI Chatbot"
      >
        {/* Drawer Header */}
        <div className="chatbot-header">
          <div className="header-brand">
            <div className="header-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C13.5 6 17.5 7.5 22 8C18 9.5 16.5 13.5 16 18C14.5 14 10.5 12.5 6 12C10 10.5 11.5 6.5 12 2Z" fill="#C04A3E"/>
                <circle cx="12" cy="12" r="3" fill="#EAA536"/>
              </svg>
            </div>
            <div>
              <h3 className="header-title">SAHELI AI</h3>
              <p className="header-subtitle">Your business saheli</p>
            </div>
          </div>
          <button 
            className="chatbot-close-btn" 
            onClick={onClose}
            aria-label="Close Chat"
          >
            &times;
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="chatbot-chips">
          <button onClick={() => handleChipClick("Instagram caption likh do")} className="chip-btn">
            Instagram caption
          </button>
          <button onClick={() => handleChipClick("Pricing suggest karo")} className="chip-btn">
            Pricing idea
          </button>
          <button onClick={() => handleChipClick("Customer reply draft karo")} className="chip-btn">
            Customer reply
          </button>
        </div>

        {/* Chat Message History */}
        <div className="chatbot-body">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`chat-bubble-wrapper ${msg.sender === 'user' ? 'bubble-user' : 'bubble-saheli'}`}
            >
              {msg.sender === 'saheli' && (
                <div className="avatar-saheli" aria-hidden="true">🌸</div>
              )}
              <div className="chat-bubble">
                {msg.text.split('\n').map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx < msg.text.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="chat-bubble-wrapper bubble-saheli">
              <div className="avatar-saheli" aria-hidden="true">🌸</div>
              <div className="chat-bubble typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <form className="chatbot-footer" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="chatbot-input"
            placeholder="Saheli se poochhein..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            autoFocus
          />
          <button 
            type="submit" 
            className="chatbot-send-btn" 
            disabled={!inputText.trim()}
            aria-label="Send Message"
          >
            &rarr;
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotDrawer;
