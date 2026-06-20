import * as React from "react";
import {
  AlertTriangle,
  Info,
  Lightbulb,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "info" | "warning" | "danger" | "success" | "tip";

const styles: Record<
  Variant,
  { wrap: string; icon: React.ComponentType<{ className?: string }> }
> = {
  info: { wrap: "border-sky-200 bg-sky-50 text-sky-900", icon: Info },
  warning: {
    wrap: "border-amber-200 bg-amber-50 text-amber-900",
    icon: AlertTriangle,
  },
  danger: {
    wrap: "border-red-200 bg-red-50 text-red-900",
    icon: ShieldAlert,
  },
  success: {
    wrap: "border-green-200 bg-green-50 text-green-900",
    icon: CheckCircle2,
  },
  tip: {
    wrap: "border-teal-200 bg-teal-50 text-teal-900",
    icon: Lightbulb,
  },
};

export function Callout({
  variant = "info",
  title,
  children,
  className,
}: {
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { wrap, icon: Icon } = styles[variant];
  return (
    <div className={cn("my-4 flex gap-3 rounded-lg border p-4", wrap, className)}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="text-sm leading-6">
        {title && <p className="mb-1 font-semibold">{title}</p>}
        <div className="[&_p]:my-1">{children}</div>
      </div>
    </div>
  );
}
