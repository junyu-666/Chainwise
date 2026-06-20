# Chainwise 技术架构文档

## 1. 项目定位

Chainwise 是一个面向完全零基础用户的区块链引导网站。它不是工具，不是钱包，不是交易所——它是一份可交互的操作手册，引导用户用自己的真实钱包在测试网上完成从创建到合约交互的完整闭环，在操作中强化概念。

**核心约束**：
- 不涉及真实资产，全程在测试网操作
- 不托管用户私钥或助记词
- 不自建水龙头，不代发测试币，领水引导用户去官方网站自行完成
- 不做投资建议、行情、项目推荐

---

## 2. 用户路径

```
概念理解（纯阅读，无需钱包）
  ├── 区块链解决什么问题
  ├── 钱包是什么（地址 / 私钥 / 助记词的关系）
  ├── 地址与交易哈希
  ├── 签名类型与风险识别
  └── 如何用区块浏览器确认到账

     ↓

实操引导（需安装钱包）
  ├── 第一步：安装 OKX 钱包（分 Android / iOS / Chrome 插件图文引导）
  ├── 第二步：创建钱包，备份助记词（含安全警示）
  ├── 第三步：添加 BNB 测试网到 OKX 钱包
  ├── 第四步：去官方水龙头网站领取测试 BNB（Chainwise 提供入口和操作说明）
  ├── 第五步：发起一笔测试转账
  ├── 第六步：在 BscScan 查询交易哈希
  └── 第七步：与演示合约交互（留言上链）

     ↓

复盘（自我检验 7 项能力清单）
```

---

## 3. 测试网与水龙头

### 3.1 测试网参数

| 参数 | 值 |
|---|---|
| 网络名称 | BNB Smart Chain Testnet |
| Chain ID | 97 |
| 原生代币 | tBNB |
| 官方 RPC | `https://data-seed-prebsc-1-s1.bnbchain.org:8545` |
| 备用 RPC | `https://data-seed-prebsc-2-s1.bnbchain.org:8545` |
| 区块浏览器 | `https://testnet.bscscan.com` |

### 3.2 领水方案

Chainwise **不自建水龙头**，引导用户去官方/第三方水龙头自行领取。选 BNB 测试网的核心原因就是它的水龙头零门槛——仅需填写钱包地址，无需主网余额，无需社交账号。

引导页提供主备多个入口，任一失效时用户有替代选择：

| 优先级 | 水龙头 | 入口 | 条件 |
|---|---|---|---|
| 主选 | BNB Chain 官方 | `https://www.bnbchain.org/en/testnet-faucet` | 仅填钱包地址 |
| 备选 1 | Bitbond | `https://tokentool.bitbond.com/faucet/bsc-testnet` | 仅填钱包地址 |
| 备选 2 | QuickNode | `https://faucet.quicknode.com/binance-smart-chain/bnb-testnet` | 仅填钱包地址 |

引导页职责：
- 说明测试币没有真实价值，只用于支付测试 Gas
- 教用户从 OKX 钱包复制地址
- 跳转到水龙头网站，并图解粘贴地址、领取的操作
- 领取后回到 Chainwise，用 `/api/tx` 或站内提示确认余额变化

> 水龙头政策可能变化。引导页文案与链接需定期核查；多入口设计就是为了抵御单点失效。

---

## 4. 技术选型

### 4.1 选型原则

优先选择强类型、约定明确、文档完整的技术。目标是 AI 生成的代码类型安全、可编译通过、行为可预期。

### 4.2 技术栈

| 层级 | 技术 | 版本 | 选型理由 |
|---|---|---|---|
| 框架 | Next.js (App Router) | 15.x | SSG 利于 SEO，API Routes 承载轻量后端，一体化部署 |
| 语言 | TypeScript | 5.x strict | 强类型强制正确性，编译器兜底 |
| UI 组件 | shadcn/ui | latest | 基于 Radix UI，组件文档完整，AI 复用准确率高 |
| 样式 | Tailwind CSS | 4.x | 约定清晰，AI 写类名错误率低 |
| Web3 | viem | 2.x | 完全类型安全，函数签名明确，无歧义参数（仅用只读 PublicClient） |
| ORM | Prisma | 5.x | Schema 驱动，自动生成类型，AI 写查询几乎不出错 |
| 数据库 | PostgreSQL | 16 | 关系型，做进度持久化，Prisma 支持最完整 |
| 数据验证 | Zod | 3.x | 声明式 schema，AI 写 Zod 准确率极高 |
| 包管理 | pnpm | 9.x | 速度快，磁盘效率高 |
| 部署 | Docker + docker-compose | - | 环境一致，一条命令启动全部服务 |

> 不再引入 Redis。它原本的唯一用途是自建水龙头的限流；取消自建水龙头后没有其他用途，保留属于过度设计。
>
> viem 仅使用只读 `PublicClient`。Chainwise 不发送任何链上交易，因此不需要 `WalletClient`、不持有任何私钥。

---

## 5. 服务架构

```
┌──────────────────────────────────────────────────┐
│                  docker-compose                   │
│                                                   │
│  ┌──────────────────┐    ┌────────────────────┐  │
│  │   Next.js App    │    │   PostgreSQL 16     │  │
│  │   (port 3000)    │───▶│   (port 5432)       │  │
│  │                  │    └────────────────────┘  │
│  │  内容页 (SSG)    │                             │
│  │  引导步骤页      │                             │
│  │  API Routes:     │                             │
│  │   /api/progress  │                             │
│  │   /api/tx/[hash] │                             │
│  └──────────────────┘                             │
│           │                                       │
└───────────┼───────────────────────────────────────┘
            │
            ▼
   BNB Testnet RPC
   └── viem PublicClient（只读查询：余额、交易状态）
```

后端职责仅两项：进度持久化、交易状态只读查询。无热钱包，无私钥，无发交易能力。

---

## 6. 目录结构

```
chainwise/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # 首页
│   │   ├── learn/
│   │   │   ├── wallet/           # 钱包是什么
│   │   │   ├── seed-phrase/      # 助记词安全
│   │   │   ├── address-and-tx/   # 地址与交易哈希
│   │   │   ├── signature/        # 签名类型
│   │   │   └── explorer/         # 查询到账
│   │   ├── guide/
│   │   │   ├── install-wallet/   # OKX 钱包安装引导
│   │   │   ├── add-testnet/      # 添加测试网
│   │   │   ├── get-bnb/          # 领测试币（跳转官方水龙头）
│   │   │   ├── transfer/         # 测试转账
│   │   │   ├── read-explorer/    # 读区块浏览器
│   │   │   └── contract/         # 合约交互
│   │   ├── safety/               # 安全中心 + 常见骗局
│   │   ├── glossary/             # 术语表
│   │   └── api/
│   │       ├── progress/route.ts # 进度读写
│   │       └── tx/[hash]/route.ts# 交易状态查询（viem 只读）
│   ├── components/
│   │   ├── ui/                   # shadcn 基础组件
│   │   ├── guide/                # 步骤卡、进度条、安全提示
│   │   ├── simulation/           # 模拟钱包、模拟浏览器
│   │   └── wallet/               # 钱包连接检测（只读）
│   ├── lib/
│   │   ├── viem.ts               # PublicClient（只读）
│   │   └── prisma.ts             # Prisma 客户端
│   └── prisma/
│       └── schema.prisma
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
└── .env.example
```

---

## 7. 数据模型

```prisma
model UserProgress {
  id              String   @id @default(cuid())
  anonymousId     String   @unique           // localStorage 生成的匿名 ID
  walletAddress   String?                    // 连接钱包后绑定
  currentStep     String   @default("learn") // 当前所在阶段
  completedSteps  String[]                   // 已完成的步骤 key 列表
  quizResults     Json     @default("{}")    // 各模块测验结果
  testnetTasks    Json     @default("{}")    // 测试网任务状态
  lastSeenAt      DateTime @default(now()) @updatedAt
  createdAt       DateTime @default(now())

  @@index([walletAddress])
}
```

`testnetTasks` JSON 结构：

```json
{
  "walletInstalled": false,
  "testnetAdded": false,
  "faucetClaimed": false,
  "faucetTxHash": null,
  "transferSent": false,
  "transferTxHash": null,
  "transferConfirmed": false,
  "explorerChecked": false,
  "contractInteracted": false,
  "contractTxHash": null,
  "completedAt": null
}
```

> 进度以 localStorage 为主（未登录也可用），数据库做持久化与后续跨设备/证书能力的基础。第一版可先只用 localStorage，数据库接口预留。

---

## 8. API 设计

后端无写链能力，仅以下两个接口。

### POST /api/progress

读写用户学习进度。请求体含 `anonymousId` 与要更新的字段，用 Zod 校验后写入 PostgreSQL。

### GET /api/tx/[hash]

用 viem PublicClient 查询 BNB 测试网上的交易状态，返回简化结构，供引导页站内显示，免去用户自己去 BscScan 粘贴哈希：

```json
{
  "status": "success" | "pending" | "failed",
  "from": "0x...",
  "to": "0x...",
  "value": "0.005",
  "gasUsed": "21000",
  "blockNumber": 12345678,
  "timestamp": 1718000000
}
```

---

## 9. Docker 部署

### Dockerfile（多阶段构建）

```dockerfile
FROM node:20-alpine AS base
RUN npm install -g pnpm

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma generate
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### docker-compose.yml（开发）

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      db:
        condition: service_healthy
    command: sh -c "pnpm prisma migrate deploy && node server.js"

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: chainwise
      POSTGRES_USER: chainwise
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U chainwise"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

### 环境变量（.env.example）

```bash
# 数据库
DATABASE_URL="postgresql://chainwise:password@db:5432/chainwise"
DB_PASSWORD="password"

# BNB 测试网（仅只读查询用）
BNB_TESTNET_RPC="https://data-seed-prebsc-1-s1.bnbchain.org:8545"
BNB_TESTNET_CHAIN_ID=97

# 演示合约地址（部署到 BNB 测试网）
DEMO_CONTRACT_ADDRESS="0x..."
```

> 不再有任何私钥或水龙头相关配置。环境变量里没有任何敏感的链上签名凭证。

---

## 10. 演示合约

部署一个极简留言板合约到 BNB 测试网，作为合约交互引导步骤的目标。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GuestBook {
    struct Message {
        address author;
        string content;
        uint256 timestamp;
    }

    Message[] public messages;

    event MessagePosted(address indexed author, string content, uint256 timestamp);

    function post(string calldata content) external {
        require(bytes(content).length > 0 && bytes(content).length <= 280, "Invalid length");
        messages.push(Message(msg.sender, content, block.timestamp));
        emit MessagePosted(msg.sender, content, block.timestamp);
    }

    function getMessages() external view returns (Message[] memory) {
        return messages;
    }

    function getCount() external view returns (uint256) {
        return messages.length;
    }
}
```

用户通过 BscScan 的 Write Contract 调用 `post()`，留言永久上链。这一步的体感最强，是整个引导流程的高潮。合约由开发者一次性部署，用户用自己的钱包和 tBNB 支付调用 Gas。

---

## 11. 开发阶段

| 阶段 | 内容 | 产出 |
|---|---|---|
| Phase 1 | 项目初始化、Docker 环境、设计系统 | 可运行的空壳，所有路由跑通 |
| Phase 2 | 5 个概念学习模块（纯内容，无钱包） | 可独立转发的内容站 |
| Phase 3 | OKX 钱包安装引导 + 测试网配置引导 | 用户能完成钱包创建 |
| Phase 4 | 领水引导页（跳转官方水龙头 + 操作图解） | 用户能无门槛领到 tBNB |
| Phase 5 | 测试转账引导 + BscScan 查询引导 + /api/tx | 用户能完成完整转账闭环 |
| Phase 6 | 演示合约部署 + 合约交互引导 | 用户能完成链上留言 |
| Phase 7 | 进度系统、安全中心、常见骗局 | 完整 MVP |
| Phase 8 | SEO 优化、结构化数据、分析接入 | 可对外发布 |

---

## 12. 关键设计决策记录

| 决策 | 选择 | 放弃的方案 | 原因 |
|---|---|---|---|
| 测试网 | BNB Testnet | Sepolia / Holesky | 官方水龙头零门槛，仅需钱包地址 |
| 钱包方案 | 用户自有 OKX 钱包 | MetaMask / 内嵌钱包 | 覆盖中文用户与移动端，定位是引导站，操作在用户手中 |
| 领水 | 引导去官方水龙头 | 自建水龙头 | 不托管私钥、不代发资产，BNB 水龙头本身零门槛，无需自建 |
| 缓存层 | 不引入 Redis | Redis 限流 | 取消自建水龙头后无用途，避免过度设计 |
| 链上能力 | 仅 viem 只读查询 | 持热钱包发交易 | 后端不持私钥，无签名能力，攻击面最小 |
| 前后端 | Next.js 一体 | 前后端分离 | 项目规模不需要，维护成本低 |
| 进度存储 | localStorage + 数据库双层 | 纯 localStorage | localStorage 跨设备丢失，数据库做持久化 |
| 合约交互 | BscScan Write Contract | Chainwise 内嵌 UI | 教用户用真实工具，而不是封装掉 |
```
