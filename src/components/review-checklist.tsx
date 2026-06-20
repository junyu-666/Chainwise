"use client";

import Link from "next/link";
import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useProgress } from "@/hooks/use-progress";
import { Button } from "@/components/ui/button";

const ABILITIES = [
  "我知道钱包不是账户，而是管理控制权的工具",
  "我知道地址可以公开，助记词绝不能泄露",
  "我知道连接钱包、签名，和真正转账是不同的事",
  "我知道 approve / permit 这类授权可能让别人动我的资产",
  "我知道如何用交易哈希在区块浏览器确认是否到账",
  "我用自己的钱包在测试网完成过一次真实转账",
  "我调用过一次智能合约，把一句话写到了链上",
];

export function ReviewChecklist() {
  const { markDone, reset } = useProgress();
  const [checked, setChecked] = useState<boolean[]>(
    () => ABILITIES.map(() => false),
  );

  function toggle(i: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  const allChecked = checked.every(Boolean);

  return (
    <div className="my-6">
      <ul className="space-y-2">
        {ABILITIES.map((text, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-start gap-3 rounded-lg border border-zinc-200 bg-white p-3 text-left hover:bg-zinc-50"
            >
              {checked[i] ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
              ) : (
                <Circle className="mt-0.5 h-5 w-5 shrink-0 text-zinc-300" />
              )}
              <span className="text-sm text-zinc-800">{text}</span>
            </button>
          </li>
        ))}
      </ul>

      {allChecked && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5 text-center">
          <p className="font-semibold text-green-800">
            恭喜，你已经完整走过区块链的核心动作。
          </p>
          <p className="mt-1 text-sm text-green-700">
            接下来可以去安全中心复习常见骗局，或把这份指南转发给同样想入门的人。
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Button onClick={() => markDone("review")}>标记全部完成</Button>
            <Link
              href="/safety"
              className="inline-flex h-10 items-center rounded-lg border border-green-300 px-4 text-sm font-medium text-green-800 hover:bg-green-100"
            >
              去安全中心
            </Link>
          </div>
        </div>
      )}

      <button
        onClick={reset}
        className="mt-6 inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-600"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        重置全部学习进度
      </button>
    </div>
  );
}
