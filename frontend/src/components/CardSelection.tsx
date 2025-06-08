import React, { useState, useRef, useEffect } from 'react';
import { CreditCard } from '../types';
import { creditCards } from '../data/creditCards';
import '../App.css';

interface CardSelectionProps {
  selectedCards: CreditCard[];
  handleCardSelection: (card: CreditCard) => void;
  getRecommendations: () => void;
  removeCard: (cardId: string) => void;
}

const CardSelection: React.FC<CardSelectionProps> = ({
  selectedCards,
  handleCardSelection,
  getRecommendations,
  removeCard,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getSelectedCardsText = () => {
    if (selectedCards.length === 0) return 'Select your credit cards';
    if (selectedCards.length === 1) {
      const card = creditCards.find(c => c.id === selectedCards[0].id);
      return card?.name || 'Select your credit cards';
    }
    return `${selectedCards.length} cards selected`;
  };

  return (
    <div className="card-selection">
      <h2>Select Credit Cards</h2>
      <div className="dropdown-container" ref={dropdownRef}>
        <label className="dropdown-label">Select Cards:</label>
        <button className="dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {getSelectedCardsText()}
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            {creditCards.map((card) => (
              <div key={card.id} className="dropdown-item">
                <input
                  type="checkbox"
                  id={card.id}
                  checked={selectedCards.some(c => c.id === card.id)}
                  onChange={() => handleCardSelection(card)}
                />
                <label htmlFor={card.id} className="dropdown-item-label">
                  <span className="card-name">{card.name}</span>
                  {/* <span className="card-bank">{card.bank}</span> Add bank if available */}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display selected cards - This will be moved to Dashboard or a separate component later */}
      {selectedCards.length > 0 && (
        <div className="selected-cards">
          <h3>Selected Cards</h3>
          <div className="selected-cards-grid">
            {selectedCards.map(card => (
              <div key={card.id} className="selected-card">
                <div className="selected-card-header">
                  <span className="selected-card-name">{card.name}</span>
                  <button className="remove-card" onClick={() => removeCard(card.id)}>×</button>
                </div>
                <div className="card-categories">
                  {Object.entries(card.categories).map(([category, cashback]) => (
                    <div key={category} className="card-category">
                      <span className="category-name">{category}</span>
                      <span className="category-cashback">{cashback}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        className="submit-button"
        onClick={getRecommendations}
        disabled={selectedCards.length === 0}
      >
        Get Recommendations
      </button>
    </div>
  );
};

export default CardSelection; 