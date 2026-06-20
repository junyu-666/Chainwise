import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { GuideSteps } from "@/components/guide/guide-steps";
import { CopyField } from "@/components/ui/copy-field";
import { WalletStatus } from "@/components/wallet/wallet-status";
import { BNB_TESTNET } from "@/lib/chain";

export const metadata: Metadata = {
  title: "连接钱包并切换到 BNB 测试网",
  description:
    "用手机扫码把 OKX 钱包连接到 Chainwise，再一键切换到 BNB 测试网。全程在测试网操作，不涉及任何真实资产。",
};

export default function Page() {
  return (
    <StepShell stepKey="add-testnet">
      <p>
        钱包创建好了，现在把它<strong>连接到本网站</strong>，之后领币、转账、合约交互都能在网站里一键完成，网站会自动帮你确认每一步是否成功。
      </p>

      <Callout variant="tip" title="不用安装任何浏览器插件">
        我们用「手机扫码」连接：电脑上会显示一个二维码，你用手机 OKX
        App 扫一下就连上了。就像微信扫码登录网站一样。
      </Callout>

      {/* 实时状态：未连接时这里就是连接入口 */}
      <WalletStatus />

      <h2>手机扫码连接（推荐给新手）</h2>
      <GuideSteps
        steps={[
          {
            title: "点击上方的「连接钱包」",
            body: <>电脑屏幕上会弹出一个二维码窗口。</>,
          },
          {
            title: "打开手机里的 OKX App",
            body: (
              <>
                找到 App 里的「扫一扫」功能（通常在首页顶部，或钱包页右上角的扫码图标）。
              </>
            ),
          },
          {
            title: "扫描电脑上的二维码",
            body: <>对准电脑屏幕上的二维码扫描。</>,
          },
          {
            title: "在手机上点「连接 / 批准」",
            body: (
              <>
                手机会弹出确认，问你是否允许 Chainwise 连接你的钱包。这一步只是
                <strong>读取你的地址</strong>，不会动用任何资产，放心确认。
              </>
            ),
          },
          {
            title: "回到电脑，看到地址即成功",
            body: <>上方的状态卡会变成「钱包已连接」，并显示你的地址。</>,
          },
        ]}
      />

      <Callout variant="info" title="如果你电脑上装了 OKX 浏览器插件">
        也可以在「连接钱包」弹窗里直接选 OKX，插件会弹窗让你确认，无需扫码。
      </Callout>

      <h2>切换到 BNB 测试网</h2>
      <p>
        连接后，如果上方状态卡提示「不是测试网」，点那颗
        <strong>「一键切换到 BNB 测试网」</strong>按钮即可。手机或插件会弹窗，
        让你确认添加/切换网络——点确认就好。
      </p>

      <Callout variant="success" title="为什么必须在测试网">
        测试网是专门用来练手的链，上面的币没有真实价值，转错了也没有任何损失。
        所有操作和主网一模一样，是新手最安全的环境。
      </Callout>

      <details className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <summary className="cursor-pointer text-sm font-medium text-zinc-700">
          手动添加网络的参数（一般用不到，仅备用）
        </summary>
        <div className="mt-3">
          <CopyField label="网络名称" value={BNB_TESTNET.name} />
          <CopyField label="RPC URL" value={BNB_TESTNET.rpcUrl} />
          <CopyField label="链 ID" value={String(BNB_TESTNET.chainId)} />
          <CopyField label="货币符号" value={BNB_TESTNET.currency} />
          <CopyField label="区块浏览器" value={BNB_TESTNET.explorer} />
        </div>
      </details>
    </StepShell>
  );
}
