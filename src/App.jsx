import { useState, useEffect } from 'react';
import { WagmiProvider, useDisconnect } from 'wagmi';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { RocketIcon, GiftIcon, StarIcon, MoneyIcon, MapIcon, ChatIcon, QuestionIcon, ClockIcon, ShieldIcon, CheckCircleIcon, CompletedIcon, RocketLaunchIcon, ClockUpcomingIcon, GlobeIcon } from './components/Icons';
import { wagmiAdapter } from './appkit-config'; // 导入初始化配置
import './appkit-config'; // 确保 AppKit 初始化

function App() {
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const [balance, setBalance] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 当地址变化时更新余额
  useEffect(() => {
    const updateBalance = async () => {
      if (!address) return;
      try {
        setIsLoading(true);
        const connection = new Connection(clusterApiUrl('mainnet-beta'));
        const publicKey = new PublicKey(address);
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('获取余额错误:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isConnected && address) {
      updateBalance();
    } else {
      setBalance(0);
    }
  }, [address, isConnected]);

  // 连接钱包
  const connectWallet = async () => {
    try {
      await open();
    } catch (error) {
      console.error('连接钱包错误:', error);
    }
  };

  // 断开钱包连接
  const disconnectWallet = async () => {
    try {
      disconnect();
      setIsSubmitted(false);
    } catch (error) {
      console.error('断开钱包连接错误:', error);
    }
  };

  // 处理领取操作
  const handleClaim = (e) => {
    e.preventDefault();
    if (isConnected) {
      setIsSubmitted(true);
      alert('领取成功！您的PUMP代币将会在24小时内发送到您的钱包。');
    } else {
      alert('请先连接钱包');
    }
  };

  // 缩短钱包地址显示
  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <>
        {/* 粒子背景 */}
        <div id="particles-js"></div>

        {/* 头部 */}
        <header className="w-full bg-gray-900 text-white py-4">
          <div className="header-content max-w-7xl mx-auto flex justify-between items-center px-4">
            <div className="logo flex items-center">
              <div className="logo-icon">
                <img src="/solana.png" alt="PUMP Logo" className="h-10" />
              </div>
              <div className="logo-text ml-2 text-2xl font-bold">pump.fun</div>
            </div>

            <nav>
              <ul className="flex space-x-6">
                <li><a href="#" className="hover:text-blue-400">首页</a></li>
                <li><a href="#" className="hover:text-blue-400">关于</a></li>
                <li><a href="#" className="hover:text-blue-400">代币经济学</a></li>
                <li><a href="#" className="hover:text-blue-400">路线图</a></li>
                <li><a href="#" className="hover:text-blue-400">常见问题</a></li>
              </ul>
            </nav>

            <div className="wallet-connector">
              {isConnected ? (
                <div className="wallet-info flex items-center space-x-4">
                  <span className="wallet-address bg-gray-700 px-3 py-1 rounded">{shortenAddress(address)}</span>
                  <span className="balance bg-gray-700 px-3 py-1 rounded">{balance.toFixed(2)} SOL</span>
                  <button
                    className="disconnect-wallet bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    onClick={disconnectWallet}
                  >
                    断开连接
                  </button>
                </div>
              ) : (
                <button
                  className="connect-wallet-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={connectWallet}
                  disabled={isLoading}
                >
                  {isLoading ? '连接中...' : '连接钱包'}
                </button>
              )}
            </div>
          </div>
        </header>

        {/* 主要内容 */}
        <div className="main-container max-w-7xl mx-auto px-4 py-8">
          {/* 英雄区 */}
          <section className="hero">
            <div className="hero-header text-center">
              <h1 className="text-4xl font-bold">PUMP 代币空投现已上线！</h1>
              <p className="hero-subtitle text-lg mt-2">加入去中心化金融的未来，领取您的 PUMP 代币。早期支持者专享限时优惠！</p>
            </div>

            <div className="hero-content flex flex-col md:flex-row mt-8">
              <div className="hero-left md:w-1/2">
                <div className="hero-stats bg-white shadow p-6 rounded">
                  <h3 className="text-xl font-semibold">活动统计</h3>
                  <div className="stats-grid grid grid-cols-3 gap-4 mt-4">
                    <div className="stat-item text-center">
                      <div className="stat-number text-2xl font-bold">$2.5M</div>
                      <div className="stat-label">总空投价值</div>
                    </div>
                    <div className="stat-item text-center">
                      <div className="stat-number text-2xl font-bold">50K</div>
                      <div className="stat-label">合格用户</div>
                    </div>
                    <div className="stat-item text-center">
                      <div className="stat-number text-2xl font-bold">7</div>
                      <div className="stat-label">剩余天数</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="airdrop-card md:w-1/2 bg-white shadow p-6 rounded ml-0 md:ml-4 mt-4 md:mt-0">
                <div className="card-header">
                  <h2 className="text-2xl font-semibold">
                    <GiftIcon size={24} className="inline mr-2" /> 领取您的 PUMP 代币
                  </h2>
                  <p>您有资格领取 <span className="highlight font-bold">5,000 PUMP 代币</span></p>
                </div>

                <div className="token-info flex items-center mt-4">
                  <div className="token-icon">
                    <img src="/10805.png" alt="PUMP Token" className="h-16" />
                  </div>
                  <div className="token-details ml-4">
                    <div className="token-amount text-xl font-bold">5,000 PUMP</div>
                    <div className="token-value text-gray-600">≈ $250 USD</div>
                    <div className="token-bonus text-green-500">+ 20% 早期支持者奖励</div>
                  </div>
                </div>

                <button
                  className="claim-button bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded mt-4 w-full"
                  onClick={handleClaim}
                >
                  <RocketIcon size={16} className="inline mr-2" />
                  立即领取
                </button>

                <div className="timer mt-4 text-center">
                  <p><ClockIcon size={16} className="inline mr-2" /> 空投结束倒计时: <span id="countdown">07:23:19:45</span></p>
                </div>

                <div className="eligibility-check mt-4 text-center">
                  <p><CheckCircleIcon size={16} className="inline mr-2" /> 资格已验证</p>
                  <p><ShieldIcon size={16} className="inline mr-2" /> 智能合约已审计</p>
                </div>
              </div>
            </div>
          </section>

          {/* 功能区 */}
          <section className="features mt-12">
            <h2 className="section-title text-3xl font-bold text-center">为什么选择 PUMP？</h2>
            <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="feature bg-white shadow p-6 rounded">
                <div className="feature-icon">
                  <RocketIcon size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-2">高性能区块链</h3>
                <p className="mt-2">基于先进区块链技术，交易速度快，费用低，为您提供最佳用户体验。</p>
              </div>

              <div className="feature bg-white shadow p-6 rounded">
                <div className="feature-icon">
                  <ShieldIcon size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-2">安全可靠</h3>
                <p className="mt-2">智能合约经过顶级安全公司审计，配备多重安全机制，确保您的资产安全。</p>
              </div>

              <div className="feature bg-white shadow p-6 rounded">
                <div className="feature-icon">
                  <StarIcon size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-2">巨大潜力</h3>
                <p className="mt-2">供应有限且生态系统不断增长，PUMP 具有巨大的增长潜力与投资价值。</p>
              </div>

              <div className="feature bg-white shadow p-6 rounded">
                <div className="feature-icon">
                  <ChatIcon size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-2">强大社区</h3>
                <p className="mt-2">由活跃的全球社区支持，持续进行技术创新和生态系统发展。</p>
              </div>

              <div className="feature bg-white shadow p-6 rounded">
                <div className="feature-icon">
                  <GlobeIcon size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-2">全球覆盖</h3>
                <p className="mt-2">支持多种语言和地区，为全球用户提供便捷的金融服务。</p>
              </div>

              <div className="feature bg-white shadow p-6 rounded">
                <div className="feature-icon">
                  <MoneyIcon size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-2">稀缺性</h3>
                <p className="mt-2">有限的总供应量结合通缩机制设计，提供显著的长期持有价值。</p>
              </div>
            </div>
          </section>

          {/* 代币经济学区 */}
          <section className="tokenomics mt-12">
            <h2 className="section-title text-3xl font-bold text-center">
              <MoneyIcon size={32} className="inline mr-2" /> 代币经济学
            </h2>
            <div className="tokenomics-content mt-6">
              <div className="tokenomics-info bg-white shadow p-6 rounded">
                <div className="info-grid grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="info-item">
                    <h3 className="font-semibold">总供应量</h3>
                    <p>100,000,000 PUMP</p>
                  </div>
                  <div className="info-item">
                    <h3 className="font-semibold">空投分配</h3>
                    <p>25% (25,000,000 PUMP)</p>
                  </div>
                  <div className="info-item">
                    <h3 className="font-semibold">流动性池</h3>
                    <p>30% (30,000,000 PUMP)</p>
                  </div>
                  <div className="info-item">
                    <h3 className="font-semibold">生态系统发展</h3>
                    <p>20% (20,000,000 PUMP)</p>
                  </div>
                  <div className="info-item">
                    <h3 className="font-semibold">团队储备</h3>
                    <p>15% (15,000,000 PUMP)</p>
                  </div>
                  <div className="info-item">
                    <h3 className="font-semibold">合作伙伴</h3>
                    <p>10% (10,000,000 PUMP)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 路线图区 */}
          <section className="roadmap mt-12">
            <div className="roadmap-header text-center">
              <h2 className="section-title text-3xl font-bold">
                <MapIcon size={32} className="inline mr-2" /> 路线图
              </h2>
              <p className="roadmap-subtitle text-lg mt-2">我们革新去中心化金融的旅程</p>
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
                    <div className="roadmap-date font-semibold">2024年第一季度</div>
                    <div className="roadmap-status completed-status bg-green-100 text-green-600 px-2 py-1 rounded">已完成</div>
                  </div>
                  <h3 className="text-xl font-semibold mt-2">项目启动</h3>
                  <div className="roadmap-features mt-2">
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>智能合约开发完成</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>通过安全审计</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>社区建设开始</span>
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
                    <div className="roadmap-date font-semibold">2024年第二季度</div>
                    <div className="roadmap-status current-status bg-blue-100 text-blue-600 px-2 py-1 rounded">进行中</div>
                  </div>
                  <h3 className="text-xl font-semibold mt-2">空投活动</h3>
                  <div className="roadmap-features mt-2">
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>空投活动启动</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>代币分发</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>交易所上市申请</span>
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
                    <div className="roadmap-date font-semibold">2024年第三季度</div>
                    <div className="roadmap-status upcoming-status bg-gray-100 text-gray-600 px-2 py-1 rounded">即将推出</div>
                  </div>
                  <h3 className="text-xl font-semibold mt-2">生态系统扩展</h3>
                  <div className="roadmap-features mt-2">
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                      <span>DeFi 协议整合</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                      <span>NFT 市场开发</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                      <span>跨链桥接</span>
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
                    <div className="roadmap-date font-semibold">2024年第四季度</div>
                    <div className="roadmap-status upcoming-status bg-gray-100 text-gray-600 px-2 py-1 rounded">即将推出</div>
                  </div>
                  <h3 className="text-xl font-semibold mt-2">全球扩展</h3>
                  <div className="roadmap-features mt-2">
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                      <span>主要交易所上市</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                      <span>机构合作伙伴关系</span>
                    </div>
                    <div className="feature-item flex items-center">
                      <div className="feature-dot w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                      <span>移动应用发布</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 常见问题区 */}
          <section className="faq mt-12">
            <h2 className="section-title text-3xl font-bold text-center">
              <QuestionIcon size={32} className="inline mr-2" /> 常见问题
            </h2>
            <div className="faq-list mt-6 space-y-4">
              <div className="faq-item bg-white shadow p-4 rounded">
                <div className="faq-question flex justify-between items-center">
                  <h3 className="font-semibold">如何参与 PUMP 空投？</h3>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer mt-2">
                  <p>只需连接您的钱包，验证身份，然后点击“立即领取”按钮。整个过程简单快捷，无需费用。</p>
                </div>
              </div>

              <div className="faq-item bg-white shadow p-4 rounded">
                <div className="faq-question flex justify-between items-center">
                  <h3 className="font-semibold">空投代币何时到账？</h3>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer mt-2">
                  <p>代币将在成功领取后的 24-48 小时内自动转入您的钱包地址。您可以在区块链浏览器上查看交易状态。</p>
                </div>
              </div>

              <div className="faq-item bg-white shadow p-4 rounded">
                <div className="faq-question flex justify-between items-center">
                  <h3 className="font-semibold">需要支付 Gas 费用吗？</h3>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer mt-2">
                  <p>领取代币是免费的，但您需要支付少量的 Gas 费用来完成区块链交易。建议在网络拥堵较低时操作。</p>
                </div>
              </div>

              <div className="faq-item bg-white shadow p-4 rounded">
                <div className="faq-question flex justify-between items-center">
                  <h3 className="font-semibold">空投活动持续多久？</h3>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer mt-2">
                  <p>空投活动将持续 30 天，或直到所有代币分发完毕。建议尽早参与，因为早期参与者可获得额外奖励。</p>
                </div>
              </div>

              <div className="faq-item bg-white shadow p-4 rounded">
                <div className="faq-question flex justify-between items-center">
                  <h3 className="font-semibold">如何确保安全？</h3>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer mt-2">
                  <p>我们的智能合约已由顶级安全公司审计，所有代码开源可验证。请仅通过官方渠道参与，勿点击任何可疑链接。</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 页脚 */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="footer-content max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="footer-section">
              <div className="footer-logo text-2xl font-bold">
                <span>PUMP</span>
              </div>
              <p className="mt-2">打造去中心化金融的未来，让每个人都能享受区块链技术带来的便利。</p>
              <div className="social-links flex space-x-4 mt-4">
                <a href="#" className="social-link text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link text-gray-400 hover:text-white"><i className="fab fa-telegram"></i></a>
                <a href="#" className="social-link text-gray-400 hover:text-white"><i className="fab fa-discord"></i></a>
                <a href="#" className="social-link text-gray-400 hover:text-white"><i className="fab fa-github"></i></a>
              </div>
            </div>

            <div className="footer-section">
              <h3 className="text-lg font-semibold">快速链接</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">首页</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">关于我们</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">代币经济学</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">路线图</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">白皮书</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="text-lg font-semibold">支持</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">帮助中心</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">常见问题</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">联系我们</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">安全审计</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">错误报告</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="text-lg font-semibold">法律</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">隐私政策</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">服务条款</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">免责声明</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">风险警告</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom mt-8 text-center">
            <div className="footer-links flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">隐私政策</a>
              <a href="#" className="text-gray-400 hover:text-white">服务条款</a>
              <a href="#" className="text-gray-400 hover:text-white">联系我们</a>
            </div>
            <p className="copyright mt-2">© 2024 PUMP Token. 保留所有权利。</p>
          </div>
        </footer>
      </>
    </WagmiProvider>
  );
}

export default App;