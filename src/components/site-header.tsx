import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { ConnectButton } from "@/components/wallet/connect-button";

const NAV = [
  { label: "新手路径", href: "/#path" },
  { label: "安全中心", href: "/safety" },
  { label: "术语表", href: "/glossary" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="h-5 w-5 text-teal-600" />
          <span>Chainwise</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 text-sm sm:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ConnectButton size="sm" />
        </div>
      </div>
    </header>
  );
}
