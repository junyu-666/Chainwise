import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

const ROOT_ENV = path.resolve(__dirname, "../../.env");
const ENV_KEY = "NEXT_PUBLIC_DEMO_CONTRACT_ADDRESS";

async function main() {
  const factory = await ethers.getContractFactory("GuestBook");
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log(`✅ GuestBook 部署成功：${address}`);

  syncToRootEnv(address);

  console.log("\n下一步，验证源码到 BscScan：");
  console.log(`  pnpm hardhat verify --network bscTestnet ${address}`);
}

/** 把合约地址写回主项目根目录的 .env，省去手动复制。 */
function syncToRootEnv(address: string) {
  const line = `${ENV_KEY}="${address}"`;

  if (fs.existsSync(ROOT_ENV)) {
    let content = fs.readFileSync(ROOT_ENV, "utf8");
    const re = new RegExp(`^${ENV_KEY}=.*$`, "m");
    content = re.test(content)
      ? content.replace(re, line)
      : content.replace(/\n*$/, "\n") + line + "\n";
    fs.writeFileSync(ROOT_ENV, content);
    console.log(`✅ 已更新根 .env 的 ${ENV_KEY}`);
  } else {
    fs.writeFileSync(ROOT_ENV, line + "\n");
    console.log(
      `⚠️ 根目录 .env 不存在，已创建并写入 ${ENV_KEY}。其余变量请参考根目录 .env.example。`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
