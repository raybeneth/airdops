import { createAppKit } from '@reown/appkit';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';

// WalletConnect 项目 ID
export const projectId = 'bc8f2a1b3cd268f8295dd93917c4173a';

// 创建 Reown Solana 适配器
const solanaAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
});

// 初始化 Reown AppKit（供 App.jsx 打开弹窗使用）
export const appKit = createAppKit({
  projectId,
  networks: [solana, solanaTestnet, solanaDevnet],
  adapters: [solanaAdapter],
  features: {
    analytics: true
  }
});

// 兼容现有 main.jsx 的导入（旧的 Provider 仍可工作）
const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
const network = WalletAdapterNetwork.Mainnet;
const endpoint = clusterApiUrl(network);

export { wallets, network, endpoint };