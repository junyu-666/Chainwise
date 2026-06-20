import Link from "next/link";
import { ArrowRight, ShieldCheck, Wallet, Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PathOverview } from "@/components/path-overview";
import { JsonLd } from "@/components/json-ld";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "区块链钱包是什么？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "区块链钱包不是银行账户，也不是交易所账户，而是管理私钥、发起签名的工具。地址像公开收款编号可以公开，助记词和私钥才是资产控制权，绝不能泄露。",
      },
    },
    {
      "@type": "Question",
      name: "怎么确认别人说的转账是不是真的到账了？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "不看聊天截图，看交易哈希。拿交易哈希在区块浏览器查询，确认链是否正确、收款地址是不是自己、代币合约是否正确、交易状态是否为成功（Success）。",
      },
    },
    {
      "@type": "Question",
      name: "交易哈希是什么，怎么查？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "交易哈希是每笔链上交易唯一的查询编号，0x 开头。把它粘贴到区块浏览器（如 BscScan）就能查到这笔交易的状态、付款方、收款方、金额等全部细节。",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <JsonLd data={faqJsonLd} />
      {/* 第一屏 */}
      <section className="py-16 text-center sm:py-24">
        <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
          <ShieldCheck className="h-4 w-4" />
          安全上手入口 · 不讲炒币
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          给完全新手的区块链安全上手指南
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-600">
          先理解钱包、地址、签名和链上记录，再从模拟任务一步步走到 BNB 测试网真实实操。
          不讲炒币，不推荐项目，不要求导入真实助记词。
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/learn/wallet" className={buttonVariants({ size: "lg" })}>
            开始新手路径
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/safety"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            先看安全清单
          </Link>
        </div>
      </section>

      {/* 三个价值点 */}
      <section className="grid gap-4 pb-12 sm:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            title: "安全是主线",
            desc: "每一步都解释你正在授权什么、可能失去什么、应该检查什么。",
          },
          {
            icon: Wallet,
            title: "先模拟再实操",
            desc: "先在站内看懂将发生的事，再用自己的钱包在测试网真实操作。",
          },
          {
            icon: Search,
            title: "可验证",
            desc: "你不只听懂，还能自己在区块浏览器里验证每一笔记录。",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-zinc-200 bg-white p-5"
          >
            <f.icon className="h-6 w-6 text-teal-600" />
            <h3 className="mt-3 font-semibold text-zinc-900">{f.title}</h3>
            <p className="mt-1 text-sm text-zinc-600">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* 路径总览 */}
      <section className="border-t border-zinc-200 py-12">
        <PathOverview />
      </section>
    </div>
  );
}
