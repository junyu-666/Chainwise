"use client";

import { useState } from "react";
import { Search, ExternalLink, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { explorerTxUrl } from "@/lib/chain";
import { cn } from "@/lib/utils";

interface TxResult {
  status: "success" | "pending" | "failed";
  from: string;
  to: string | null;
  value: string;
  gasUsed: string | null;
  blockNumber: number | null;
  timestamp: number | null;
}

const STATUS = {
  success: { icon: CheckCircle2, text: "成功 Success", cls: "text-green-700" },
  pending: { icon: Clock, text: "等待确认 Pending", cls: "text-amber-700" },
  failed: { icon: XCircle, text: "失败 Failed", cls: "text-red-700" },
};

/** 在站内输入交易哈希，查询 BNB 测试网上的真实状态。 */
export function TxLookup() {
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TxResult | null>(null);

  async function lookup() {
    const trimmed = hash.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/tx/${trimmed}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "查询失败");
      } else {
        setResult(data as TxResult);
      }
    } catch {
      setError("网络错误，稍后再试");
    } finally {
      setLoading(false);
    }
  }

  const status = result ? STATUS[result.status] : null;
  const StatusIcon = status?.icon;

  return (
    <div className="my-6 rounded-xl border border-zinc-200 bg-white p-5">
      <p className="font-medium text-zinc-900">站内查询交易状态</p>
      <p className="mt-1 text-sm text-zinc-500">
        粘贴你的交易哈希，直接读取 BNB 测试网上的真实记录。
      </p>
      <div className="mt-3 flex gap-2">
        <input
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder="0x..."
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        <Button onClick={lookup} disabled={loading}>
          <Search className="h-4 w-4" />
          {loading ? "查询中" : "查询"}
        </Button>
      </div>

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {result && status && StatusIcon && (
        <div className="mt-4 space-y-2 rounded-lg bg-zinc-50 p-4 text-sm">
          <p className={cn("flex items-center gap-1.5 font-medium", status.cls)}>
            <StatusIcon className="h-4 w-4" />
            {status.text}
          </p>
          <dl className="grid grid-cols-[80px_1fr] gap-1 text-zinc-700">
            <dt className="text-zinc-400">From</dt>
            <dd className="break-all font-mono text-xs">{result.from}</dd>
            <dt className="text-zinc-400">To</dt>
            <dd className="break-all font-mono text-xs">{result.to ?? "—"}</dd>
            <dt className="text-zinc-400">Value</dt>
            <dd>{result.value} tBNB</dd>
            {result.blockNumber !== null && (
              <>
                <dt className="text-zinc-400">Block</dt>
                <dd>{result.blockNumber.toLocaleString()}</dd>
              </>
            )}
          </dl>
          <a
            href={explorerTxUrl(hash.trim())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-teal-700 hover:underline"
          >
            在 BscScan 上查看完整记录
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
