import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { MockExplorer } from "@/components/simulation/mock-explorer";
import { Quiz } from "@/components/quiz";

export const metadata: Metadata = {
  title: "查询链上转账是否到账",
  description:
    "别人说转了钱，怎么确认？不看聊天截图，看交易哈希。确认链、收款地址、代币合约、交易状态四件事，就能独立判断是否真的到账。",
};

const SAMPLE_TX = {
  hash: "0x9d2c...77ab（示例）",
  status: "success" as const,
  from: "0x4411...a0c1",
  to: "0x8a3e...91f2",
  value: "120.00",
  token: "USDT",
  gasUsed: "51,300",
  block: 38_271_559,
  confirmations: 64,
  timestamp: "2026-06-18 15:04:41 UTC",
};

export default function Page() {
  return (
    <StepShell stepKey="explorer">
      <p>
        现实里最常见的问题是：<em>「对方说已经给我转了，我怎么确认这是真的？」</em>
        答案很简单——不看截图，去区块浏览器查交易哈希。
      </p>

      <h2>要确认的四件事</h2>
      <ul>
        <li>
          <strong>链是否正确</strong>：这笔交易在不在你期望的网络上。
        </li>
        <li>
          <strong>收款地址是否是你</strong>：To 必须是你自己的地址。
        </li>
        <li>
          <strong>代币是否正确</strong>：同名假币很多，要看合约而非名字。
        </li>
        <li>
          <strong>状态是否成功</strong>：只有 Success 才算到账。
        </li>
      </ul>

      <h2>在这笔交易里找到到账证据</h2>
      <p>下面这笔模拟交易，高亮的就是你需要逐一核对的字段：</p>
      <MockExplorer tx={SAMPLE_TX} highlightFields={["status", "to", "value"]} />

      <Callout variant="tip" title="实操预告">
        在后面的「真实实操」部分，你会用自己的钱包发起一笔真实测试转账，
        再用 BscScan 亲手完成这套核对。现在先把要看的字段记住。
      </Callout>

      <Quiz
        question="要确认一笔转账真的到了你的账上，应该核对什么？"
        options={[
          { id: "a", text: "交易状态是 Success", correct: true },
          { id: "b", text: "To 是我自己的地址", correct: true },
          { id: "c", text: "代币和金额对得上", correct: true },
          { id: "d", text: "对方发来的转账截图很清晰", correct: false },
        ]}
        explanation="状态、收款地址、代币金额都要在链上核对。截图无论多清晰都不能作为到账依据。"
      />
    </StepShell>
  );
}
