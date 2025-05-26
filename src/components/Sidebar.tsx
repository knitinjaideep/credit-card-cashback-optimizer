import React from 'react';
import '../App.css';

type Section = 'dashboard' | 'cards' | 'recommendations' | 'faq' | 'contact' | 'chat';

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Cashback<br />Optimizer</h1>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <a href="#" className={`nav-link ${activeSection === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveSection('dashboard')}>
            <span className="nav-icon">🏠</span>
            Dashboard
          </a>
        </li>
        <li className="nav-item">
           <a href="#" className={`nav-link ${activeSection === 'cards' ? 'active' : ''}`} onClick={() => setActiveSection('cards')}>
            <span className="nav-icon">💳</span>
            Credit Cards
          </a>
        </li>
        <li className="nav-item">
           <a href="#" className={`nav-link ${activeSection === 'recommendations' ? 'active' : ''}`} onClick={() => setActiveSection('recommendations')}>
            <span className="nav-icon">⭐</span>
            Recommendations
          </a>
        </li>
         <li className="nav-item">
           <a href="#" className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`} onClick={() => setActiveSection('faq')}>
            <span className="nav-icon">❓</span>
            FAQ
          </a>
        </li>
         <li className="nav-item">
           <a href="#" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => setActiveSection('contact')}>
            <span className="nav-icon">✉️</span>
            Contact
          </a>
        </li>
         <li className="nav-item">
           <a href="#" className={`nav-link ${activeSection === 'chat' ? 'active' : ''}`} onClick={() => setActiveSection('chat')}>
            <span className="nav-icon">🤖</span>
            Chat with AI
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar; 