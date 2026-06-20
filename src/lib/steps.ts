/** 全站学习路径的集中配置：首页路径条、进度追踪、导航都引用它。 */

export type StepGroup = "learn" | "guide" | "review";

export interface Step {
  key: string;
  title: string;
  href: string;
  group: StepGroup;
  summary: string;
}

export const LEARN_STEPS: Step[] = [
  {
    key: "wallet",
    title: "钱包到底是什么",
    href: "/learn/wallet",
    group: "learn",
    summary: "钱包不是账户，而是管理控制权的工具。",
  },
  {
    key: "seed-phrase",
    title: "创建钱包与助记词安全",
    href: "/learn/seed-phrase",
    group: "learn",
    summary: "助记词等于资产控制权，绝不能泄露。",
  },
  {
    key: "address-and-tx",
    title: "地址与交易哈希",
    href: "/learn/address-and-tx",
    group: "learn",
    summary: "链上记录的最小单位，到账以链上为准。",
  },
  {
    key: "signature",
    title: "签名类型与风险",
    href: "/learn/signature",
    group: "learn",
    summary: "有的签名只是登录，有的会授权别人动你的资产。",
  },
  {
    key: "explorer",
    title: "查询链上转账是否到账",
    href: "/learn/explorer",
    group: "learn",
    summary: "不看聊天截图，看区块浏览器。",
  },
];

export const GUIDE_STEPS: Step[] = [
  {
    key: "install-wallet",
    title: "安装 OKX 钱包",
    href: "/guide/install-wallet",
    group: "guide",
    summary: "分手机 App 和浏览器插件，逐步创建你的第一个钱包。",
  },
  {
    key: "add-testnet",
    title: "添加 BNB 测试网",
    href: "/guide/add-testnet",
    group: "guide",
    summary: "切换到测试网络，避免任何真实资产风险。",
  },
  {
    key: "get-bnb",
    title: "领取测试币",
    href: "/guide/get-bnb",
    group: "guide",
    summary: "去官方水龙头免费领取 tBNB，只需填地址。",
  },
  {
    key: "transfer",
    title: "发起一笔测试转账",
    href: "/guide/transfer",
    group: "guide",
    summary: "在测试网完成你的第一笔真实链上转账。",
  },
  {
    key: "read-explorer",
    title: "用区块浏览器确认结果",
    href: "/guide/read-explorer",
    group: "guide",
    summary: "在 BscScan 上读懂这笔交易的每一个字段。",
  },
  {
    key: "contract",
    title: "与智能合约交互",
    href: "/guide/contract",
    group: "guide",
    summary: "向链上留言板写一句话，永久记录在区块链上。",
  },
];

export const REVIEW_STEP: Step = {
  key: "review",
  title: "复盘你已经掌握的能力",
  href: "/review",
  group: "review",
  summary: "用自己的话复述每个概念，确认真正理解。",
};

export const ALL_STEPS: Step[] = [...LEARN_STEPS, ...GUIDE_STEPS, REVIEW_STEP];

export function getStep(key: string): Step | undefined {
  return ALL_STEPS.find((s) => s.key === key);
}

/** 返回某一步在整条路径中的索引（用于上一页 / 下一页导航）。 */
export function getStepIndex(key: string): number {
  return ALL_STEPS.findIndex((s) => s.key === key);
}
