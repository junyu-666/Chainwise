import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { GuideSteps } from "@/components/guide/guide-steps";

export const metadata: Metadata = {
  title: "发起一笔测试转账",
  description:
    "用自己的钱包在 BNB 测试网完成第一笔真实链上转账。转账前核对网络、收款地址、金额、代币和 Gas，确认无误再签名。",
};

export default function Page() {
  return (
    <StepShell stepKey="transfer">
      <p>
        现在你有了测试币，来完成第一笔<strong>真实的链上转账</strong>。
        虽然是测试网，但操作流程和主网完全一样，请认真对待每一步——这正是建立习惯的时候。
      </p>

      <h2>转给谁</h2>
      <p>
        最安全、最方便的做法是<strong>转给你自己</strong>：在 OKX 钱包里再创建一个账户（地址），
        把一小笔 tBNB 从第一个地址转到第二个地址。这样你既是付款方也是收款方，方便核对。
      </p>

      <h2>转账前的检查清单</h2>
      <Callout variant="warning" title="确认这五件事再签名">
        <p>网络：当前是 BNB 测试网，不是主网。</p>
        <p>收款地址：仔细核对，最好复制粘贴而非手输。</p>
        <p>金额：填一个小额，比如 0.001 tBNB。</p>
        <p>代币：转的是原生币 tBNB。</p>
        <p>这是一笔普通转账，不涉及任何代币授权。</p>
      </Callout>

      <h2>操作步骤</h2>
      <GuideSteps
        steps={[
          {
            title: "在 OKX 钱包点击「发送 / 转账」",
            body: <>选择 tBNB 作为要转的资产。</>,
          },
          {
            title: "粘贴收款地址，填入金额",
            body: <>收款地址用你自己的第二个地址，金额填 0.001 即可。</>,
          },
          {
            title: "核对手续费 Gas",
            body: (
              <>
                钱包会显示这笔交易的 Gas 费，同样用 <code>tBNB</code> 支付。确认余额足够。
              </>
            ),
          },
          {
            title: "确认并签名",
            body: (
              <>
                这一步就是你在「签名」课里学到的 transfer：它会改变链上资产状态。核对无误后确认。
              </>
            ),
          },
          {
            title: "复制交易哈希",
            body: (
              <>
                提交后，钱包会给出一个交易哈希（0x 开头）。<strong>把它复制下来</strong>，
                下一步要用它来确认结果。
              </>
            ),
          },
        ]}
      />

      <Callout variant="info" title="交易状态会经历几个阶段">
        <p>Pending：已提交，等待矿工打包。</p>
        <p>Success：成功上链，转账完成。</p>
        <p>Failed：失败（如 Gas 不足）。失败不可怕，看懂原因再重试即可。</p>
      </Callout>
    </StepShell>
  );
}
