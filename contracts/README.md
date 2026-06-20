# Chainwise 合约（Hardhat）

`GuestBook.sol` 是「与智能合约交互」步骤的目标合约：一个链上留言板。
本目录是一个**独立的 Hardhat 项目**，与主项目（Next.js）依赖隔离，不进生产镜像。

工具链：Hardhat 2 + `@nomicfoundation/hardhat-toolbox`（ethers v6）+ hardhat-verify。

## 安装

```bash
cd contracts
pnpm install     # 若提示 ignored build scripts，按下文授权后重装
```

pnpm 11 默认忽略原生包的构建脚本。首次 install 会列出被忽略的包，
把它们写入 `contracts/pnpm-workspace.yaml` 的 `allowBuilds`（值设为 `true`）后再 `pnpm install`。

## 编译与测试

```bash
pnpm compile     # hardhat compile
pnpm test        # 运行 test/GuestBook.ts 单元测试
```

## 部署到 BNB 测试网

```bash
cp .env.example .env
# 填入 PRIVATE_KEY（仅测试网用、含少量 tBNB）与 BSCSCAN_API_KEY
pnpm deploy:bsc
```

`scripts/deploy.ts` 会：

1. 部署 GuestBook 到 BNB 测试网（Chain ID 97）
2. 打印合约地址
3. **自动把地址写回主项目根目录 `.env` 的 `NEXT_PUBLIC_DEMO_CONTRACT_ADDRESS`**
4. 打印验证命令

## 验证源码到 BscScan

```bash
pnpm hardhat verify --network bscTestnet <合约地址>
```

GuestBook 没有构造参数，无需额外参数。验证后用户即可在 BscScan 的
“Write Contract” 标签页直接调用 `post()`。

## 安全

- `PRIVATE_KEY` 仅写在 `contracts/.env`，已被 `.gitignore` 忽略，绝不提交。
- 这是测试网部署，使用的钱包不应持有任何真实资产。
