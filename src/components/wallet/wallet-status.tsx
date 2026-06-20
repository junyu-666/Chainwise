"use client";

import { AlertTriangle, CheckCircle2, Wallet } from "lucide-react";
import { formatEther } from "viem";
import { useWalletStatus } from "@/hooks/use-wallet";
import { ConnectButton } from "./connect-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { shorten } from "@/lib/utils";

/**
 * 钱包状态总览卡片：连接状态、地址、网络是否正确、余额。
 * 放在实操引导页顶部，让用户随时看到自己当前的真实状态。
 */
export function WalletStatus() {
  const {
    isConnected,
    address,
    isCorrectNetwork,
    balance,
    isSwitching,
    switchToTarget,
  } = useWalletStatus();

  if (!isConnected) {
    return (
      <div className="my-6 rounded-xl border border-zinc-200 bg-white p-5">
        <div className="flex items-center gap-2 text-zinc-700">
          <Wallet className="h-5 w-5 text-teal-600" />
          <span className="font-medium">还没有连接钱包</span>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          连接后，本页会自动检测你的网络和余额，每一步是否完成一目了然。
        </p>
        <div className="mt-3">
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-medium text-zinc-900">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          钱包已连接
        </span>
        <ConnectButton size="sm" />
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-zinc-500">地址</dt>
          <dd className="font-mono text-zinc-800">{shorten(address!)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-zinc-500">网络</dt>
          <dd>
            {isCorrectNetwork ? (
              <Badge tone="green">BNB 测试网 ✓</Badge>
            ) : (
              <Badge tone="red">不是测试网</Badge>
            )}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-zinc-500">测试币余额</dt>
          <dd className="font-medium text-zinc-800">
            {balance
              ? `${Number(formatEther(balance.value)).toFixed(4)} tBNB`
              : "—"}
          </dd>
        </div>
      </dl>

      {!isCorrectNetwork && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <p className="flex items-center gap-1.5 text-sm text-amber-800">
            <AlertTriangle className="h-4 w-4" />
            你当前不在 BNB 测试网。为避免真实资产风险，请切换。
          </p>
          <Button
            className="mt-2"
            size="sm"
            onClick={switchToTarget}
            disabled={isSwitching}
          >
            {isSwitching ? "切换中…" : "一键切换到 BNB 测试网"}
          </Button>
        </div>
      )}
    </div>
  );
}
