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

/** 推荐的零门槛水龙头入口，按优先级排列。 */
export const FAUCETS = [
  {
    name: "BNB Chain 官方水龙头",
    url: "https://www.bnbchain.org/en/testnet-faucet",
    note: "仅需填写钱包地址，无主网余额要求",
  },
  {
    name: "Bitbond 水龙头",
    url: "https://tokentool.bitbond.com/faucet/bsc-testnet",
    note: "备选，仅需填写钱包地址",
  },
  {
    name: "QuickNode 水龙头",
    url: "https://faucet.quicknode.com/binance-smart-chain/bnb-testnet",
    note: "备选，仅需填写钱包地址",
  },
] as const;

/** 拼接区块浏览器的交易 / 地址 / 合约链接。 */
export function explorerTxUrl(hash: string): string {
  return `${BNB_TESTNET.explorer}/tx/${hash}`;
}
export function explorerAddressUrl(address: string): string {
  return `${BNB_TESTNET.explorer}/address/${address}`;
}
