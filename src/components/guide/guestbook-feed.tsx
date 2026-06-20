"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { publicClient } from "@/lib/viem";
import { DEMO_CONTRACT_ADDRESS } from "@/lib/chain";
import { GUESTBOOK_ABI, type GuestMessage } from "@/lib/guestbook";
import { shorten } from "@/lib/utils";

/** 只读展示链上留言板的最新留言。合约未部署时显示占位说明。 */
export function GuestbookFeed() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const configured = DEMO_CONTRACT_ADDRESS !== "";

  async function load() {
    if (!configured) return;
    setLoading(true);
    setError(null);
    try {
      const data = (await publicClient.readContract({
        address: DEMO_CONTRACT_ADDRESS as `0x${string}`,
        abi: GUESTBOOK_ABI,
        functionName: "getMessages",
      })) as readonly GuestMessage[];
      setMessages([...data].reverse().slice(0, 20));
    } catch {
      setError("读取留言失败，确认合约地址和网络是否正确");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!configured) {
    return (
      <div className="my-6 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm text-zinc-500">
        演示合约部署并配置后，这里会实时显示链上留言墙。
      </div>
    );
  }

  return (
    <div className="my-6 rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="font-medium text-zinc-900">链上留言墙</p>
        <button
          onClick={load}
          className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900"
        >
          <RefreshCw className="h-4 w-4" />
          刷新
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {loading && <p className="mt-3 text-sm text-zinc-400">读取中…</p>}

      {!loading && !error && messages.length === 0 && (
        <p className="mt-3 text-sm text-zinc-400">还没有留言，来当第一个吧。</p>
      )}

      <ul className="mt-3 space-y-2">
        {messages.map((m, i) => (
          <li
            key={i}
            className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 text-sm"
          >
            <p className="text-zinc-800">{m.content}</p>
            <p className="mt-1 font-mono text-xs text-zinc-400">
              {shorten(m.author)} ·{" "}
              {new Date(Number(m.timestamp) * 1000).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
