# Chainwise

Chainwise 是一个面向区块链完全新手的中文扫盲与安全上手网站。

项目目标不是引导投资或交易，而是把钱包、地址、Gas、签名、交易哈希、稳定币、链上浏览器等基础概念，变成低压力、可交互、可验证的生活技能入门路径。

- 第一版设计文档：[docs/v1-design.md](docs/v1-design.md)
- 技术架构文档：[docs/architecture.md](docs/architecture.md)

## 技术栈

Next.js 15（App Router）· TypeScript · Tailwind CSS 4 · viem（只读）· Prisma + PostgreSQL · Docker

## 本地开发

需要 Node 20+ 和 pnpm。

```bash
pnpm install
cp .env.example .env   # 可选：不配置 DATABASE_URL 时进度仅存于浏览器 localStorage
pnpm dev               # http://localhost:3000
```

构建与生产启动：

```bash
pnpm build
pnpm start
```

## Docker 部署

```bash
cp .env.example .env    # 填好 DB_PASSWORD 等
docker compose up -d
```

`docker-compose.yml` 会启动 Next.js 应用和 PostgreSQL，并在启动时自动执行数据库迁移。

## 演示合约

`contracts/GuestBook.sol` 是「与智能合约交互」步骤的链上留言板合约。
部署方法见 [contracts/README.md](contracts/README.md)，部署后把地址填入 `NEXT_PUBLIC_DEMO_CONTRACT_ADDRESS`。

## 项目结构

```
src/
├── app/            # 页面与 API 路由
│   ├── learn/      # 5 个概念学习模块（无需钱包）
│   ├── guide/      # 6 步真实实操引导（OKX 钱包 + BNB 测试网）
│   ├── review/     # 复盘自检
│   └── api/        # /api/tx 交易查询、/api/progress 进度同步
├── components/     # UI、模拟交互、引导组件
├── hooks/          # useProgress（localStorage 进度）
└── lib/            # viem、prisma、链与步骤配置
```

## 安全边界

- 全程使用 BNB 测试网，不涉及任何真实资产
- 不托管私钥、不代发测试币、后端无任何链上签名能力（viem 仅只读）
- 不提供投资建议、不推荐项目、不要求导入真实助记词
