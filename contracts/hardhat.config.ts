import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    bscTestnet: {
      url:
        process.env.BNB_TESTNET_RPC ??
        "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      chainId: 97,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  // hardhat-verify 通过 Etherscan V2 统一 API，按 chainId 自动路由到 BscScan
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY ?? "",
  },
};

export default config;
