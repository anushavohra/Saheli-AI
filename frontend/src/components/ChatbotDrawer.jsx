import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage, getSessionId } from '../services/api';

const quickChips = [
  "Instagram caption likh do",
  "Pricing suggest karo",
  "Customer reply draft karo",
  "Eid sale ka idea do"
];

const ChatbotDrawer = ({ isOpen, onClose, initialPrompt }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'saheli',
      text: "Assalam-o-Alaikum\nMain Saheli hoon.\nAaj business mein kis cheez mein madad chahiye?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (initialPrompt) {
      setInputText(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e, textToSend) => {
    if (e) e.preventDefault();
    const trimmed = (textToSend || inputText).trim();
    if (!trimmed || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: trimmed
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const sessionId = getSessionId();
      const reply = await sendChatMessage(trimmed, sessionId);
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

  const handleChipClick = (chipText) => {
    setInputText(chipText);
    handleSendMessage(null, chipText);
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-overlay" onClick={onClose} role="presentation">
      <div 
        className="chatbot-drawer" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Saheli AI Quick Chat"
      >
        {/* Drawer Header */}
        <div className="chatbot-header">
          <div className="header-brand">
            <div>
              <h3 className="header-title font-yatra">SAHELI AI</h3>
              <p className="header-subtitle">Har business ko chahiye aik saheli</p>
            </div>
          </div>
          <button 
            type="button"
            className="chatbot-close-btn" 
            onClick={onClose}
            aria-label="Close Chat"
          >
            &times;
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="chatbot-chips">
          {quickChips.map((chip, i) => (
            <button 
              key={i} 
              type="button" 
              onClick={() => handleChipClick(chip)} 
              className="chip-btn"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Message History */}
        <div className="chatbot-body" role="log">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`chat-bubble-wrapper ${msg.sender === 'user' ? 'bubble-user' : 'bubble-saheli'}`}
            >
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

          {isTyping && (
            <div className="chat-bubble-wrapper bubble-saheli">
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
        <form className="chatbot-footer" onSubmit={(e) => handleSendMessage(e)}>
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
            disabled={!inputText.trim() || isTyping}
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
