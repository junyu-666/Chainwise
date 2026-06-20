"use client";

import { useAccount, useBalance, useChainId, useSwitchChain } from "wagmi";

/** 目标网络：BNB 测试网。 */
export const TARGET_CHAIN_ID = 97;

/** 统一的钱包状态：连接、网络、余额，以及一键切换网络。 */
export function useWalletStatus() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isCorrectNetwork = isConnected && chainId === TARGET_CHAIN_ID;

  const { data: balance, refetch: refetchBalance } = useBalance({
    address,
    chainId: TARGET_CHAIN_ID,
    query: { enabled: Boolean(address) },
  });

  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const hasBalance = balance ? balance.value > 0n : false;

  return {
    address,
    isConnected,
    chainId,
    isCorrectNetwork,
    balance,
    hasBalance,
    refetchBalance,
    switchToTarget: () => switchChain({ chainId: TARGET_CHAIN_ID }),
    isSwitching,
  };
}
