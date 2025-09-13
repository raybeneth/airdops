import { createAppKit } from '@reown/appkit';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { solana, solanaTestnet } from '@reown/appkit/networks';

const projectId = 'bc8f2a1b3cd268f8295dd93917c4173a'; // 确保此 projectId 在 Reown Cloud 中有效
const networks = [solana, solanaTestnet]; // 使用 Solana 网络
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

// 初始化 AppKit，包含 Solana 和 Wagmi 适配器
const appKit = createAppKit({
  projectId,
  adapters: [
    wagmiAdapter                                                                      
  ],
  networks: networks,
  metadata: {
    name: 'PUMP Token Airdrop',
    description: 'Claim your PUMP tokens',
    url: window.location.origin,
    icons: ['https://via.placeholder.com/150'], // 替换为您的实际 logo URL
  },
  features: {
    analytics: false,
  },
});

export { appKit, wagmiAdapter };