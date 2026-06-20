import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = {
  title: "安全中心：常见骗局与防范",
  description:
    "区块链最常见的骗局：假空投、假客服、授权盗币、剪贴板木马、假充值截图、同名假币、错链转账。逐个讲清骗术原理和防范方法。",
};

const PRINCIPLES = [
  "任何人向你索要助记词或私钥，都是骗局，没有例外。",
  "授权（approve / permit）不是登录，它可能让别人转走你的资产。",
  "真实转账前，先确认链、收款地址、代币合约和金额。",
  "到账与否以链上记录为准，不看任何聊天截图。",
];

const SCAMS = [
  {
    name: "假空投",
    how: "用「免费领币」吸引你连接钱包，再诱导你签一个授权，把你的代币转走。",
    guard: "对陌生空投保持警惕；连接钱包后若要求 approve / permit，先停下来看清。",
  },
  {
    name: "假客服",
    how: "冒充官方客服，说你账户异常，要你提供助记词、私钥或装远程控制软件。",
    guard: "去中心化钱包没有能操作你账户的客服。任何索要助记词的「客服」都是骗子。",
  },
  {
    name: "授权盗币",
    how: "诱导你对一个恶意合约 approve 或 permit，之后随时把你授权的代币转走。",
    guard: "只对可信合约授权，额度尽量限定；定期检查并撤销不再需要的授权。",
  },
  {
    name: "剪贴板木马",
    how: "恶意软件监控剪贴板，你复制的收款地址被悄悄替换成攻击者的地址。",
    guard: "粘贴地址后，逐字核对开头和结尾几位；大额操作先小额测试。",
  },
  {
    name: "假充值截图",
    how: "对方发来一张「已转账」的截图冒充到账，催你发货或回款。",
    guard: "不认截图，只认链上交易哈希和 Success 状态。",
  },
  {
    name: "同名假币",
    how: "发行一个和知名代币同名的假币，名字一样但合约地址不同，骗你交易。",
    guard: "认合约地址，不认名字。从官方渠道核对正确的合约地址。",
  },
  {
    name: "错链转账",
    how: "把资产发到了错误的网络，或发到一个该链不支持的地址，导致资产找不回。",
    guard: "转账前确认发送方和接收方在同一条链；交易所充提币时核对网络选项。",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-2 flex items-center gap-2 text-teal-600">
        <ShieldAlert className="h-5 w-5" />
        <span className="text-sm font-medium">安全中心</span>
      </div>
      <h1 className="mb-4 text-2xl font-bold text-zinc-900">
        常见骗局与防范
      </h1>
      <p className="text-zinc-600">
        安全不是附录，而是主线。下面先是四条贯穿始终的底线，再逐个拆解最常见的骗局。
      </p>

      <Callout variant="danger" title="四条安全底线">
        <ul className="ml-4 list-disc space-y-1">
          {PRINCIPLES.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </Callout>

      <h2 className="mt-10 mb-4 text-xl font-semibold text-zinc-900">
        七种常见骗局
      </h2>
      <div className="space-y-4">
        {SCAMS.map((s) => (
          <div
            key={s.name}
            className="rounded-xl border border-zinc-200 bg-white p-5"
          >
            <h3 className="font-semibold text-zinc-900">{s.name}</h3>
            <p className="mt-2 text-sm text-zinc-600">
              <span className="font-medium text-red-700">怎么骗：</span>
              {s.how}
            </p>
            <p className="mt-1.5 text-sm text-zinc-600">
              <span className="font-medium text-green-700">怎么防：</span>
              {s.guard}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
