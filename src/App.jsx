import { useState } from 'react';
import logo from './assets/react.svg';
import './index.css';
import './main.jsx';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClaim = (e) => {
    e.preventDefault();
    if (walletAddress) {
      setIsSubmitted(true);
      // 这里可以添加实际的空投领取逻辑
    }
  };

  return (
    <>
    {/* Particle Background */}
    <div id="particles-js"></div>
    
        {/* Header - 全宽 */}
        <header>
            <div className="header-content">
                <div className="logo">
                    <div className="logo-icon">
                        <img src="/1inch.svg" alt="ANVI Logo" />
                    </div>
                    <div className="logo-text">ANVI</div>
                </div>
                
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Tokenomics</a></li>
                        <li><a href="#">Roadmap</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </nav>
                
                <button className="connect-wallet">Connect Wallet</button>
            </div>
        </header>
        
        {/* Main Content - 限制宽度 */}
        <div className="main-container">
            {/* Hero Section */}
            <section className="hero">
                <h1>ANVI Token Airdrop Is Here!</h1>
                <p>Claim your ANVI tokens and join the future of decentralized finance. Limited time offer for early supporters.</p>
                
                {/* Airdrop Card */}
                <div className="airdrop-card">
                    <div className="card-header">
                        <h2>Claim Your ANVI Tokens</h2>
                        <p>You're eligible for 5,000 ANVI tokens</p>
                    </div>
                    
                    <div className="token-info">
                        <div className="token-icon">
                            <img src="/1inch.svg" alt="ANVI Token" />
                        </div>
                        <div className="token-details">
                            <div className="token-amount">5,000 ANVI</div>
                            <div className="token-value">≈ $250</div>
                        </div>
                    </div>
                    
                    <button className="claim-button" id="claimButton">Claim Now</button>
                    
                    <div className="timer">
                        <p>Airdrop ends in: <span id="countdown">07:23:19:45</span></p>
                    </div>
                </div>
            </section>
            
            {/* Features Section */}
            <section className="features">
                <div className="feature">
                    <div className="feature-icon">
                        <i className="fas fa-rocket"></i>
                    </div>
                    <h3>High Performance</h3>
                    <p>ANVI token is built on a high-performance blockchain with fast transactions and low fees.</p>
                </div>
                
                <div className="feature">
                    <div className="feature-icon">
                        <i className="fas fa-lock"></i>
                    </div>
                    <h3>Secure & Safe</h3>
                    <p>Our smart contract has been audited by leading security firms to ensure maximum safety.</p>
                </div>
                
                <div className="feature">
                    <div className="feature-icon">
                        <i className="fas fa-chart-line"></i>
                    </div>
                    <h3>Great Potential</h3>
                    <p>With a limited supply and growing ecosystem, ANVI has significant growth potential.</p>
                </div>
            </section>
        </div>
        
        {/* Footer - 全宽 */}
        <footer>
            <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact Us</a>
                <a href="#">Twitter</a>
                <a href="#">Telegram</a>
            </div>
            <p className="copyright">© 2023 ANVI Token. All rights reserved.</p>
        </footer>
    </>
  );
}

export default App;