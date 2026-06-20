import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { GuideSteps } from "@/components/guide/guide-steps";
import { FaucetList } from "@/components/guide/faucet-list";

export const metadata: Metadata = {
  title: "领取测试币 tBNB",
  description:
    "去官方水龙头免费领取测试币 tBNB，只需填写钱包地址，无需主网余额。测试币没有真实价值，只用来支付测试交易的手续费。",
};

export default function Page() {
  return (
    <StepShell stepKey="get-bnb">
      <p>
        要在测试网上转账，需要一点 <strong>tBNB</strong> 来支付手续费（Gas）。
        这些测试币是免费领取的，去「水龙头」网站填上你的地址就能拿到。
      </p>

      <Callout variant="info" title="先建立正确认知">
        <p>测试币<strong>没有任何真实价值</strong>，不能买卖、不能提现。</p>
        <p>领水<strong>不是空投</strong>，不需要你授权任何代币、不需要连接陌生网站。</p>
      </Callout>

      <h2>操作步骤</h2>
      <GuideSteps
        steps={[
          {
            title: "在 OKX 钱包复制你的地址",
            body: (
              <>
                确认当前在 BNB 测试网，点击地址即可复制（0x 开头那串）。地址是公开信息，可以放心粘贴。
              </>
            ),
          },
          {
            title: "打开一个水龙头网站",
            body: <>从下面任选一个，优先用第一个。打不开或领取失败就换下一个。</>,
          },
          {
            title: "粘贴地址并领取",
            body: <>把地址粘进输入框，点击领取（Claim / Send）。通常几十秒内到账。</>,
          },
          {
            title: "回到钱包确认余额变化",
            body: (
              <>
                稍等片刻，OKX 钱包里的 <code>tBNB</code> 余额应从 0 变成一个小额数字。
              </>
            ),
          },
        ]}
      />

      <h2>水龙头入口</h2>
      <FaucetList />

      <Callout variant="warning" title="领水失败怎么办">
        <p>换一个上面的水龙头再试。</p>
        <p>部分水龙头有 24 小时一次的频率限制，稍后再来即可。</p>
        <p>始终记住：水龙头只会要你的地址，绝不会要助记词或让你授权代币。</p>
      </Callout>
    </StepShell>
  );
}
