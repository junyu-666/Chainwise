import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { MockExplorer } from "@/components/simulation/mock-explorer";
import { Quiz } from "@/components/quiz";

export const metadata: Metadata = {
  title: "地址与交易哈希",
  description:
    "地址是公开收款编号，交易哈希是一笔链上操作的查询编号。链不同，地址格式可能相同但资产不互通。转账以链上记录为准，不是截图。",
};

const SAMPLE_TX = {
  hash: "0x5b1f...c2a9（示例）",
  status: "success" as const,
  from: "0x8a3e...91f2",
  to: "0x1c77...db40",
  value: "0.05",
  token: "tBNB",
  gasUsed: "21,000",
  block: 38_271_004,
  confirmations: 128,
  timestamp: "2026-06-18 14:22:05 UTC",
};

export default function Page() {
  return (
    <StepShell stepKey="address-and-tx">
      <p>
        链上的每一笔操作都会留下一条公开记录。读懂它只需要两个最小单位：
        <strong>地址</strong>和<strong>交易哈希</strong>。
      </p>

      <h2>地址：公开的收款编号</h2>
      <p>
        地址是一串 0x 开头的字符，像一个公开的收款编号。别人凭它给你转账，也凭它在浏览器里查你的公开记录。
      </p>
      <Callout variant="warning" title="同样格式，不同的链">
        以太坊、BNB 链等都用 0x 地址，格式一样，但它们是不同的网络。
        同一个地址在不同链上的资产互不相通——发错链，资产可能就找不回来了。
      </Callout>

      <h2>交易哈希：一笔操作的查询编号</h2>
      <p>
        每发起一笔交易，链上就生成一个唯一的「交易哈希」（Transaction Hash）。
        拿着它就能在区块浏览器里查到这笔交易的全部细节。
      </p>

      <h2>看一笔交易长什么样</h2>
      <p>下面是一笔模拟交易在区块浏览器里的简化样子：</p>
      <MockExplorer tx={SAMPLE_TX} />

      <Callout variant="tip" title="关键观念">
        转账到底成没成功，<strong>以链上记录为准，不是以聊天截图为准</strong>。
        截图可以伪造，链上的交易哈希不能。
      </Callout>

      <Quiz
        question="关于地址和交易哈希，哪些说法是对的？"
        options={[
          { id: "a", text: "地址可以公开发给别人收款", correct: true },
          { id: "b", text: "交易哈希可以用来在浏览器查这笔交易", correct: true },
          { id: "c", text: "同一个地址在所有链上的资产都是相通的", correct: false },
          { id: "d", text: "对方发我一张转账截图，就说明钱一定到账了", correct: false },
        ]}
        explanation="地址和交易哈希都是公开可查的。但不同链资产不互通，且到账要看链上记录而非截图。"
      />
    </StepShell>
  );
}
