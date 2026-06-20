import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { GuideSteps } from "@/components/guide/guide-steps";

export const metadata: Metadata = {
  title: "安装 OKX 钱包并创建你的第一个钱包",
  description:
    "分手机 App 和浏览器插件，一步步安装 OKX 钱包、创建新钱包、设置密码、备份助记词。每一步都配安全提示，Chainwise 绝不会要求你输入助记词。",
};

export default function Page() {
  return (
    <StepShell stepKey="install-wallet">
      <p>
        现在进入真实实操。我们用 <strong>OKX 钱包</strong>作为第一个钱包——它支持中文、
        同时有手机 App 和浏览器插件，新手上手成本低。
      </p>

      <Callout variant="info" title="先说清楚">
        OKX 只是这一版的示范工具。你在这里学到的助记词保护、地址识别、签名识别，
        在任何钱包上都通用。
      </Callout>

      <h2>选择设备</h2>
      <p>
        推荐新手先用<strong>手机 App</strong>，流程更直观；如果你主要在电脑上操作，也可以用浏览器插件。
        两者创建钱包的逻辑完全一样。
      </p>

      <h2>创建钱包的步骤</h2>
      <GuideSteps
        steps={[
          {
            title: "下载并打开 OKX 钱包",
            body: (
              <>
                手机用户在 App Store / 应用商店搜索 “OKX”，电脑用户在 Chrome
                应用商店搜索 “OKX Wallet” 插件。<strong>认准官方来源</strong>，警惕仿冒。
              </>
            ),
          },
          {
            title: "选择「创建新钱包」",
            body: <>不要选「导入钱包」。我们要从零创建一个全新的测试用钱包。</>,
          },
          {
            title: "设置本地密码",
            body: (
              <>
                这个密码只用来解锁<strong>这台设备上</strong>的 App，它不是助记词，
                换设备后无法靠它恢复钱包。
              </>
            ),
          },
          {
            title: "备份助记词",
            body: (
              <>
                App 会显示一组单词，这就是你的助记词。用纸<strong>离线抄下来</strong>，
                按顺序，不要截图、不要拍照、不要发到任何地方。
              </>
            ),
          },
          {
            title: "完成助记词确认",
            body: <>App 会让你按顺序点选刚才的单词，确认你确实备份好了。</>,
          },
          {
            title: "回到 Chainwise，进入下一步",
            body: <>钱包创建完成后，我们去给它添加 BNB 测试网络。</>,
          },
        ]}
      />

      <Callout variant="danger" title="贯穿始终的红线">
        <p>本地密码 ≠ 助记词。</p>
        <p>助记词不能截图、不能联网保存。</p>
        <p>Chainwise 永远不会要求你输入助记词；任何要你输入助记词的页面都是骗局。</p>
      </Callout>
    </StepShell>
  );
}
