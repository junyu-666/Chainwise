import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { GuideSteps } from "@/components/guide/guide-steps";
import { CopyField } from "@/components/ui/copy-field";
import { GuestbookFeed } from "@/components/guide/guestbook-feed";
import { DEMO_CONTRACT_ADDRESS, explorerAddressUrl } from "@/lib/chain";

export const metadata: Metadata = {
  title: "与智能合约交互",
  description:
    "向链上留言板写一句话，永久记录在区块链上。通过 BscScan 的 Write Contract 调用合约的 post 方法，亲手完成一次真正的合约交互。",
};

export default function Page() {
  const configured = DEMO_CONTRACT_ADDRESS !== "";
  const writeUrl = configured
    ? `${explorerAddressUrl(DEMO_CONTRACT_ADDRESS)}#writeContract`
    : null;

  return (
    <StepShell stepKey="contract">
      <p>
        转账是「把币从 A 转到 B」。而<strong>智能合约</strong>能做的更多——它是一段部署在链上、
        谁都能调用的程序。这一步，你将调用一个「留言板」合约，把一句话永久写到区块链上。
      </p>

      <Callout variant="info" title="这一步你会真正体会到">
        合约不是抽象概念。你写的一句话会变成一笔交易，被打包进区块，任何人都能查到，
        而且<strong>无法被删除或篡改</strong>。这就是「上链」。
      </Callout>

      <h2>演示合约</h2>
      {configured ? (
        <>
          <p>下面是 Chainwise 部署在 BNB 测试网上的留言板合约地址：</p>
          <CopyField label="合约地址" value={DEMO_CONTRACT_ADDRESS} />
        </>
      ) : (
        <Callout variant="warning" title="合约待部署">
          管理员尚未配置演示合约地址。部署方法见项目内 <code>contracts/README.md</code>，
          填入 <code>NEXT_PUBLIC_DEMO_CONTRACT_ADDRESS</code> 后本页将自动启用。
        </Callout>
      )}

      <h2>操作步骤</h2>
      <GuideSteps
        steps={[
          {
            title: "打开合约的 BscScan 页面",
            body: writeUrl ? (
              <a
                href={writeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-teal-700 hover:underline"
              >
                进入 Write Contract 页面
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <>合约部署后，这里会出现直达 Write Contract 的链接。</>
            ),
          },
          {
            title: "连接你的钱包",
            body: (
              <>
                点击 “Connect to Web3”，用 OKX 钱包连接。确认网络是 BNB 测试网。
                这一步是 message signing，只证明地址是你的，不会动用资产。
              </>
            ),
          },
          {
            title: "找到 post 方法，输入一句话",
            body: (
              <>
                在方法列表里找到 <code>post</code>，在 content 输入框里写下你想留在链上的话（1-280 字）。
              </>
            ),
          },
          {
            title: "点击 Write 并确认",
            body: (
              <>
                钱包会弹出确认——这是一笔<strong>会改变链上状态</strong>的交易，需要用 tBNB 付 Gas。
                核对后确认。
              </>
            ),
          },
          {
            title: "等待上链，刷新留言墙",
            body: <>交易成功后，回到本页刷新下面的留言墙，就能看到你刚写的那句话。</>,
          },
        ]}
      />

      <GuestbookFeed />

      <Callout variant="success" title="你做到了">
        你刚刚完成了一次真正的智能合约交互。从创建钱包、领币、转账到调用合约，
        区块链最核心的几个动作，你都亲手走过一遍了。
      </Callout>
    </StepShell>
  );
}
