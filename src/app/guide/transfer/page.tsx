import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { WalletStatus } from "@/components/wallet/wallet-status";
import { TransferAction } from "@/components/wallet/transfer-action";

export const metadata: Metadata = {
  title: "发起一笔测试转账",
  description:
    "在 Chainwise 站内一键发起你的第一笔真实链上转账：填金额、点发送、钱包确认，网站自动追踪从 Pending 到 Success 的全过程。",
};

export default function Page() {
  return (
    <StepShell stepKey="transfer">
      <p>
        现在你有了测试币，来完成第一笔<strong>真实的链上转账</strong>。
        虽然是测试网，但操作流程和主网完全一样，请认真对待每一步——这正是建立好习惯的时候。
      </p>

      <WalletStatus />

      <h2>转给谁</h2>
      <p>
        最简单的做法是<strong>转给你自己</strong>：下面的金额保持默认的一小笔，
        收款地址点「转给我自己」自动填入。这样你既是付款方也是收款方，方便核对。
      </p>

      <h2>转账前看清这几件事</h2>
      <Callout variant="warning" title="点发送前确认">
        <p>网络是 BNB 测试网（上方状态卡是绿色的）。</p>
        <p>金额是一小笔测试币，比如 0.001 tBNB。</p>
        <p>这是一笔普通转账，不涉及任何代币授权。</p>
      </Callout>

      {/* 站内一键转账 */}
      <TransferAction />

      <Callout variant="info" title="点「发起转账」后会发生什么">
        <p>1. 你的钱包（手机 App 或插件）会弹窗，让你确认这笔交易并支付 Gas。</p>
        <p>2. 确认后，网站显示 Pending（等待打包）。</p>
        <p>3. 几秒后变成 Success——这笔转账就真实地写进区块链了。</p>
      </Callout>

      <Callout variant="tip" title="这一步就是「签名」课里的 transfer">
        钱包弹窗让你确认的，正是一笔会改变链上资产状态的交易。
        和那些只是「证明身份」的签名不同，它会真正动你的（测试）币。
      </Callout>
    </StepShell>
  );
}
