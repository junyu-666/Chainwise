"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** 展示一个值并提供复制按钮，用于地址、网络参数等。 */
export function CopyField({
  label,
  value,
}: {
  label?: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="my-2">
      {label && <p className="mb-1 text-xs text-zinc-500">{label}</p>}
      <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2">
        <code className="flex-1 break-all font-mono text-sm text-zinc-800">
          {value}
        </code>
        <button
          onClick={copy}
          className="shrink-0 text-zinc-400 hover:text-zinc-700"
          title="复制"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
