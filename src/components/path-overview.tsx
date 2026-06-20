"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { LEARN_STEPS, GUIDE_STEPS, REVIEW_STEP } from "@/lib/steps";
import { useProgress } from "@/hooks/use-progress";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { title: "第一部分 · 理解概念（无需钱包）", steps: LEARN_STEPS },
  { title: "第二部分 · 真实实操（使用测试网）", steps: GUIDE_STEPS },
  { title: "第三部分 · 复盘", steps: [REVIEW_STEP] },
];

export function PathOverview() {
  const { isDone, completed, loaded } = useProgress();
  const total = LEARN_STEPS.length + GUIDE_STEPS.length + 1;
  const doneCount = loaded ? completed.length : 0;

  return (
    <div id="path" className="scroll-mt-20">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">完整学习路径</h2>
        <span className="text-sm text-zinc-500">
          已完成 {doneCount} / {total}
        </span>
      </div>

      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="mb-2 text-sm font-medium text-zinc-500">
              {section.title}
            </p>
            <ol className="space-y-2">
              {section.steps.map((step) => {
                const done = loaded && isDone(step.key);
                return (
                  <li key={step.key}>
                    <Link
                      href={step.href}
                      className={cn(
                        "flex items-start gap-3 rounded-lg border p-3 transition-colors",
                        done
                          ? "border-green-200 bg-green-50/50"
                          : "border-zinc-200 bg-white hover:border-teal-300 hover:bg-teal-50/40",
                      )}
                    >
                      {done ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      ) : (
                        <Circle className="mt-0.5 h-5 w-5 shrink-0 text-zinc-300" />
                      )}
                      <span>
                        <span className="block font-medium text-zinc-900">
                          {step.title}
                        </span>
                        <span className="block text-sm text-zinc-500">
                          {step.summary}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
