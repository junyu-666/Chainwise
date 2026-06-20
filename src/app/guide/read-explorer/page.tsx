import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { TxLookup } from "@/components/guide/tx-lookup";
import { Quiz } from "@/components/quiz";

export const metadata: Metadata = {
  title: "用区块浏览器确认结果",
  description:
    "把刚才的交易哈希粘进 BscScan 或站内查询，确认 Status、From、To、Value 是否符合预期，独立判断这笔转账是否成功。",
};

export default function Page() {
  return (
    <StepShell stepKey="read-explorer">
      <p>
        转账提交后，到底成没成功？现在用「查询」课里学的方法，拿交易哈希来亲手验证。
      </p>

      <h2>方法一：站内查询</h2>
      <p>把你刚才复制的交易哈希粘进下面，直接读取 BNB 测试网上的真实状态：</p>
      <TxLookup />

      <h2>方法二：在 BscScan 上查看</h2>
      <p>
        站内查询的链接会带你到 BscScan 测试网浏览器（testnet.bscscan.com）。
        这是行业里通用的工具，建议你也熟悉它的原始界面。
      </p>

      <h2>你需要逐一核对的字段</h2>
      <Callout variant="tip" title="对照检查">
        <p>Status：是不是 Success？</p>
        <p>From：是不是你的付款地址？</p>
        <p>To：是不是你想转入的收款地址？</p>
        <p>Value：金额和代币对得上吗？</p>
        <p>Transaction Hash：和钱包里给你的那串一致吗？</p>
      </Callout>

      <Quiz
        question="查到这笔交易后，凭什么判断「转账真的成功了」？"
        options={[
          { id: "a", text: "Status 显示 Success", correct: true },
          { id: "b", text: "From / To / Value 都和我的操作一致", correct: true },
          { id: "c", text: "钱包余额相应发生了变化", correct: true },
          { id: "d", text: "我自己截了一张图", correct: false },
        ]}
        explanation="判断到账靠的是链上的状态和字段，以及余额变化。截图永远不是依据——哪怕是你自己截的。"
      />
    </StepShell>
  );
}
