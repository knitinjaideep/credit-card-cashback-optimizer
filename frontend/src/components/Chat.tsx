import React, { useState, Dispatch, SetStateAction, FormEvent } from 'react';
import '../App.css';

interface ChatProps {
  chatMessages: { role: 'user' | 'assistant', content: string }[];
  chatInput: string;
  handleChatSubmit: (e: FormEvent) => void;
  setChatInput: Dispatch<SetStateAction<string>>;
  setChatMessages: Dispatch<SetStateAction<{ role: 'user' | 'assistant', content: string }[]>>;
}

const Chat: React.FC<ChatProps> = ({
  chatMessages,
  chatInput,
  handleChatSubmit,
  setChatInput,
  setChatMessages,
}) => {
  return (
    <div className="section">
      <h2>Chat with AI</h2>
      <div className="chat-container">
        <div className="chat-messages">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.role}`}>
              <strong>{msg.role === 'user' ? 'You:' : 'AI:'}</strong> {msg.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleChatSubmit} className="chat-input">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask me about credit cards..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat; 