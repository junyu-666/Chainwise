import { ExternalLink } from "lucide-react";
import { FAUCETS } from "@/lib/chain";

/** 列出零门槛水龙头入口，按优先级排列。 */
export function FaucetList() {
  return (
    <div className="my-6 space-y-3">
      {FAUCETS.map((f, i) => (
        <a
          key={f.url}
          href={f.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-teal-300 hover:bg-teal-50/40"
        >
          <div>
            <p className="flex items-center gap-2 font-medium text-zinc-900">
              {i === 0 && (
                <span className="rounded bg-teal-100 px-1.5 py-0.5 text-xs text-teal-700">
                  推荐
                </span>
              )}
              {f.name}
            </p>
            <p className="mt-0.5 text-sm text-zinc-500">{f.note}</p>
          </div>
          <ExternalLink className="h-4 w-4 shrink-0 text-zinc-400" />
        </a>
      ))}
    </div>
  );
}
