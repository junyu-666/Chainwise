"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ALL_STEPS, getStepIndex } from "@/lib/steps";
import { useProgress } from "@/hooks/use-progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const GROUP_LABEL: Record<string, string> = {
  learn: "理解概念",
  guide: "真实实操",
  review: "复盘",
};

export function StepShell({
  stepKey,
  children,
}: {
  stepKey: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isDone, markDone, loaded } = useProgress();
  const idx = getStepIndex(stepKey);
  const step = ALL_STEPS[idx];
  const prev = idx > 0 ? ALL_STEPS[idx - 1] : undefined;
  const next = idx < ALL_STEPS.length - 1 ? ALL_STEPS[idx + 1] : undefined;
  const done = loaded && isDone(stepKey);

  if (!step) return null;

  function handleContinue() {
    markDone(stepKey);
    if (next) router.push(next.href);
  }

  return (
    <article className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
        <Badge tone="teal">{GROUP_LABEL[step.group]}</Badge>
        <span>
          第 {idx + 1} / {ALL_STEPS.length} 步
        </span>
      </div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">{step.title}</h1>

      <div className="prose-cw">{children}</div>

      <div className="mt-10 flex items-center justify-between border-t border-zinc-200 pt-6">
        {prev ? (
          <Link
            href={prev.href}
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900"
          >
            <ArrowLeft className="h-4 w-4" />
            上一步
          </Link>
        ) : (
          <span />
        )}

        <Button onClick={handleContinue}>
          {done ? <Check className="h-4 w-4" /> : null}
          {next ? "学会了，下一步" : "完成学习"}
          {next ? <ArrowRight className="h-4 w-4" /> : null}
        </Button>
      </div>
    </article>
  );
}
