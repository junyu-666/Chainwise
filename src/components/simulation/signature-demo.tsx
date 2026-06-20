"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SignatureSample {
  key: string;
  type: string;
  scene: string;
  meaning: string;
  risk: "low" | "medium" | "high";
  check: string;
}

const SAMPLES: SignatureSample[] = [
  {
    key: "message",
    type: "Message Signing（消息签名）",
    scene: "登录某个网站，或证明「这个地址是我的」",
    meaning: "只是签一段文字，证明你控制这个地址。不会动用任何资产，也不花 Gas。",
    risk: "low",
    check: "看清要签的文字内容，确认没有夹带授权条款。",
  },
  {
    key: "approve",
    type: "Approve（授权）",
    scene: "在交易所或 DApp 里第一次使用某个代币",
    meaning: "允许某个合约动用你的某种代币。额度若是「无限」，对方未来可随时转走该代币。",
    risk: "high",
    check: "确认授权的合约可信、代币正确、额度尽量限定而非无限。",
  },
  {
    key: "permit",
    type: "Permit（离线授权）",
    scene: "一些「免 Gas」的授权场景",
    meaning: "不花 Gas 也能授予代币权限。骗局常用它，因为用户以为「只是签个名」。",
    risk: "high",
    check: "对陌生网站的 permit 一律警惕，它和 approve 一样危险。",
  },
  {
    key: "transfer",
    type: "Transfer / Swap（转账或兑换）",
    scene: "主动发起一笔转账或代币兑换",
    meaning: "会直接改变链上资产状态，把资产转出或换成别的代币。",
    risk: "medium",
    check: "确认收款地址、金额、代币、网络都正确后再确认。",
  },
];

const RISK = {
  low: { tone: "green" as const, label: "低风险" },
  medium: { tone: "amber" as const, label: "中风险" },
  high: { tone: "red" as const, label: "高风险" },
};

export function SignatureDemo() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="my-6 space-y-3">
      {SAMPLES.map((s) => {
        const isOpen = open === s.key;
        const risk = RISK[s.risk];
        return (
          <div
            key={s.key}
            className="overflow-hidden rounded-xl border border-zinc-200 bg-white"
          >
            <button
              onClick={() => setOpen(isOpen ? null : s.key)}
              className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-zinc-50"
            >
              <span className="flex items-center gap-2">
                <Badge tone={risk.tone}>{risk.label}</Badge>
                <span className="font-medium text-zinc-900">{s.type}</span>
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-zinc-400 transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen && (
              <div className="space-y-2 border-t border-zinc-100 px-4 py-3 text-sm">
                <p>
                  <span className="text-zinc-500">常见场景：</span>
                  {s.scene}
                </p>
                <p>
                  <span className="text-zinc-500">你正在授权：</span>
                  {s.meaning}
                </p>
                <p className="rounded-lg bg-zinc-50 p-2 text-zinc-700">
                  <span className="font-medium">签名前检查：</span>
                  {s.check}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
