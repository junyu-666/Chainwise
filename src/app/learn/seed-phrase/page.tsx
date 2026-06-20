import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { Callout } from "@/components/ui/callout";
import { Quiz } from "@/components/quiz";

export const metadata: Metadata = {
  title: "创建钱包与助记词安全",
  description:
    "创建钱包时最容易犯的错都和助记词有关：截图、发微信、存网盘、给客服。本页讲清密码和助记词的区别，以及换设备会发生什么。",
};

export default function Page() {
  return (
    <StepShell stepKey="seed-phrase">
      <p>
        创建钱包本身只要几步，真正的风险全在「怎么对待助记词」。这一页把新手最容易踩的坑讲清楚。
      </p>

      <h2>密码和助记词，不是一回事</h2>
      <ul>
        <li>
          <strong>本地密码</strong>：只用来解锁你这台设备上的钱包 App。换台手机它就没用了。
        </li>
        <li>
          <strong>助记词</strong>：是钱包的「根」。在任何设备上输入它，都能还原出整个钱包。
        </li>
      </ul>

      <Callout variant="info" title="所以">
        忘了本地密码不可怕，用助记词就能恢复。但助记词一旦丢失或泄露，没有任何「找回密码」按钮。
      </Callout>

      <h2>换设备、卸载、丢手机会怎样</h2>
      <ul>
        <li>手机丢了 / App 卸载了：只要助记词还在，在新设备上重新导入即可恢复。</li>
        <li>助记词也没了：资产永久锁死在链上，谁都无法恢复。</li>
      </ul>

      <h2>备份助记词的红线</h2>
      <Callout variant="danger" title="这些事一件都不能做">
        <p>不能截图、不能拍照、不能发微信 / 聊天工具。</p>
        <p>不能存网盘、相册、备忘录、邮箱。</p>
        <p>不能输入任何网站、任何「验证」「同步」「客服」页面。</p>
      </Callout>
      <p>
        推荐做法：用纸抄下来，离线保存，最好多份分开放。这听起来「土」，但它正是为了对抗联网泄露。
      </p>

      <h2>为什么「客服要助记词」一定是骗局</h2>
      <p>
        真正的钱包是去中心化的，没有客服能「帮你操作账户」。任何索要助记词的人，目的只有一个：转走你的资产。
      </p>

      <Quiz
        question="收到这些情况，哪些是危险信号（应该立刻停止）？"
        options={[
          { id: "a", text: "对方说「把助记词发我，帮你恢复账户」", correct: true },
          { id: "b", text: "网站要求输入助记词来「验证身份」", correct: true },
          { id: "c", text: "把助记词抄在纸上，锁进抽屉", correct: false },
          { id: "d", text: "「官方客服」私信你说账户异常，需要助记词处理", correct: true },
        ]}
        explanation="任何要求你输入或发送助记词的场景都是骗局。把助记词离线抄写保存才是正确做法。"
      />
    </StepShell>
  );
}
