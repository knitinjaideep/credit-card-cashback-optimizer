import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Welcome.css';

interface WelcomeProps {
  onGetStarted: () => void;
  isAuthenticated?: boolean;
}

const Welcome: React.FC<WelcomeProps> = ({ onGetStarted, isAuthenticated = false }) => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      {/* Navigation Bar */}
      <nav className="welcome-nav">
        <div className="nav-content">
          <div className="nav-brand">
            <h1 className="app-name">SmartSwipe</h1>
            <p className="nav-tagline">Make Every Swipe Count</p>
          </div>
          <div className="welcome-actions">
            {isAuthenticated ? (
              <button 
                className="get-started-button"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </button>
            ) : (
              <div className="auth-buttons">
                <button 
                  className="login-button"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
                <button 
                  className="signup-button"
                  onClick={() => navigate('/signup')}
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="welcome-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h2>Tell us which cards you own. We'll do the rest.</h2>
            <p className="hero-subtext">
              No bank logins. No card numbers. No personal data. Just a smarter way to use the cards you already have.
            </p>
            
            <div className="requirements">
              <h3>✔ All we ask is:</h3>
              <ul>
                <li>Your email and a password to create your account</li>
                <li>The names of the credit cards you use (e.g., Chase Freedom Flex, Amex Blue Cash Preferred)</li>
              </ul>
            </div>
            
            <p className="analysis-text">
              🧠 We analyze which card gives you the best cashback across categories like groceries, gas, dining, travel, and more.
            </p>
          </div>
        </div>

        {/* Trust Section */}
        <div className="trust-section">
          <h2>Privacy First. Always.</h2>
          <div className="trust-points">
            <div className="trust-point">
              <span className="icon">🔒</span>
              <p>No card numbers</p>
            </div>
            <div className="trust-point">
              <span className="icon">🔒</span>
              <p>No transaction access</p>
            </div>
            <div className="trust-point">
              <span className="icon">🔒</span>
              <p>No banking logins</p>
            </div>
            <div className="trust-point">
              <span className="icon">🔒</span>
              <p>No selling your data</p>
            </div>
            <div className="trust-point">
              <span className="icon">🔒</span>
              <p>All data stays on your device unless you choose to back it up</p>
            </div>
          </div>
          <p className="privacy-pledge">✅ Your privacy is non-negotiable.</p>
        </div>

        {/* How It Works Section */}
        <div className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Add Cards You Own</h3>
              <p>Just pick your cards from a list (or type them in).</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>We Match Reward Categories</h3>
              <p>We use publicly available reward info—no sensitive data needed.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>You Swipe Smart</h3>
              <p>The app shows which card to use at checkout for maximum cashback.</p>
            </div>
          </div>
        </div>

        {/* Example Preview */}
        <div className="example-preview">
          <p>"About to pay for groceries? We'll tell you: Use Amex Blue Cash Preferred – 6% back."</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 