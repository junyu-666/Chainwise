"use client";

import { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { CheckCircle2, Loader2 } from "lucide-react";
import { TARGET_CHAIN_ID } from "@/hooks/use-wallet";
import { useProgress } from "@/hooks/use-progress";
import { CopyField } from "@/components/ui/copy-field";
import { ConnectButton } from "./connect-button";
import { formatEther } from "viem";

/**
 * 领水后自动检测到账：连接钱包后每 5 秒刷新余额，
 * 余额 > 0 即标记该步完成。用户不必手动判断。
 */
export function FaucetBalanceCheck() {
  const { address, isConnected } = useAccount();
  const { markDone } = useProgress();

  const { data: balance } = useBalance({
    address,
    chainId: TARGET_CHAIN_ID,
    query: { enabled: Boolean(address), refetchInterval: 5000 },
  });

  const arrived = balance ? balance.value > 0n : false;

  useEffect(() => {
    if (arrived) markDone("get-bnb");
  }, [arrived, markDone]);

  if (!isConnected) {
    return (
      <div className="my-6 rounded-xl border border-zinc-200 bg-white p-5">
        <p className="text-sm text-zinc-600">
          先连接钱包，连接后这里会自动显示你的地址，并实时检测测试币是否到账。
        </p>
        <div className="mt-3">
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 rounded-xl border border-zinc-200 bg-white p-5">
      <p className="font-medium text-zinc-900">你的收款地址</p>
      <p className="mt-1 text-sm text-zinc-500">
        复制它，粘贴到下面的水龙头网站领取。地址是公开信息，可以放心粘贴。
      </p>
      {address && <CopyField value={address} />}

      <div className="mt-4 rounded-lg border p-4">
        {arrived ? (
          <p className="flex items-center gap-2 font-medium text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            已到账：{Number(formatEther(balance!.value)).toFixed(4)} tBNB
          </p>
        ) : (
          <p className="flex items-center gap-2 text-sm text-zinc-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            正在自动检测到账…领取成功后这里会自动变绿，无需刷新页面。
          </p>
        )}
      </div>
    </div>
  );
}
