"use client";

import { createAppKit } from "@reown/appkit/react";
import { bscTestnet } from "@reown/appkit/networks";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiAdapter, effectiveProjectId, networks } from "@/lib/web3-config";
import { SITE_URL } from "@/lib/site";

const queryClient = new QueryClient();

// OKX 钱包的 WalletConnect 标识，置于推荐位首位
const OKX_WALLET_ID =
  "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709";

createAppKit({
  adapters: [wagmiAdapter],
  projectId: effectiveProjectId,
  networks,
  defaultNetwork: bscTestnet,
  metadata: {
    name: "Chainwise",
    description: "给完全新手的区块链安全上手指南",
    url: SITE_URL,
    icons: [`${SITE_URL}/icon.png`],
  },
  featuredWalletIds: [OKX_WALLET_ID],
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
