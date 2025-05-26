import React from 'react';
import '../App.css';

const FAQ: React.FC = () => {
  return (
    <div className="section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3 className="faq-question">What is this tool?</h3>
        <p className="faq-answer">This tool helps you find the best credit cards based on your spending categories to maximize cashback rewards.</p>
      </div>
      {/* Add more FAQ items */}
    </div>
  );
};

export default FAQ; 