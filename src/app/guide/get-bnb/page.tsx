import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { GuideSteps } from "@/components/guide/guide-steps";
import { FaucetList } from "@/components/guide/faucet-list";
import { FaucetBalanceCheck } from "@/components/wallet/faucet-balance-check";

export const metadata: Metadata = {
  title: "领取测试币 tBNB",
  description:
    "去水龙头网站免费领取测试币 tBNB，只需填写钱包地址。网站会自动检测到账，余额变化一目了然。测试币没有真实价值，只用来支付测试交易手续费。",
};

export default function Page() {
  return (
    <StepShell stepKey="get-bnb">
      <p>
        要在测试网转账，需要一点 <strong>tBNB</strong> 来付手续费（Gas）。
        它是免费领的，去「水龙头」网站填上你的地址就能拿到。
      </p>

      <Callout variant="info" title="先建立正确认知">
        <p>测试币<strong>没有任何真实价值</strong>，不能买卖、不能提现。</p>
        <p>领水<strong>不是空投</strong>，不需要授权代币、不需要连接陌生网站。</p>
      </Callout>

      {/* 复制地址 + 自动检测到账 */}
      <FaucetBalanceCheck />

      <h2>操作步骤</h2>
      <GuideSteps
        steps={[
          {
            title: "复制上方你的钱包地址",
            body: <>点地址右边的复制按钮即可。地址是公开信息，放心粘贴。</>,
          },
          {
            title: "打开下面推荐的「BitBond 水龙头」",
            body: <>这个水龙头无需主网余额，粘贴地址后直接点领取即可。</>,
          },
          {
            title: "粘贴地址并点领取",
            body: <>把地址粘进输入框，点击 Claim / Send，通常几十秒到账。</>,
          },
          {
            title: "回到本页，等它自动变绿",
            body: (
              <>
                不用刷新页面。上方的检测框到账后会自动显示绿色「已到账」，本步骤自动完成。
              </>
            ),
          },
        ]}
      />

      <h2>水龙头入口</h2>
      <p className="text-sm text-zinc-500">
        推荐先试零门槛水龙头，用量足够完成本教程所有步骤。
      </p>
      <FaucetList />

      <Callout variant="warning" title="领水失败怎么办">
        <p>换一个上面的水龙头再试。</p>
        <p>
          部分水龙头有 24 小时一次的频率限制，稍后再来即可。
        </p>
        <p>记住：水龙头只会要你的地址，绝不会要助记词或让你授权代币。</p>
      </Callout>

      {/* 兜底方案 */}
      <h2>还是领不到？试试这些方法</h2>
      <p className="text-sm text-zinc-600">
        如果多个水龙头都无法使用，以下方法可以帮你拿到少量 tBNB：
      </p>

      <div className="my-4 space-y-4">
        {/* 方案 A: Discord */}
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <p className="font-semibold text-zinc-800">
            方案 A：BNB Chain 官方 Discord
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            加入 BNB Chain 官方 Discord，在 #testnet-faucet 频道按格式发送你的地址，管理员或机器人会发送测试币。搜索「BNB Chain Discord」即可找到官方链接。
          </p>
        </div>

        {/* 方案 B: 社群互助 */}
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <p className="font-semibold text-zinc-800">方案 B：社群互助</p>
          <p className="mt-1 text-sm text-zinc-600">
            在 Telegram 搜索「BNB Chain 中文」「BSC 开发者」等群，说明你是新手在学习测试网，请群友发一点 tBNB（测试币无价值，很多人愿意帮忙）。或者在微信扫码加入区块链学习社群。
          </p>
        </div>

        {/* 方案 C: 交易所小额购买 */}
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <p className="font-semibold text-zinc-800">
            方案 C：从交易所提少量主网 BNB（最后手段）
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            在 OKX 或币安购买少量 BNB（几元人民币），提到主网钱包，之后就能使用官方水龙头领 0.3 tBNB。这一步涉及真实资产，如果你还不熟悉交易所操作，建议先尝试以上社群方法。
          </p>
          <p className="mt-1 text-xs text-orange-600">
            提示：这会产生真实费用，对完全零基础的新手不推荐作为首选。
          </p>
        </div>
      </div>
    </StepShell>
  );
}
