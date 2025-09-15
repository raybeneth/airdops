import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { RocketIcon, GiftIcon, StarIcon, MoneyIcon, MapIcon, ChatIcon, QuestionIcon, ClockIcon, ShieldIcon, CheckCircleIcon, CompletedIcon, RocketLaunchIcon, ClockUpcomingIcon, GlobeIcon } from './components/Icons';
import { appKit } from './appkit-config';
import { AccountController } from '@reown/appkit';
import './index.css'


function App() {
  // Use native Solana wallet adapter hooks
  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  
  // Get address and connection status (from wallet-adapter and Reown AppKit)
  const address = publicKey?.toString();
  const isConnected = connected;
  const [appKitConnected, setAppKitConnected] = useState(false);
  const [appKitAddress, setAppKitAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Subscribe to Reown AppKit account changes
  useEffect(() => {
    const unsubStatus = AccountController.subscribeKey('status', (status) => {
      setAppKitConnected(status === 'connected');
    }, 'solana');
    const unsubAddress = AccountController.subscribeKey('address', (addr) => {
      setAppKitAddress(addr || '');
    }, 'solana');
    return () => {
      if (typeof unsubStatus === 'function') unsubStatus();
      if (typeof unsubAddress === 'function') unsubAddress();
    };
  }, []);

  // Determine display address/connection
  const effectiveConnected = isConnected || appKitConnected;
  const effectiveAddress = address || appKitAddress || '';

  // Update balance when address changes
  useEffect(() => {
    const updateBalance = async () => {
      if (!effectiveAddress) return;
      try {
        setIsLoading(true);
        const connection = new Connection(clusterApiUrl('mainnet-beta'));
        const publicKey = new PublicKey(effectiveAddress);
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (effectiveConnected && effectiveAddress) {
      updateBalance();
    } else {
      setBalance(0);
    }
  }, [effectiveAddress, effectiveConnected]);

  // 监听钱包连接状态变化，恢复页面样式
  useEffect(() => {
    if (effectiveConnected) {
      // 钱包连接成功后恢复页面样式
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    }
  }, [effectiveConnected]);

  // 监听弹框关闭，恢复页面样式
  useEffect(() => {
    const handleModalClose = () => {
      // 延迟恢复，确保弹框完全关闭
      setTimeout(() => {
        document.body.style.paddingRight = '';
        document.body.style.overflow = '';
      }, 100);
    };

    // 监听点击事件，如果点击的是弹框外部，则关闭弹框
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('wallet-adapter-modal-wrapper') ||
          event.target.classList.contains('wallet-adapter-modal-container')) {
        handleModalClose();
      }
    };

    // 监听 ESC 键
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleModalClose();
      }
    };

    // 使用 MutationObserver 监听弹框的创建
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const modalWrapper = node.classList?.contains('wallet-adapter-modal-wrapper') ? node :
                               node.querySelector?.('.wallet-adapter-modal-wrapper') ||
                               node.classList?.contains('wallet-adapter-modal-container') ? node :
                               node.querySelector?.('.wallet-adapter-modal-container');
            
            if (modalWrapper) {
              // 确保弹框居中
              modalWrapper.style.position = 'fixed';
              modalWrapper.style.top = '0';
              modalWrapper.style.left = '0';
              modalWrapper.style.right = '0';
              modalWrapper.style.bottom = '0';
              modalWrapper.style.width = '100vw';
              modalWrapper.style.height = '100vh';
              modalWrapper.style.display = 'flex';
              modalWrapper.style.alignItems = 'center';
              modalWrapper.style.justifyContent = 'center';
              modalWrapper.style.zIndex = '9999';
              modalWrapper.style.background = 'rgba(0, 0, 0, 0.8)';
              modalWrapper.style.margin = '0';
              modalWrapper.style.padding = '0';
            }
          }
        });
      });
    });

    // 开始观察 DOM 变化
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Connect wallet
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      // 优先使用 Reown AppKit 弹窗
      if (appKit && typeof appKit.open === 'function') {
        await appKit.open();
      } else if (appKit && typeof appKit.openModal === 'function') {
        await appKit.openModal();
      } else {
        // 兼容旧钱包弹窗
        document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
        document.body.style.overflow = 'hidden';
        setVisible(true);
      }
      
      // 旧弹窗样式兼容
      setTimeout(() => {
        const modalWrapper = document.querySelector('.wallet-adapter-modal-wrapper') || 
                           document.querySelector('.wallet-adapter-modal-container') ||
                           document.querySelector('[data-testid="wallet-adapter-modal"]');
        
        if (modalWrapper) {
          modalWrapper.style.position = 'fixed';
          modalWrapper.style.top = '0';
          modalWrapper.style.left = '0';
          modalWrapper.style.right = '0';
          modalWrapper.style.bottom = '0';
          modalWrapper.style.width = '100vw';
          modalWrapper.style.height = '100vh';
          modalWrapper.style.display = 'flex';
          modalWrapper.style.alignItems = 'center';
          modalWrapper.style.justifyContent = 'center';
          modalWrapper.style.zIndex = '9999';
          modalWrapper.style.background = 'rgba(0, 0, 0, 0.8)';
          modalWrapper.style.margin = '0';
          modalWrapper.style.padding = '0';
        }
      }, 100);
    } catch (error) {
      console.error('Wallet connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet with confirmation
  const disconnectWallet = async () => {
    const confirmed = window.confirm('Are you sure you want to disconnect your wallet?');
    if (confirmed) {
      try {
        if (appKit && typeof appKit.disconnect === 'function') {
          await appKit.disconnect();
        } else {
          await disconnect();
        }
        setIsSubmitted(false);
      } catch (error) {
        console.error('Wallet disconnection error:', error);
      }
    }
  };

  // Handle claim operation
  const handleClaim = (e) => {
    e.preventDefault();
    if (isConnected) {
      setIsSubmitted(true);
      alert('Claim successful! Your PUMP tokens will be sent to your wallet within 24 hours.');
    } else {
      alert('Please connect your wallet first');
    }
  };

  // Shorten wallet address display
  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // Header theme based on connection
  const headerClasses = effectiveConnected
    ? "w-full bg-red-100 text-gray-900 py-4"
    : "w-full bg-gray-900 text-white py-4";

  return (
    <>
      {/* Particle Background */}
      <div id="particles-js"></div>

        {/* Header */}
        <header className={headerClasses}>
          <div className="header-content max-w-7xl mx-auto flex justify-between items-center px-4">
            <div className="logo flex items-center">
              <div className="logo-icon">
                <img src="/solana.png" alt="PUMP Logo" className="h-10" />
              </div>
              <div className="logo-text ml-2 text-2xl font-bold">pump.fun</div>
            </div>

            <nav>
              <ul className="flex space-x-6">
                <li><a href="#" className="hover:text-blue-400">Home</a></li>
                <li><a href="#" className="hover:text-blue-400">About</a></li>
                <li><a href="#" className="hover:text-blue-400">Tokenomics</a></li>
                <li><a href="#" className="hover:text-blue-400">Roadmap</a></li>
                <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
              </ul>
            </nav>

            <div className="wallet-connector flex items-center space-x-4">
              
              {effectiveConnected ? (
                <div className="wallet-info flex items-center space-x-4">
                  <span className="balance bg-gray-700 px-3 py-1 rounded">{balance.toFixed(2)} PUMP</span>
                  <button
                    className="disconnect-wallet text-white font-semibold transition-all duration-300 group"
                    onClick={disconnectWallet}
                  >
                    <div className="relative flex items-center z-10">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 group-hover:animate-pulse"></div>
                      {shortenAddress(effectiveAddress)}
                    </div>
                  </button>
                </div>
              ) : (
                  <button
                    className="connect-wallet-btn text-white font-semibold transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={connectWallet}
                    disabled={isLoading}
                  >
                    <div className="relative flex items-center z-10">
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Connecting...
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                          Connect Wallet
                        </>
                      )}
                    </div>
                  </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="main-container max-w-7xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-header text-center">
              <h1 className="text-4xl font-bold">PUMP Token Airdrop is Now Live!</h1>
              <p className="hero-subtitle text-lg mt-2">Join the future of decentralized finance and claim your PUMP tokens. Limited-time offer for early supporters!</p>
            </div>

            <div className="hero-content flex flex-col md:flex-row mt-8">
              <div className="hero-left md:w-1/2">
                <div className="hero-stats bg-white shadow p-6 rounded">
                  <h3 className="text-xl font-semibold">Campaign Statistics</h3>
                  <div className="stats-grid grid grid-cols-3 gap-4 mt-4">
                    <div className="stat-item text-center">
                      <div className="stat-number text-2xl font-bold">$2.5M</div>
                      <div className="stat-label">Total Airdrop Value</div>
                    </div>
                    <div className="stat-item text-center">
                      <div className="stat-number text-2xl font-bold">50K</div>
                      <div className="stat-label">Eligible Users</div>
                    </div>
                    <div className="stat-item text-center">
                      <div className="stat-number text-2xl font-bold">7</div>
                      <div className="stat-label">Days Remaining</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="airdrop-card md:w-1/2 bg-white shadow p-6 rounded ml-0 md:ml-4 mt-4 md:mt-0">
                <div className="card-header">
                  <h2 className="text-2xl font-semibold">
                    <GiftIcon size={24} className="inline mr-2" /> Claim Your PUMP Tokens
                  </h2>
                  <p>You are eligible to claim <span className="highlight font-bold">5,000 PUMP tokens</span></p>
                </div>

                <div className="token-info flex items-center mt-4">
                  <div className="token-icon">
                    <img src="/10805.png" alt="PUMP Token" className="h-16" />
                  </div>
                  <div className="token-details ml-4">
                    <div className="token-amount text-xl font-bold">5,000 PUMP</div>
                    <div className="token-value text-gray-600">≈ $250 USD</div>
                    <div className="token-bonus text-green-500">+ 20% Early Supporter Bonus</div>
                  </div>
                </div>

                <button
                  className="claim-button text-white px-8 py-4 rounded-xl mt-4 w-full font-bold text-lg transition-all duration-300 group"
                  onClick={handleClaim}
                >
                  <div className="relative flex items-center justify-center z-10">
                    <span className="group-hover:tracking-wider transition-all duration-300">Claim Now</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                  </div>
                </button>

                <div className="timer mt-4 text-center">
                  <p><ClockIcon size={16} className="inline mr-2" /> Airdrop Countdown: <span id="countdown">07:23:19:45</span></p>
                </div>

                <div className="eligibility-check mt-4 text-center">
                  <p><CheckCircleIcon size={16} className="inline mr-2" /> Eligibility Verified</p>
                  <p><ShieldIcon size={16} className="inline mr-2" /> Smart Contract Audited</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features mt-12">
            <h2 className="section-title text-3xl font-bold text-center">Why Choose PUMP?</h2>
            <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="feature bg-white shadow p-6 rounded">
                <div className="feature-icon">
                  <RocketIcon size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-2">High-Performance Blockchain</h3>
                <p className="mt-2">Built on advanced blockchain technology with fast transactions, low fees, and optimal user experience.</p>
              </div>

              <div className="feature bg-white shadow p-6 rounded">
                <div className="feature-icon">
                  <ShieldIcon size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-2">Secure & Reliable</h3>
                <p className="mt-2">Smart contracts audited by top security firms with multiple security mechanisms to ensure your asset safety.</p>
              </div>

              <div className="feature bg-white shadow p-6 rounded">
                <div className="feature-icon">
                  <StarIcon size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-2">Huge Potential</h3>
                <p className="mt-2">Limited supply with growing ecosystem, PUMP has tremendous growth potential and investment value.</p>
              </div>

              <div className="feature bg-white shadow p-6 rounded">
                <div className="feature-icon">
                  <ChatIcon size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-2">Strong Community</h3>
                <p className="mt-2">Supported by an active global community, continuously driving technological innovation and ecosystem development.</p>
              </div>

              <div className="feature bg-white shadow p-6 rounded">
                <div className="feature-icon">
                  <GlobeIcon size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-2">Global Coverage</h3>
                <p className="mt-2">Supporting multiple languages and regions, providing convenient financial services for global users.</p>
              </div>

              <div className="feature bg-white shadow p-6 rounded">
                <div className="feature-icon">
                  <MoneyIcon size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-2">Scarcity</h3>
                <p className="mt-2">Limited total supply combined with deflationary mechanism design, providing significant long-term holding value.</p>
              </div>
            </div>
          </section>

          {/* Tokenomics Section */}
          <section className="tokenomics mt-12">
            <h2 className="section-title text-3xl font-bold text-center">
              <MoneyIcon size={32} className="inline mr-2" /> Tokenomics
            </h2>
            <div className="tokenomics-content mt-6">
              <div className="tokenomics-info bg-white shadow p-6 rounded">
                <div className="info-grid grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="info-item">
                    <h3 className="font-semibold">Total Supply</h3>
                    <p>100,000,000 PUMP</p>
                  </div>
                  <div className="info-item">
                    <h3 className="font-semibold">Airdrop Allocation</h3>
                    <p>25% (25,000,000 PUMP)</p>
                  </div>
                  <div className="info-item">
                    <h3 className="font-semibold">Liquidity Pool</h3>
                    <p>30% (30,000,000 PUMP)</p>
                  </div>
                  <div className="info-item">
                    <h3 className="font-semibold">Ecosystem Development</h3>
                    <p>20% (20,000,000 PUMP)</p>
                  </div>
                  <div className="info-item">
                    <h3 className="font-semibold">Team Reserve</h3>
                    <p>15% (15,000,000 PUMP)</p>
                  </div>
                  <div className="info-item">
                    <h3 className="font-semibold">Partners</h3>
                    <p>10% (10,000,000 PUMP)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Roadmap Section */}
          <section className="roadmap mt-12">
            <div className="roadmap-header text-center">
              <h2 className="section-title text-3xl font-bold">
                <MapIcon size={32} className="inline mr-2" /> Roadmap
              </h2>
              <p className="roadmap-subtitle text-lg mt-2">Our journey to revolutionize decentralized finance</p>
            </div>
            <div className="roadmap-timeline mt-6 space-y-8">
              <div className="roadmap-item completed flex">
                <div className="roadmap-marker">
                  <div className="marker-icon bg-green-500 text-white rounded-full p-2">
                    <CompletedIcon size={20} />
                  </div>
                </div>
                <div className="roadmap-content ml-4 bg-white shadow p-6 rounded">
                  <div className="roadmap-header-content flex justify-between">
                    <div className="roadmap-date font-semibold">Q1 2024</div>
                    <div className="roadmap-status completed-status bg-green-100 text-green-600 px-2 py-1 rounded">Completed</div>
                  </div>
                  <h3 className="text-xl font-semibold mt-2">Project Launch</h3>
                  <div className="roadmap-features mt-2">
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>Smart Contract Development Complete</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>Security Audit Passed</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>Community Building Started</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="roadmap-item current flex">
                <div className="roadmap-marker">
                  <div className="marker-icon bg-blue-500 text-white rounded-full p-2">
                    <RocketLaunchIcon size={20} />
                  </div>
                </div>
                <div className="roadmap-content ml-4 bg-white shadow p-6 rounded">
                  <div className="roadmap-header-content flex justify-between">
                    <div className="roadmap-date font-semibold">Q2 2024</div>
                    <div className="roadmap-status current-status bg-blue-100 text-blue-600 px-2 py-1 rounded">In Progress</div>
                  </div>
                  <h3 className="text-xl font-semibold mt-2">Airdrop Campaign</h3>
                  <div className="roadmap-features mt-2">
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>Airdrop Campaign Launch</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>Token Distribution</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>Exchange Listing Applications</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="roadmap-item upcoming flex">
                <div className="roadmap-marker">
                  <div className="marker-icon bg-gray-500 text-white rounded-full p-2">
                    <ClockUpcomingIcon size={20} />
                  </div>
                </div>
                <div className="roadmap-content ml-4 bg-white shadow p-6 rounded">
                  <div className="roadmap-header-content flex justify-between">
                    <div className="roadmap-date font-semibold">Q3 2024</div>
                    <div className="roadmap-status upcoming-status bg-gray-100 text-gray-600 px-2 py-1 rounded">Coming Soon</div>
                  </div>
                  <h3 className="text-xl font-semibold mt-2">Ecosystem Expansion</h3>
                  <div className="roadmap-features mt-2">
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                      <span>DeFi Protocol Integration</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                      <span>NFT Marketplace Development</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                      <span>Cross-Chain Bridge</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="roadmap-item upcoming flex">
                <div className="roadmap-marker">
                  <div className="marker-icon bg-gray-500 text-white rounded-full p-2">
                    <GlobeIcon size={20} />
                  </div>
                </div>
                <div className="roadmap-content ml-4 bg-white shadow p-6 rounded">
                  <div className="roadmap-header-content flex justify-between">
                    <div className="roadmap-date font-semibold">Q4 2024</div>
                    <div className="roadmap-status upcoming-status bg-gray-100 text-gray-600 px-2 py-1 rounded">Coming Soon</div>
                  </div>
                  <h3 className="text-xl font-semibold mt-2">Global Expansion</h3>
                  <div className="roadmap-features mt-2">
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                      <span>Major Exchange Listings</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                      <span>Institutional Partnerships</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                      <span>Mobile App Launch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="faq mt-12">
            <h2 className="section-title text-3xl font-bold text-center">
              <QuestionIcon size={32} className="inline mr-2" /> FAQ
            </h2>
            <div className="faq-list mt-6 space-y-4">
              <div className="faq-item bg-white shadow p-4 rounded">
                <div className="faq-question flex justify-between items-center">
                  <h3 className="font-semibold">How to participate in PUMP airdrop?</h3>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer mt-2">
                  <p>Simply connect your wallet, verify your identity, and click the "Claim Now" button. The entire process is simple and fast, with no fees required.</p>
                </div>
              </div>

              <div className="faq-item bg-white shadow p-4 rounded">
                <div className="faq-question flex justify-between items-center">
                  <h3 className="font-semibold">When will airdrop tokens arrive?</h3>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer mt-2">
                  <p>Tokens will be automatically transferred to your wallet address within 24-48 hours after successful claiming. You can check transaction status on the blockchain explorer.</p>
                </div>
              </div>

              <div className="faq-item bg-white shadow p-4 rounded">
                <div className="faq-question flex justify-between items-center">
                  <h3 className="font-semibold">Do I need to pay gas fees?</h3>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer mt-2">
                  <p>Claiming tokens is free, but you need to pay a small gas fee to complete the blockchain transaction. We recommend operating when network congestion is low.</p>
                </div>
              </div>

              <div className="faq-item bg-white shadow p-4 rounded">
                <div className="faq-question flex justify-between items-center">
                  <h3 className="font-semibold">How long does the airdrop last?</h3>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer mt-2">
                  <p>The airdrop campaign will last for 30 days, or until all tokens are distributed. We recommend participating early as early participants receive additional rewards.</p>
                </div>
              </div>

              <div className="faq-item bg-white shadow p-4 rounded">
                <div className="faq-question flex justify-between items-center">
                  <h3 className="font-semibold">How to ensure security?</h3>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer mt-2">
                  <p>Our smart contracts have been audited by top security firms, and all code is open source and verifiable. Please only participate through official channels and avoid clicking any suspicious links.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="footer-content max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="footer-section">
              <div className="footer-logo text-2xl font-bold">
                <span>PUMP</span>
              </div>
              <p className="mt-2">Building the future of decentralized finance, making blockchain technology accessible to everyone.</p>
              <div className="social-links flex space-x-4 mt-4">
                <a href="#" className="social-link text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link text-gray-400 hover:text-white"><i className="fab fa-telegram"></i></a>
                <a href="#" className="social-link text-gray-400 hover:text-white"><i className="fab fa-discord"></i></a>
                <a href="#" className="social-link text-gray-400 hover:text-white"><i className="fab fa-github"></i></a>
              </div>
            </div>

            <div className="footer-section">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tokenomics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Roadmap</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Whitepaper</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="text-lg font-semibold">Support</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security Audit</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Bug Report</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Disclaimer</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Risk Warning</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom mt-8 text-center">
            <div className="footer-links flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
            </div>
            <p className="copyright mt-2">© 2024 PUMP Token. All rights reserved.</p>
          </div>
        </footer>
    </>
  );
}

export default App;