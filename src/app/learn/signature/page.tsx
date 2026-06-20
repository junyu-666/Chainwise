import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { SignatureDemo } from "@/components/simulation/signature-demo";
import { Quiz } from "@/components/quiz";

export const metadata: Metadata = {
  title: "签名类型与风险",
  description:
    "签名不是一个动作。message signing 只是登录，approve 和 permit 会授权别人动用你的代币，transfer/swap 会改变资产状态。签名前要看清类型。",
};

export default function Page() {
  return (
    <StepShell stepKey="signature">
      <p>
        钱包弹出「请签名」时，很多人习惯性点确认。但<strong>签名不是一个动作</strong>，
        不同的签名代表完全不同的后果——有的只是登录，有的会把你的资产授权给别人。
      </p>

      <h2>四种常见签名，风险天差地别</h2>
      <p>点开每一种，看清「你正在授权什么」：</p>

      <SignatureDemo />

      <Callout variant="danger" title="授权不是登录">
        最危险的误解，是把 approve / permit 当成「登录一下」。
        它们可能让对方合约随时转走你的某种代币。授权和登录，必须分开看。
      </Callout>

      <h2>签名前的通用检查</h2>
      <ul>
        <li>这是哪种签名？是证明身份，还是授权动用资产？</li>
        <li>发起签名的网站可信吗？是不是被仿冒的钓鱼站？</li>
        <li>如果是授权，授权给谁、哪种代币、额度多大？</li>
      </ul>

      <Quiz
        question="哪些签名「可能导致资产被转走」，需要格外当心？"
        options={[
          { id: "a", text: "Message Signing（证明地址是我的）", correct: false },
          { id: "b", text: "Approve（授权某合约使用我的代币）", correct: true },
          { id: "c", text: "Permit（免 Gas 的离线授权）", correct: true },
          { id: "d", text: "随手确认一个陌生网站弹出的授权", correct: true },
        ]}
        explanation="message signing 一般只证明身份。approve 和 permit 都是授权，可能让对方动用你的代币；对陌生网站的授权尤其要警惕。"
      />
    </StepShell>
  );
}
