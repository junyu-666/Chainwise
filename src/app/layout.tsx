import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { Web3Provider } from "@/components/web3-provider";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Chainwise · 给完全新手的区块链安全上手指南",
    template: "%s · Chainwise",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "区块链是什么",
    "钱包是什么",
    "助记词安全",
    "交易哈希怎么查",
    "USDT 到账确认",
    "测试网",
  ],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Chainwise · 给完全新手的区块链安全上手指南",
    description: SITE_DESCRIPTION,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "zh-CN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col">
        <JsonLd data={websiteJsonLd} />
        <Web3Provider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Web3Provider>
        <Analytics />
      </body>
    </html>
  );
}
