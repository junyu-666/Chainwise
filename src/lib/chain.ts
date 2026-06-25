/** BNB Smart Chain Testnet 的统一配置入口。 */

export const BNB_TESTNET = {
  chainId: Number(process.env.NEXT_PUBLIC_BNB_TESTNET_CHAIN_ID ?? 97),
  name: "BNB Smart Chain Testnet",
  currency: "tBNB",
  rpcUrl:
    process.env.NEXT_PUBLIC_BNB_TESTNET_RPC ??
    "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
  explorer:
    process.env.NEXT_PUBLIC_BNB_EXPLORER ?? "https://testnet.bscscan.com",
} as const;

/** 演示合约（留言板）地址，部署后通过环境变量注入。 */
export const DEMO_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_DEMO_CONTRACT_ADDRESS ?? "";

/**
 * barrier 字段说明领取门槛：
 *   "none"        — 只需粘贴地址，无任何链上余额要求
 *   "mainnet-bnb" — 需要 BSC 主网钱包持有一定 BNB
 *   "mainnet-eth" — 需要以太坊主网钱包持有一定 ETH
 */
export type FaucetBarrier = "none" | "mainnet-bnb" | "mainnet-eth";

export const FAUCETS: readonly {
  name: string;
  url: string;
  note: string;
  barrier: FaucetBarrier;
}[] = [
  {
    name: "BitBond 水龙头",
    url: "https://tokentool.bitbond.com/faucet/bsc-testnet",
    note: "粘贴地址即领，0.01 tBNB / 24 小时，无主网余额要求",
    barrier: "none",
  },
  {
    name: "BNB Chain 官方水龙头",
    url: "https://www.bnbchain.org/en/testnet-faucet",
    note: "每次领 0.3 tBNB，但需要 BSC 主网钱包持有 ≥0.002 BNB",
    barrier: "mainnet-bnb",
  },
  {
    name: "QuickNode 水龙头",
    url: "https://faucet.quicknode.com/binance-smart-chain/bnb-testnet",
    note: "每 12 小时可领一次，但需要以太坊主网持有 ≥0.001 ETH",
    barrier: "mainnet-eth",
  },
];

/** 拼接区块浏览器的交易 / 地址 / 合约链接。 */
export function explorerTxUrl(hash: string): string {
  return `${BNB_TESTNET.explorer}/tx/${hash}`;
}
export function explorerAddressUrl(address: string): string {
  return `${BNB_TESTNET.explorer}/address/${address}`;
}
