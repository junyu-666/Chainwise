import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { GuideSteps } from "@/components/guide/guide-steps";
import { CopyField } from "@/components/ui/copy-field";
import { BNB_TESTNET } from "@/lib/chain";

export const metadata: Metadata = {
  title: "添加 BNB 测试网",
  description:
    "把钱包切换到 BNB Smart Chain Testnet。测试网用于学习和演练，全程不涉及任何真实资产，是最安全的练手环境。",
};

export default function Page() {
  return (
    <StepShell stepKey="add-testnet">
      <p>
        我们全程在<strong>测试网</strong>操作。测试网是一条专门用来练手的链，上面的币没有真实价值，
        转错了也不会有任何损失——这正是新手最该待的地方。
      </p>

      <Callout variant="success" title="为什么用测试网">
        所有操作（转账、合约交互、查记录）都和主网一模一样，但不碰真实资产。
        先在这里把每个动作走通，建立肌肉记忆。
      </Callout>

      <h2>添加网络</h2>
      <p>
        OKX 钱包通常已内置 BNB 测试网，在网络列表里搜索 “BNB ... Testnet” 即可切换。
        如果需要手动添加，用下面这组参数：
      </p>

      <CopyField label="网络名称" value={BNB_TESTNET.name} />
      <CopyField label="RPC URL" value={BNB_TESTNET.rpcUrl} />
      <CopyField label="链 ID（Chain ID）" value={String(BNB_TESTNET.chainId)} />
      <CopyField label="货币符号" value={BNB_TESTNET.currency} />
      <CopyField label="区块浏览器" value={BNB_TESTNET.explorer} />

      <GuideSteps
        steps={[
          {
            title: "打开网络切换菜单",
            body: <>在 OKX 钱包首页顶部找到网络名称，点开网络列表。</>,
          },
          {
            title: "选择或添加 BNB 测试网",
            body: (
              <>
                搜索 “Testnet”。若列表里没有，选择「添加自定义网络」，把上面的参数逐项填入。
              </>
            ),
          },
          {
            title: "确认已切换到测试网",
            body: (
              <>
                切换后，钱包顶部应显示测试网名称，余额单位是 <code>tBNB</code>。
              </>
            ),
          },
        ]}
      />

      <Callout variant="warning" title="确认你在测试网">
        继续之前，务必确认钱包当前网络是 BNB 测试网（Chain ID {BNB_TESTNET.chainId}）。
        如果显示的是主网，请先切换，避免任何真实资产风险。
      </Callout>
    </StepShell>
  );
}
