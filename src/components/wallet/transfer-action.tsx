"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { isAddress, parseEther } from "viem";
import { CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { useWalletStatus } from "@/hooks/use-wallet";
import { useProgress } from "@/hooks/use-progress";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "./connect-button";
import { explorerTxUrl } from "@/lib/chain";

/**
 * 站内一键发起测试转账：用户填金额和收款地址（可一键填自己），
 * 点击后钱包弹窗确认，网站自动追踪 Pending → Success 并标记完成。
 */
export function TransferAction() {
  const { address } = useAccount();
  const { isConnected, isCorrectNetwork, hasBalance, switchToTarget } =
    useWalletStatus();
  const { markDone } = useProgress();

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("0.001");

  const {
    sendTransaction,
    data: hash,
    isPending,
    error,
  } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) markDone("transfer");
  }, [isSuccess, markDone]);

  if (!isConnected) {
    return (
      <div className="my-6 rounded-xl border border-zinc-200 bg-white p-5">
        <p className="text-sm text-zinc-600">先连接钱包，才能发起转账。</p>
        <div className="mt-3">
          <ConnectButton />
        </div>
      </div>
    );
  }

  const validAddress = isAddress(to);
  const canSend =
    isCorrectNetwork && hasBalance && validAddress && !isPending && !isConfirming;

  return (
    <div className="my-6 rounded-xl border border-zinc-200 bg-white p-5">
      <p className="font-medium text-zinc-900">发起一笔测试转账</p>

      {!isCorrectNetwork && (
        <div className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          请先切换到 BNB 测试网。
          <Button className="ml-2" size="sm" onClick={switchToTarget}>
            一键切换
          </Button>
        </div>
      )}

      {isCorrectNetwork && !hasBalance && (
        <div className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          余额为 0，请先回上一步领取测试币。
        </div>
      )}

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-xs text-zinc-500">收款地址</label>
          <div className="mt-1 flex gap-2">
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="0x..."
              className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => address && setTo(address)}
            >
              转给我自己
            </Button>
          </div>
          {to && !validAddress && (
            <p className="mt-1 text-xs text-red-600">地址格式不正确</p>
          )}
        </div>

        <div>
          <label className="text-xs text-zinc-500">金额（tBNB）</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <Button
          onClick={() =>
            sendTransaction({
              to: to as `0x${string}`,
              value: parseEther(amount || "0"),
            })
          }
          disabled={!canSend}
        >
          {isPending
            ? "请在钱包中确认…"
            : isConfirming
              ? "交易确认中…"
              : "发起转账"}
        </Button>
      </div>

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error.message.includes("User rejected")
            ? "你在钱包里取消了这笔交易。"
            : "交易失败，请检查余额和网络后重试。"}
        </p>
      )}

      {hash && (
        <div className="mt-4 rounded-lg bg-zinc-50 p-3 text-sm">
          {isConfirming && (
            <p className="flex items-center gap-2 text-amber-700">
              <Loader2 className="h-4 w-4 animate-spin" />
              Pending：交易已提交，等待打包确认…
            </p>
          )}
          {isSuccess && (
            <p className="flex items-center gap-2 font-medium text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              Success：转账成功上链！
            </p>
          )}
          <a
            href={explorerTxUrl(hash)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-teal-700 hover:underline"
          >
            在 BscScan 上查看这笔交易
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
