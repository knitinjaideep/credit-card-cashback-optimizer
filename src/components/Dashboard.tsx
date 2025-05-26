import React, { useState } from 'react';
import { CreditCard, SpendingAnalysis } from '../types';
import { categories } from '../data/creditCards';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import '../App.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface DashboardProps {
  selectedCards: CreditCard[];
  spendingAnalysis: SpendingAnalysis;
  getChartData: () => { categoryData: any; cardDistributionData: any; cashbackTrendData: any }; // TODO: Refine chart data types
  removeCard: (cardId: string) => void;
  formatCategoryName: (category: string) => string;
}

const Dashboard: React.FC<DashboardProps> = ({
  selectedCards,
  spendingAnalysis,
  getChartData,
  removeCard,
  formatCategoryName,
}) => {
  const [isCardsExpanded, setIsCardsExpanded] = useState(false);

  return (
    <div className="dashboard section">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        {/* Add filter/settings button here */}
      </div>
      {/* Stats Overview */}
      <div className="dashboard-stats">
        <div className="stat-card" onClick={() => setIsCardsExpanded(!isCardsExpanded)} style={{ cursor: 'pointer' }}>
          <h3>Total Selected Cards</h3>
          <p>{selectedCards.length}</p>
          <span className="expand-icon">{isCardsExpanded ? '▼' : '▶'}</span>
        </div>
        <div className="stat-card">
          <h3>Total Categories</h3>
          <p>{categories.length}</p>
        </div>
        <div className="stat-card">
          <h3>Estimated Annual Savings</h3>
          <p>${spendingAnalysis.estimatedAnnualSavings.toFixed(2)}</p>
        </div>
      </div>

      {/* Selected Cards Overview */}
      {selectedCards.length > 0 && isCardsExpanded && (
        <div className="selected-cards-section">
          <h3>Your Selected Cards</h3>
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
                      <span className="category-name">{formatCategoryName(category)}</span>
                      <span className="category-cashback">{cashback}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts */}
      {selectedCards.length > 0 && ( // Only show charts if cards are selected
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Average Cashback by Category</h3>
            <div className="chart-container">
              <Bar data={getChartData().categoryData} options={{
                 responsive: true,
                 maintainAspectRatio: false,
                 plugins: {
                     legend: { display: false },
                     title: { display: false }
                 },
                  scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Average Cashback (%)' } },
                    x: { title: { display: true, text: 'Category' } }
                 }
              }} />
            </div>
          </div>
          <div className="chart-card">
            <h3>Card Distribution</h3>
             <div className="chart-container">
              <Doughnut data={getChartData().cardDistributionData} options={{
                 responsive: true,
                 maintainAspectRatio: false,
                 plugins: {
                     legend: { position: 'bottom' },
                     title: { display: false }
                 }
              }} />
             </div>
          </div>
           {/* Cashback Trends Line Chart (Spans full width) */}
          <div className="chart-card" style={{ gridColumn: '1 / -1' }}>
            <h3>Cashback Trends Across Categories</h3>
            <div className="chart-container">
              <Line data={getChartData().cashbackTrendData} options={{
                 responsive: true,
                 maintainAspectRatio: false,
                 plugins: {
                     legend: { position: 'bottom' },
                     title: { display: false }
                 },
                  scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Cashback (%) per Category' } },
                    x: { title: { display: true, text: 'Category' } }
                 }
              }} />
            </div>
          </div>
        </div>
      )}

       {/* Spending Analysis Section (Hidden for now) */}
      {/* <div className="spending-analysis section">
        <h2>Spending Analysis</h2>
        <p>Based on your estimated monthly spending:</p>
        <div className="spending-grid">
          {spendingAnalysis.bestCardCombinations.map(item => (
            <div key={item.category} className="spending-card">
               <h3>{formatCategoryName(item.category)}</h3>
               <p>Best Card: {item.card}</p>
               <p>Cashback: {item.cashback}%</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard; 