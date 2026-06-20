import { createPublicClient, defineChain, http } from "viem";
import { BNB_TESTNET } from "./chain";

/** BNB 测试网链定义（viem）。 */
export const bscTestnet = defineChain({
  id: BNB_TESTNET.chainId,
  name: BNB_TESTNET.name,
  nativeCurrency: { name: "tBNB", symbol: "tBNB", decimals: 18 },
  rpcUrls: {
    default: { http: [BNB_TESTNET.rpcUrl] },
  },
  blockExplorers: {
    default: { name: "BscScan Testnet", url: BNB_TESTNET.explorer },
  },
  testnet: true,
});

/**
 * 只读公共客户端。Chainwise 不持有任何私钥，不发送交易，
 * 仅用它查询余额与交易状态。
 */
export const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http(),
});
