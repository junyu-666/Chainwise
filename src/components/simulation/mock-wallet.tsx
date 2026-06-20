"use client";

import { useState } from "react";
import { Eye, EyeOff, RefreshCw, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SAMPLE_WORDS = [
  "ladder", "ocean", "puzzle", "velvet", "harvest", "signal",
  "marble", "tunnel", "orbit", "cradle", "pioneer", "bamboo",
];

/** 生成一段随机的十六进制字符串作为「模拟」展示，不产生真实私钥。 */
function randomHex(len: number): string {
  const chars = "0123456789abcdef";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * 16)];
  }
  return out;
}

export function MockWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [revealSecret, setRevealSecret] = useState(false);

  function generate() {
    setAddress("0x" + randomHex(40));
    setRevealSecret(false);
  }

  return (
    <div className="my-6 rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="font-medium text-zinc-900">模拟钱包</p>
        <Badge tone="amber">这是模拟，不是真实钱包</Badge>
      </div>

      {!address ? (
        <Button className="mt-4" onClick={generate}>
          <RefreshCw className="h-4 w-4" />
          生成一个模拟地址
        </Button>
      ) : (
        <div className="mt-4 space-y-4">
          {/* 可以公开的信息 */}
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Badge tone="green">可以公开</Badge>
              <span className="text-sm text-green-800">地址 · 像你的公开收款编号</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="break-all rounded bg-white px-2 py-1 font-mono text-sm text-zinc-800">
                {address}
              </code>
              <button
                onClick={() => navigator.clipboard?.writeText(address)}
                className="text-green-700 hover:text-green-900"
                title="复制地址"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-xs text-green-700">
              把这个发给别人是安全的，别人只能向它转账，不能动用里面的资产。
            </p>
          </div>

          {/* 绝不能泄露的信息 */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge tone="red">绝不能泄露</Badge>
                <span className="text-sm text-red-800">助记词 · 等于资产控制权</span>
              </div>
              <button
                onClick={() => setRevealSecret((v) => !v)}
                className="flex items-center gap-1 text-xs text-red-700 hover:text-red-900"
              >
                {revealSecret ? (
                  <>
                    <EyeOff className="h-3.5 w-3.5" /> 隐藏
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5" /> 查看示例
                  </>
                )}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {SAMPLE_WORDS.map((w, i) => (
                <span
                  key={i}
                  className="rounded bg-white px-2 py-1 text-center font-mono text-xs text-zinc-800"
                >
                  {i + 1}.{" "}
                  {revealSecret ? w : "••••"}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-red-700">
              谁拿到这串词，谁就能转走全部资产。绝不能截图、发微信、存网盘、给任何「客服」。
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={generate}>
            <RefreshCw className="h-4 w-4" />
            再生成一个
          </Button>
        </div>
      )}
    </div>
  );
}
