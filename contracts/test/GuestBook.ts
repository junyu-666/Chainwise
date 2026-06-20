import { expect } from "chai";
import { ethers } from "hardhat";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";

describe("GuestBook", () => {
  async function deploy() {
    const [owner, other] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("GuestBook");
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    return { contract, owner, other };
  }

  it("初始留言数为 0", async () => {
    const { contract } = await deploy();
    expect(await contract.getCount()).to.equal(0);
  });

  it("post 后能读到留言，且作者与内容正确", async () => {
    const { contract, owner } = await deploy();
    await contract.post("hello chain");

    expect(await contract.getCount()).to.equal(1);
    const messages = await contract.getMessages();
    expect(messages[0].content).to.equal("hello chain");
    expect(messages[0].author).to.equal(owner.address);
  });

  it("post 触发 MessagePosted 事件", async () => {
    const { contract, owner } = await deploy();
    await expect(contract.post("hi"))
      .to.emit(contract, "MessagePosted")
      .withArgs(owner.address, "hi", anyValue);
  });

  it("空内容应 revert", async () => {
    const { contract } = await deploy();
    await expect(contract.post("")).to.be.revertedWith("Invalid length");
  });

  it("超过 280 字节应 revert", async () => {
    const { contract } = await deploy();
    const tooLong = "a".repeat(281);
    await expect(contract.post(tooLong)).to.be.revertedWith("Invalid length");
  });
});
