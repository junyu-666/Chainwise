"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

/**
 * 多选判断题。每个选项独立标注是否应被选中，
 * 提交后逐项显示对错并给出整体解释。
 */
export function Quiz({
  question,
  options,
  explanation,
}: {
  question: string;
  options: QuizOption[];
  explanation: string;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  function toggle(id: string) {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const allCorrect =
    submitted &&
    options.every((o) => o.correct === selected.has(o.id));

  return (
    <div className="my-6 rounded-xl border border-zinc-200 bg-white p-5">
      <p className="font-medium text-zinc-900">{question}</p>
      <ul className="mt-4 space-y-2">
        {options.map((o) => {
          const chosen = selected.has(o.id);
          const showState = submitted;
          const isRightChoice = o.correct === chosen;
          return (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => toggle(o.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                  !showState && chosen && "border-teal-400 bg-teal-50",
                  !showState && !chosen && "border-zinc-200 hover:bg-zinc-50",
                  showState &&
                    isRightChoice &&
                    "border-green-300 bg-green-50 text-green-900",
                  showState &&
                    !isRightChoice &&
                    "border-red-300 bg-red-50 text-red-900",
                )}
              >
                <span>{o.text}</span>
                {showState &&
                  (isRightChoice ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  ))}
              </button>
            </li>
          );
        })}
      </ul>

      {!submitted ? (
        <Button
          className="mt-4"
          variant="outline"
          size="sm"
          onClick={() => setSubmitted(true)}
        >
          提交答案
        </Button>
      ) : (
        <div className="mt-4 rounded-lg bg-zinc-50 p-3 text-sm">
          <p className={cn("font-medium", allCorrect ? "text-green-700" : "text-amber-700")}>
            {allCorrect ? "全部正确" : "再看看标红的选项"}
          </p>
          <p className="mt-1 text-zinc-600">{explanation}</p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setSelected(new Set());
            }}
            className="mt-2 text-xs text-zinc-400 underline hover:text-zinc-600"
          >
            重做
          </button>
        </div>
      )}
    </div>
  );
}
