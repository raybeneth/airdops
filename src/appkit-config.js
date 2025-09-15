// 使用原生 Solana 钱包适配器，避免 AppKit 错误
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';

// 项目ID
const projectId = 'bc8f2a1b3cd268f8295dd93917c4173a';

// 钱包配置 - 不使用 hooks
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

// 网络配置
const network = WalletAdapterNetwork.Mainnet;
const endpoint = clusterApiUrl(network);

// 导出配置
export { projectId, wallets, network, endpoint };