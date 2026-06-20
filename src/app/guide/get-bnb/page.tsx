import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { GuideSteps } from "@/components/guide/guide-steps";
import { FaucetList } from "@/components/guide/faucet-list";
import { FaucetBalanceCheck } from "@/components/wallet/faucet-balance-check";

export const metadata: Metadata = {
  title: "领取测试币 tBNB",
  description:
    "去官方水龙头免费领取测试币 tBNB，只需填写钱包地址。网站会自动检测到账，余额变化一目了然。测试币没有真实价值，只用来支付测试交易手续费。",
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
            title: "打开下面任意一个水龙头网站",
            body: <>优先用第一个。打不开或领取失败就换下一个。</>,
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
      <FaucetList />

      <Callout variant="warning" title="领水失败怎么办">
        <p>换一个上面的水龙头再试。</p>
        <p>部分水龙头有 24 小时一次的频率限制，或要求一些简单验证，稍后再来即可。</p>
        <p>记住：水龙头只会要你的地址，绝不会要助记词或让你授权代币。</p>
      </Callout>
    </StepShell>
  );
}
