import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { MockWallet } from "@/components/simulation/mock-wallet";
import { Quiz } from "@/components/quiz";

export const metadata: Metadata = {
  title: "钱包到底是什么",
  description:
    "区块链钱包不是银行账户，也不是交易所账户。它本质上是管理私钥、发起签名的工具。地址可以公开，助记词才是控制权。",
};

export default function Page() {
  return (
    <StepShell stepKey="wallet">
      <p>
        很多人第一次听到「钱包」，会以为它像支付宝或银行卡，里面「存着钱」。
        在区块链里，这个理解会让你犯很多错误。我们先把它纠正过来。
      </p>

      <h2>钱包不是账户，而是一把钥匙</h2>
      <p>
        你的资产记录并不在钱包 App 里，而是记录在区块链这本公开账本上。钱包 App
        真正帮你管理的，是一把「钥匙」——用来证明某个地址由你控制、并发起操作。
      </p>
      <ul>
        <li>
          <strong>地址</strong>：像一个公开的收款编号，别人可以看到、可以给你转账。
        </li>
        <li>
          <strong>私钥 / 助记词</strong>：才是真正的控制权。谁拥有它，谁就能动用资产。
        </li>
      </ul>

      <Callout variant="tip" title="一句话记住">
        钱包帮你管理控制权。链上的资产记录不在钱包 App 里，而在区块链上。
      </Callout>

      <h2>动手看看：公开信息 vs 控制权</h2>
      <p>
        下面生成一个<strong>模拟</strong>地址（不是真实钱包，仅用于理解）。注意它把信息分成两类：
      </p>

      <MockWallet />

      <h2>丢失和泄露，是两回事</h2>
      <ul>
        <li>
          <strong>丢失助记词</strong>：你自己进不去了，资产卡在链上谁也拿不到。
        </li>
        <li>
          <strong>泄露助记词</strong>：别人能进去，资产会被转走。
        </li>
      </ul>

      <Callout variant="danger" title="安全底线">
        任何人——包括「客服」「老师」「群友」——向你索要助记词，都是骗局。没有例外。
      </Callout>

      <Quiz
        question="下面哪些信息可以安全地发给别人？"
        options={[
          { id: "a", text: "钱包地址（0x 开头那串）", correct: true },
          { id: "b", text: "交易哈希", correct: true },
          { id: "c", text: "助记词（12 / 24 个单词）", correct: false },
          { id: "d", text: "钱包私钥", correct: false },
        ]}
        explanation="地址和交易哈希是公开信息，发出去别人最多向你转账或查记录。助记词和私钥等于控制权，一旦泄露资产会被转走。"
      />
    </StepShell>
  );
}
