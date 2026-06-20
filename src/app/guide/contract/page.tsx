import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { CopyField } from "@/components/ui/copy-field";
import { WalletStatus } from "@/components/wallet/wallet-status";
import { ContractInteraction } from "@/components/wallet/contract-interaction";
import { DEMO_CONTRACT_ADDRESS, explorerAddressUrl } from "@/lib/chain";

export const metadata: Metadata = {
  title: "与智能合约交互",
  description:
    "在 Chainwise 站内一键调用留言板合约，把一句话永久写到区块链上，再实时看到它出现在链上留言墙里——亲手完成一次真正的智能合约交互。",
};

export default function Page() {
  const configured = DEMO_CONTRACT_ADDRESS !== "";

  return (
    <StepShell stepKey="contract">
      <p>
        转账是「把币从 A 转到 B」。而<strong>智能合约</strong>能做的更多——它是一段部署在链上、
        谁都能调用的程序。这一步，你将调用一个「留言板」合约，把一句话永久写到区块链上。
      </p>

      <Callout variant="info" title="这一步你会真正体会到">
        你写的一句话会变成一笔交易，被打包进区块，任何人都能查到，而且
        <strong>无法被删除或篡改</strong>。这就是「上链」。
      </Callout>

      <WalletStatus />

      <h2>写一句话到链上</h2>
      <p>
        在下面的框里写一句话，点「写到链上」，钱包会弹窗让你确认（这是一笔会花
        Gas 的交易）。确认后等几秒，你的留言就会出现在下方的留言墙里。
      </p>

      {/* 站内一键调 post() + 留言墙 */}
      <ContractInteraction />

      {configured && (
        <>
          <h2>合约信息</h2>
          <p>这是本留言板合约的地址，你也可以在区块浏览器查看它的源码和全部交易：</p>
          <CopyField label="合约地址" value={DEMO_CONTRACT_ADDRESS} />
          <a
            href={explorerAddressUrl(DEMO_CONTRACT_ADDRESS)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-teal-700 hover:underline"
          >
            在 BscScan 上查看合约
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </>
      )}

      <Callout variant="success" title="你做到了">
        从创建钱包、领币、转账到调用合约，区块链最核心的几个动作，你都亲手走过一遍了。
        去最后一页复盘一下你掌握的能力吧。
      </Callout>
    </StepShell>
  );
}
