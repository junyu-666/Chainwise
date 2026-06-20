import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "teal" | "amber" | "red" | "green";

const tones: Record<Tone, string> = {
  neutral: "bg-zinc-100 text-zinc-700",
  teal: "bg-teal-100 text-teal-800",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-800",
  green: "bg-green-100 text-green-800",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
