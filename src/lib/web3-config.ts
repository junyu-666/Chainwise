import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { bscTestnet } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

/**
 * WalletConnect / Reown 项目 ID。去 https://cloud.reown.com 免费注册获取，
 * 填入根目录 .env 的 NEXT_PUBLIC_REOWN_PROJECT_ID。
 * 没有它时扫码连接不可用。
 */
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ?? "";

/** 是否已配置 projectId。 */
export const hasProjectId = projectId.length > 0;

// WagmiAdapter / AppKit 构造需要非空字符串，未配置时用占位符以保证应用仍能启动。
export const effectiveProjectId =
  projectId || "00000000000000000000000000000000";

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [bscTestnet];

export const wagmiAdapter = new WagmiAdapter({
  projectId: effectiveProjectId,
  networks,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

/** 目标网络（BNB 测试网）。 */
export const targetNetwork = bscTestnet;
