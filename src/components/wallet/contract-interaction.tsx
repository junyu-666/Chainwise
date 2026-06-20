"use client";

import { useEffect, useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { useWalletStatus } from "@/hooks/use-wallet";
import { useProgress } from "@/hooks/use-progress";
import { GUESTBOOK_ABI } from "@/lib/guestbook";
import { DEMO_CONTRACT_ADDRESS, explorerTxUrl } from "@/lib/chain";
import { GuestbookFeed } from "@/components/guide/guestbook-feed";
import { ConnectButton } from "./connect-button";
import { Button } from "@/components/ui/button";

const configured = DEMO_CONTRACT_ADDRESS !== "";

/**
 * 站内一键调用 GuestBook.post()：用户输入一句话，钱包确认后写到链上，
 * 成功后自动刷新下方留言墙并标记完成。
 */
export function ContractInteraction() {
  const { isConnected, isCorrectNetwork, switchToTarget } = useWalletStatus();
  const { markDone } = useProgress();

  const [message, setMessage] = useState("");
  const [refreshSignal, setRefreshSignal] = useState(0);

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      markDone("contract");
      setRefreshSignal((s) => s + 1);
    }
  }, [isSuccess, markDone]);

  if (!configured) {
    return <GuestbookFeed />;
  }

  if (!isConnected) {
    return (
      <div className="my-6 rounded-xl border border-zinc-200 bg-white p-5">
        <p className="text-sm text-zinc-600">
          先连接钱包，才能向合约写留言。
        </p>
        <div className="mt-3">
          <ConnectButton />
        </div>
        <GuestbookFeed refreshSignal={refreshSignal} />
      </div>
    );
  }

  const canPost =
    isCorrectNetwork &&
    message.trim().length > 0 &&
    message.length <= 280 &&
    !isPending &&
    !isConfirming;

  return (
    <div className="my-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        <p className="font-medium text-zinc-900">写一句话到链上</p>

        {!isCorrectNetwork && (
          <div className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            请先切换到 BNB 测试网。
            <Button className="ml-2" size="sm" onClick={switchToTarget}>
              一键切换
            </Button>
          </div>
        )}

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={280}
          rows={2}
          placeholder="例如：这是我第一次和智能合约交互！"
          className="mt-3 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        <div className="mt-1 text-right text-xs text-zinc-400">
          {message.length}/280
        </div>

        <Button
          onClick={() =>
            writeContract({
              address: DEMO_CONTRACT_ADDRESS as `0x${string}`,
              abi: GUESTBOOK_ABI,
              functionName: "post",
              args: [message],
            })
          }
          disabled={!canPost}
        >
          {isPending
            ? "请在钱包中确认…"
            : isConfirming
              ? "上链确认中…"
              : "写到链上"}
        </Button>

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error.message.includes("User rejected")
              ? "你在钱包里取消了这笔交易。"
              : "交易失败，请检查网络和余额后重试。"}
          </p>
        )}

        {hash && (
          <div className="mt-4 rounded-lg bg-zinc-50 p-3 text-sm">
            {isConfirming && (
              <p className="flex items-center gap-2 text-amber-700">
                <Loader2 className="h-4 w-4 animate-spin" />
                正在上链…
              </p>
            )}
            {isSuccess && (
              <p className="flex items-center gap-2 font-medium text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                成功！你的留言已永久写入区块链。
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

      <GuestbookFeed refreshSignal={refreshSignal} />
    </div>
  );
}
