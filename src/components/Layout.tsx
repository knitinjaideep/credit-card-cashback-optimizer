import React, { FormEvent, Dispatch, SetStateAction } from 'react';
import '../App.css';
import Sidebar from './Sidebar';
import CardSelection from './CardSelection';
import Dashboard from './Dashboard';
import Recommendations from './Recommendations';
import FAQ from './FAQ';
import Contact from './Contact';
import Chat from './Chat';
import { CreditCard, SpendingAnalysis, Recommendation } from '../types';

type Section = 'dashboard' | 'cards' | 'recommendations' | 'faq' | 'contact' | 'chat';
type Theme = 'light' | 'dark';

interface LayoutProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  selectedCards: CreditCard[];
  handleCardSelection: (card: CreditCard) => void;
  getRecommendations: () => void;
  removeCard: (cardId: string) => void;
  recommendations: Recommendation[];
  formatCategoryName: (category: string) => string;
  spendingAnalysis: SpendingAnalysis;
  getChartData: () => { categoryData: any; cardDistributionData: any; cashbackTrendData: any }; // TODO: Refine chart data types
  chatMessages: { role: 'user' | 'assistant', content: string }[];
  chatInput: string;
  handleChatSubmit: (e: FormEvent) => void;
  setChatInput: Dispatch<SetStateAction<string>>; // Keep for Chat component
  setChatMessages: Dispatch<SetStateAction<{ role: 'user' | 'assistant', content: string }[]>>; // Keep for Chat component
  theme: Theme;
  toggleTheme: () => void;
  saveProfile: () => void;
  loadProfile: () => void;
  exportRecommendations: () => void;
  isLoading: boolean; // For profile actions
}

const Layout: React.FC<LayoutProps> = ({
  activeSection,
  setActiveSection,
  selectedCards,
  handleCardSelection,
  getRecommendations,
  removeCard,
  recommendations,
  formatCategoryName,
  spendingAnalysis,
  getChartData,
  chatMessages,
  chatInput,
  handleChatSubmit,
  setChatInput,
  setChatMessages,
  theme,
  toggleTheme,
  saveProfile,
  loadProfile,
  exportRecommendations,
  isLoading,
}) => {
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <Dashboard
            selectedCards={selectedCards}
            spendingAnalysis={spendingAnalysis}
            getChartData={getChartData}
            removeCard={removeCard}
            formatCategoryName={formatCategoryName}
          />
        );

      case 'cards':
        return (
          <CardSelection
            selectedCards={selectedCards}
            handleCardSelection={handleCardSelection}
            getRecommendations={getRecommendations}
            removeCard={removeCard}
          />
        );

      case 'recommendations':
        return (
          <Recommendations
            recommendations={recommendations}
            formatCategoryName={formatCategoryName}
          />
        );

      case 'faq':
        return <FAQ />;

      case 'contact':
        return <Contact />;

      case 'chat':
        return (
          <Chat
            chatMessages={chatMessages}
            chatInput={chatInput}
            handleChatSubmit={handleChatSubmit}
            setChatInput={setChatInput}
            setChatMessages={setChatMessages}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-container" data-theme={theme}>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="main-content">
        {renderSection()}
      </main>

      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Profile Actions (Hidden for now) */}
      {/* <div className="profile-actions">\n        <button className="profile-button" onClick={saveProfile} disabled={isLoading}>\n          {isLoading ? <span className="loading"></span> : '💾'} Save Profile\n        </button>\n        <button className="profile-button" onClick={loadProfile}>\n          📂 Load Profile\n        </button>\n        <button className="export-button" onClick={exportRecommendations}>\n          📤 Export\n        </button>\n      </div> */}
    </div>
  );
};

export default Layout; 