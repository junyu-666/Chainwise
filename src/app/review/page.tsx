import type { Metadata } from "next";
import { StepShell } from "@/components/step-shell";
import { ReviewChecklist } from "@/components/review-checklist";

export const metadata: Metadata = {
  title: "复盘你已经掌握的能力",
  description:
    "不讲新概念，只复盘你已经获得的真实能力：从分清钱包与账户，到独立完成测试网转账和合约交互。",
};

export default function Page() {
  return (
    <StepShell stepKey="review">
      <p>
        这一页不讲新东西，只帮你确认：你<strong>真正掌握</strong>了哪些能力。
        逐条对照，能用自己的话说清楚，就勾上它。
      </p>
      <ReviewChecklist />
    </StepShell>
  );
}
