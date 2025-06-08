import React from 'react';
import { Recommendation } from '../types';
import '../App.css';

interface RecommendationsProps {
  recommendations: Recommendation[];
  formatCategoryName: (category: string) => string;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
  formatCategoryName,
}) => {
  return (
    <div className="recommendations section">
      <h2>Recommendations</h2>
      <div className="recommendation-list">
        {recommendations.map(rec => (
          <div key={rec.category} className="recommendation-item">
            <div className="category">
              <span className="category-name">{formatCategoryName(rec.category)}</span>
            </div>
            <div className="card">
              <span className="card-name">{rec.cardName}</span>
            </div>
            <div className="cashback">
              <span>{rec.cashbackPercentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations; 