import type { Metadata } from "next";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "术语表",
  description:
    "区块链新手常见术语解释：地址、私钥、助记词、Gas、交易哈希、区块、确认数、签名、授权、测试网、水龙头、智能合约等，用生活化语言说清楚。",
};

const TERMS: { term: string; en?: string; def: string }[] = [
  { term: "地址", en: "Address", def: "0x 开头的一串字符，像公开的收款编号。别人凭它给你转账或查你的公开记录。" },
  { term: "私钥", en: "Private Key", def: "控制一个地址的密钥。谁拥有它，谁就能动用该地址的资产。绝不能泄露。" },
  { term: "助记词", en: "Seed Phrase", def: "一组（通常 12 或 24 个）单词，是钱包的「根」。用它能在任何设备恢复整个钱包，等于全部控制权。" },
  { term: "Gas", def: "在链上做操作要支付的手续费，用该链的原生币支付（如 BNB 链上是 BNB / tBNB）。" },
  { term: "交易哈希", en: "Transaction Hash", def: "每笔交易唯一的查询编号，0x 开头。拿着它能在区块浏览器查到这笔交易的全部细节。" },
  { term: "区块", en: "Block", def: "区块链按「区块」打包交易。一笔交易被打包进某个区块，就算上链了。" },
  { term: "确认数", en: "Confirmations", def: "一笔交易之后又叠加了多少个区块。确认数越多，交易越不可能被回滚。" },
  { term: "签名", en: "Signature", def: "用私钥对某个操作的授权。有的签名只是证明身份，有的会授权别人动用资产，含义差别很大。" },
  { term: "授权", en: "Approve / Permit", def: "允许某个合约动用你的某种代币。是很多盗币骗局的入口，要谨慎对待。" },
  { term: "区块浏览器", en: "Block Explorer", def: "查询链上公开记录的网站，如 BscScan。可以查地址、交易、合约等。" },
  { term: "测试网", en: "Testnet", def: "专门用于测试和练手的区块链网络，上面的币没有真实价值，是新手最安全的练习环境。" },
  { term: "水龙头", en: "Faucet", def: "免费发放测试币的网站，通常只需填写你的钱包地址。" },
  { term: "智能合约", en: "Smart Contract", def: "部署在链上、谁都能调用的一段程序。它能实现转账之外的复杂逻辑，且公开透明、不可篡改。" },
  { term: "主网 / 测试网", def: "主网（Mainnet）上的资产有真实价值；测试网（Testnet）用于演练。本指南全程只用测试网。" },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-2 flex items-center gap-2 text-teal-600">
        <BookOpen className="h-5 w-5" />
        <span className="text-sm font-medium">术语表</span>
      </div>
      <h1 className="mb-4 text-2xl font-bold text-zinc-900">区块链术语表</h1>
      <p className="mb-6 text-zinc-600">
        用尽量生活化的语言解释新手最常遇到的术语。看不懂某个词时，回到这里查一查。
      </p>

      <dl className="space-y-4">
        {TERMS.map((t) => (
          <div
            key={t.term}
            className="rounded-xl border border-zinc-200 bg-white p-4"
          >
            <dt className="font-semibold text-zinc-900">
              {t.term}
              {t.en && (
                <span className="ml-2 font-mono text-xs font-normal text-zinc-400">
                  {t.en}
                </span>
              )}
            </dt>
            <dd className="mt-1 text-sm text-zinc-600">{t.def}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
