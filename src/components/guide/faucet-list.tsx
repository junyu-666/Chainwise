import { ExternalLink, AlertCircle } from "lucide-react";
import { FAUCETS, type FaucetBarrier } from "@/lib/chain";

const BARRIER_LABEL: Record<FaucetBarrier, string | null> = {
  none: null,
  "mainnet-bnb": "需主网 BNB",
  "mainnet-eth": "需主网 ETH",
};

/** 按零门槛 / 有门槛分组展示水龙头入口。 */
export function FaucetList() {
  const free = FAUCETS.filter((f) => f.barrier === "none");
  const gated = FAUCETS.filter((f) => f.barrier !== "none");

  return (
    <div className="my-6 space-y-6">
      {/* 零门槛（优先推荐） */}
      <div>
        <p className="mb-2 text-sm font-semibold text-teal-700">
          零门槛（推荐新手）
        </p>
        <div className="space-y-3">
          {free.map((f) => (
            <a
              key={f.url}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-teal-200 bg-teal-50/40 p-4 transition-colors hover:border-teal-400 hover:bg-teal-50"
            >
              <div>
                <p className="flex items-center gap-2 font-medium text-zinc-900">
                  <span className="rounded bg-teal-100 px-1.5 py-0.5 text-xs text-teal-700">
                    推荐
                  </span>
                  {f.name}
                </p>
                <p className="mt-0.5 text-sm text-zinc-500">{f.note}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-zinc-400" />
            </a>
          ))}
        </div>
      </div>

      {/* 有门槛（有主网余额时可用） */}
      {gated.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-zinc-500">
            <AlertCircle className="h-3.5 w-3.5" />
            需要主网余额（已有主网币时可用，金额更多）
          </p>
          <div className="space-y-3">
            {gated.map((f) => (
              <a
                key={f.url}
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300"
              >
                <div>
                  <p className="flex items-center gap-2 font-medium text-zinc-700">
                    <span className="rounded bg-orange-100 px-1.5 py-0.5 text-xs text-orange-700">
                      {BARRIER_LABEL[f.barrier]}
                    </span>
                    {f.name}
                  </p>
                  <p className="mt-0.5 text-sm text-zinc-400">{f.note}</p>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-zinc-300" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
