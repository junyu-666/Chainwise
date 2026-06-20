import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MockTx {
  hash: string;
  status: "success" | "pending" | "failed";
  from: string;
  to: string;
  value: string;
  token: string;
  gasUsed: string;
  block: number;
  confirmations: number;
  timestamp: string;
}

interface Field {
  label: string;
  value: React.ReactNode;
  hint?: string;
  highlight?: boolean;
}

const STATUS = {
  success: { icon: CheckCircle2, text: "成功", cls: "text-green-700 bg-green-50 border-green-200" },
  pending: { icon: Clock, text: "等待确认", cls: "text-amber-700 bg-amber-50 border-amber-200" },
  failed: { icon: XCircle, text: "失败", cls: "text-red-700 bg-red-50 border-red-200" },
};

/**
 * 模拟区块浏览器视图。把 BscScan 的核心字段简化为新手能读懂的样子，
 * 每个字段配一句注释。highlightFields 用于在任务中高亮要找的字段。
 */
export function MockExplorer({
  tx,
  highlightFields = [],
}: {
  tx: MockTx;
  highlightFields?: string[];
}) {
  const status = STATUS[tx.status];
  const StatusIcon = status.icon;

  const fields: Field[] = [
    {
      label: "Transaction Hash",
      value: <code className="break-all font-mono text-xs">{tx.hash}</code>,
      hint: "这笔交易的唯一查询编号",
      highlight: highlightFields.includes("hash"),
    },
    {
      label: "Status",
      value: (
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
            status.cls,
          )}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {status.text}
        </span>
      ),
      hint: "只有 Success 才代表真正到账",
      highlight: highlightFields.includes("status"),
    },
    {
      label: "From",
      value: <code className="break-all font-mono text-xs">{tx.from}</code>,
      hint: "付款方地址",
      highlight: highlightFields.includes("from"),
    },
    {
      label: "To",
      value: <code className="break-all font-mono text-xs">{tx.to}</code>,
      hint: "收款方地址，确认是不是你自己",
      highlight: highlightFields.includes("to"),
    },
    {
      label: "Value",
      value: (
        <span className="font-medium">
          {tx.value} {tx.token}
        </span>
      ),
      hint: "转账金额与代币种类",
      highlight: highlightFields.includes("value"),
    },
    {
      label: "Gas Used",
      value: <span>{tx.gasUsed}</span>,
      hint: "这笔交易消耗的手续费（用原生币支付）",
    },
    {
      label: "Block",
      value: <span>{tx.block.toLocaleString()}</span>,
      hint: "被打包进的区块高度",
    },
    {
      label: "Confirmations",
      value: <span>{tx.confirmations}</span>,
      hint: "后续又叠加了多少个区块，越多越不可逆",
    },
    {
      label: "Timestamp",
      value: <span>{tx.timestamp}</span>,
      hint: "上链时间",
    },
  ];

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-500">
        模拟区块浏览器 · 简化视图
      </div>
      <dl className="divide-y divide-zinc-100">
        {fields.map((f) => (
          <div
            key={f.label}
            className={cn(
              "grid grid-cols-[120px_1fr] gap-3 px-4 py-3 sm:grid-cols-[160px_1fr]",
              f.highlight && "bg-teal-50",
            )}
          >
            <dt className="text-xs font-medium text-zinc-500">{f.label}</dt>
            <dd className="min-w-0 text-sm text-zinc-800">
              {f.value}
              {f.hint && (
                <p className="mt-0.5 text-xs text-zinc-400">{f.hint}</p>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
