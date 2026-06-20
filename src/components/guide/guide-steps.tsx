import * as React from "react";

export interface GuideStep {
  title: string;
  body: React.ReactNode;
}

/** 编号步骤列表，用于实操引导页。 */
export function GuideSteps({ steps }: { steps: GuideStep[] }) {
  return (
    <ol className="my-6 space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-semibold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="font-medium text-zinc-900">{step.title}</p>
            <div className="mt-1 text-sm leading-6 text-zinc-600 [&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px]">
              {step.body}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
