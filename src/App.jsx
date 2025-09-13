import { useState } from 'react';
import logo from './assets/react.svg';
import './index.css';
import './main.jsx';
import { RocketIcon, GiftIcon, StarIcon, MoneyIcon, MapIcon, ChatIcon, QuestionIcon, ClockIcon, ShieldIcon, CheckCircleIcon, CompletedIcon, RocketLaunchIcon, ClockUpcomingIcon, GlobeIcon } from './components/Icons';

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

                <div className="hero-header">
                    <h1>ANVI Token Airdrop is Live!</h1>
                    <p className="hero-subtitle">Join the future of decentralized finance and claim your ANVI tokens. Exclusive limited-time offer for early supporters!</p>
                </div>

                <div className="hero-content">
                    <div className="hero-left">
                        {/* Statistics */}
                        <div className="hero-stats">
                            <h3>Campaign Statistics</h3>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <div className="stat-number">$2.5M</div>
                                    <div className="stat-label">Total Airdrop Value</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">50K</div>
                                    <div className="stat-label">Eligible Users</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">7</div>
                                    <div className="stat-label">Days Remaining</div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    {/* Airdrop Card */}
                    <div className="airdrop-card">
                        <div className="card-header">
                                <h2><GiftIcon size={24} className="inline-icon" /> Claim Your ANVI Tokens</h2>
                                <p>You are eligible for <span className="highlight">5,000 ANVI tokens</span></p>
                        </div>
                        
                        <div className="token-info">
                            <div className="token-icon">
                                <img src="/1inch.svg" alt="ANVI Token" />
                            </div>
                            <div className="token-details">
                                <div className="token-amount">5,000 ANVI</div>
                                    <div className="token-value">≈ $250 USD</div>
                                    <div className="token-bonus">+ 20% Early Supporter Bonus</div>
                            </div>
                        </div>
                        
                            <button className="claim-button" id="claimButton">
                                {/* <RocketIcon size={16} className="inline-icon" /> */}
                                Claim Now
                            </button>
                        
                        <div className="timer">
                                <p><ClockIcon size={16} className="inline-icon" /> Airdrop ends in: <span id="countdown">07:23:19:45</span></p>
                            </div>
                            
                            <div className="eligibility-check">
                                <p><CheckCircleIcon size={16} className="inline-icon" /> Eligibility Verified</p>
                                <p><ShieldIcon size={16} className="inline-icon" /> Smart Contract Audited</p>
                            </div>
                        </div>
                    </div>
            </section>
            
            {/* Features Section */}
            <section className="features">
                <h2 className="section-title">Why Choose ANVI?</h2>
                <div className="features-grid">
                <div className="feature">
                    <div className="feature-icon">
                        <i className="fas fa-rocket"></i>
                    </div>
                        <h3>High Performance Blockchain</h3>
                        <p>Built on advanced blockchain technology with fast transactions and low fees, providing you with the best user experience.</p>
                </div>
                
                <div className="feature">
                    <div className="feature-icon">
                        <i className="fas fa-lock"></i>
                    </div>
                        <h3>Secure & Reliable</h3>
                        <p>Smart contracts audited by top security firms with multiple security mechanisms to ensure your asset safety.</p>
                </div>
                
                <div className="feature">
                    <div className="feature-icon">
                        <i className="fas fa-chart-line"></i>
                    </div>
                    <h3>Great Potential</h3>
                        <p>With limited supply and a growing ecosystem, ANVI has tremendous growth potential and investment value.</p>
                    </div>
                    
                    <div className="feature">
                        <div className="feature-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <h3>Strong Community</h3>
                        <p>Backed by an active global community with continuous technological innovation and ecosystem development.</p>
                    </div>
                    
                    <div className="feature">
                        <div className="feature-icon">
                            <i className="fas fa-globe"></i>
                        </div>
                        <h3>Global Reach</h3>
                        <p>Supports multiple languages and regions, providing convenient financial services to users worldwide.</p>
                    </div>
                    
                    <div className="feature">
                        <div className="feature-icon">
                            <i className="fas fa-gem"></i>
                        </div>
                        <h3>Scarcity</h3>
                        <p>Limited total supply with deflationary mechanism design, providing significant long-term holding value.</p>
                    </div>
                </div>
            </section>
            
            {/* Tokenomics Section */}
            <section className="tokenomics">
                <h2 className="section-title"><MoneyIcon size={32} className="inline-icon" /> Tokenomics</h2>
                <div className="tokenomics-content">
                    <div className="tokenomics-info">
                        <div className="info-grid">
                            <div className="info-item">
                                <h3>Total Supply</h3>
                                <p>100,000,000 ANVI</p>
                            </div>
                            <div className="info-item">
                                <h3>Airdrop Allocation</h3>
                                <p>25% (25,000,000 ANVI)</p>
                            </div>
                            <div className="info-item">
                                <h3>Liquidity Pool</h3>
                                <p>30% (30,000,000 ANVI)</p>
                            </div>
                            <div className="info-item">
                                <h3>Ecosystem Development</h3>
                                <p>20% (20,000,000 ANVI)</p>
                            </div>
                            <div className="info-item">
                                <h3>Team Reserve</h3>
                                <p>15% (15,000,000 ANVI)</p>
                            </div>
                            <div className="info-item">
                                <h3>Partners</h3>
                                <p>10% (10,000,000 ANVI)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Roadmap Section */}
            <section className="roadmap">
                <div className="roadmap-header">
                    <h2 className="section-title"><MapIcon size={32} className="inline-icon" /> Roadmap</h2>
                    <p className="roadmap-subtitle">Our journey to revolutionize decentralized finance</p>
                </div>
                <div className="roadmap-timeline">
                    <div className="roadmap-item completed">
                        <div className="roadmap-marker">
                            <div className="marker-icon">
                                <CompletedIcon size={20} />
                            </div>
                        </div>
                        <div className="roadmap-content">
                            <div className="roadmap-header-content">
                                <div className="roadmap-date">Q1 2024</div>
                                <div className="roadmap-status completed-status">Completed</div>
                            </div>
                            <h3>Project Launch</h3>
                            <div className="roadmap-features">
                                <div className="feature-item">
                                    <div className="feature-dot"></div>
                                    <span>Smart contract development completed</span>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-dot"></div>
                                    <span>Security audit passed</span>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-dot"></div>
                                    <span>Community building started</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="roadmap-item current">
                        <div className="roadmap-marker">
                            <div className="marker-icon current">
                                <RocketLaunchIcon size={20} />
                            </div>
                        </div>
                        <div className="roadmap-content">
                            <div className="roadmap-header-content">
                                <div className="roadmap-date">Q2 2024</div>
                                <div className="roadmap-status current-status">In Progress</div>
                            </div>
                            <h3>Airdrop Campaign</h3>
                            <div className="roadmap-features">
                                <div className="feature-item">
                                    <div className="feature-dot current"></div>
                                    <span>Airdrop campaign launched</span>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-dot current"></div>
                                    <span>Token distribution</span>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-dot current"></div>
                                    <span>Exchange listing applications</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="roadmap-item upcoming">
                        <div className="roadmap-marker">
                            <div className="marker-icon upcoming">
                                <ClockUpcomingIcon size={20} />
                            </div>
                        </div>
                        <div className="roadmap-content">
                            <div className="roadmap-header-content">
                                <div className="roadmap-date">Q3 2024</div>
                                <div className="roadmap-status upcoming-status">Upcoming</div>
                            </div>
                            <h3>Ecosystem Expansion</h3>
                            <div className="roadmap-features">
                                <div className="feature-item">
                                    <div className="feature-dot upcoming"></div>
                                    <span>DeFi protocol integration</span>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-dot upcoming"></div>
                                    <span>NFT marketplace development</span>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-dot upcoming"></div>
                                    <span>Cross-chain bridging</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="roadmap-item upcoming">
                        <div className="roadmap-marker">
                            <div className="marker-icon upcoming">
                                <GlobeIcon size={20} />
                            </div>
                        </div>
                        <div className="roadmap-content">
                            <div className="roadmap-header-content">
                                <div className="roadmap-date">Q4 2024</div>
                                <div className="roadmap-status upcoming-status">Upcoming</div>
                            </div>
                            <h3>Global Expansion</h3>
                            <div className="roadmap-features">
                                <div className="feature-item">
                                    <div className="feature-dot upcoming"></div>
                                    <span>Major exchange listings</span>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-dot upcoming"></div>
                                    <span>Institutional partnerships</span>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-dot upcoming"></div>
                                    <span>Mobile app release</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="faq">
                <h2 className="section-title"><QuestionIcon size={32} className="inline-icon" /> FAQ</h2>
                <div className="faq-list">
                    <div className="faq-item">
                        <div className="faq-question">
                            <h3>How to participate in ANVI airdrop?</h3>
                            <i className="fas fa-chevron-down"></i>
                        </div>
                        <div className="faq-answer">
                            <p>Simply connect your wallet, verify your identity, and click the "Claim Now" button. The entire process is simple and quick, with no fees required.</p>
                        </div>
                    </div>
                    
                    <div className="faq-item">
                        <div className="faq-question">
                            <h3>When will airdrop tokens arrive?</h3>
                            <i className="fas fa-chevron-down"></i>
                        </div>
                        <div className="faq-answer">
                            <p>Tokens will be automatically transferred to your wallet address within 24-48 hours after successful claim. You can check transaction status on the blockchain explorer.</p>
                        </div>
                    </div>
                    
                    <div className="faq-item">
                        <div className="faq-question">
                            <h3>Do I need to pay Gas fees?</h3>
                            <i className="fas fa-chevron-down"></i>
                        </div>
                        <div className="faq-answer">
                            <p>Claiming tokens is free, but you need to pay a small Gas fee to complete the blockchain transaction. We recommend operating when network congestion is low.</p>
                        </div>
                    </div>
                    
                    <div className="faq-item">
                        <div className="faq-question">
                            <h3>How long does the airdrop campaign last?</h3>
                            <i className="fas fa-chevron-down"></i>
                        </div>
                        <div className="faq-answer">
                            <p>The airdrop campaign will last for 30 days, or until all tokens are distributed. We recommend participating early as early participants receive additional rewards.</p>
                        </div>
                    </div>
                    
                    <div className="faq-item">
                        <div className="faq-question">
                            <h3>How to ensure security?</h3>
                            <i className="fas fa-chevron-down"></i>
                        </div>
                        <div className="faq-answer">
                            <p>Our smart contracts have been audited by top security companies, and all code is open source and verifiable. Please participate through official channels only and do not click on any suspicious links.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        
        {/* Footer - 全宽 */}
        <footer>
            <div className="footer-content">
                <div className="footer-section">
                    <div className="footer-logo">
                        <img src="/1inch.svg" alt="ANVI Logo" />
                        <span>ANVI</span>
                    </div>
                    <p>Building the future of decentralized finance, enabling everyone to enjoy the convenience brought by blockchain technology.</p>
                    <div className="social-links">
                        <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-telegram"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-discord"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-github"></i></a>
                    </div>
                </div>
                
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Tokenomics</a></li>
                        <li><a href="#">Roadmap</a></li>
                        <li><a href="#">Whitepaper</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3>Support</h3>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Security Audit</a></li>
                        <li><a href="#">Bug Report</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Disclaimer</a></li>
                        <li><a href="#">Risk Warning</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
            <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact Us</a>
                </div>
                <p className="copyright">© 2024 ANVI Token. All rights reserved.</p>
            </div>
        </footer>
    </>
  );
}

export default App;