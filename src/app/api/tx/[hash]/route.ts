import { NextResponse } from "next/server";
import { formatEther, isHash } from "viem";
import { publicClient } from "@/lib/viem";

/**
 * 只读查询 BNB 测试网上一笔交易的状态。
 * Chainwise 不持私钥、不发交易，这里仅做链上数据读取。
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ hash: string }> },
) {
  const { hash } = await params;

  if (!isHash(hash)) {
    return NextResponse.json(
      { error: "无效的交易哈希格式" },
      { status: 400 },
    );
  }

  try {
    const tx = await publicClient.getTransaction({ hash });
    const receipt = await publicClient
      .getTransactionReceipt({ hash })
      .catch(() => null);

    let timestamp: number | null = null;
    if (receipt) {
      const block = await publicClient
        .getBlock({ blockNumber: receipt.blockNumber })
        .catch(() => null);
      if (block) timestamp = Number(block.timestamp);
    }

    const status = receipt
      ? receipt.status === "success"
        ? "success"
        : "failed"
      : "pending";

    return NextResponse.json({
      status,
      from: tx.from,
      to: tx.to,
      value: formatEther(tx.value),
      gasUsed: receipt ? receipt.gasUsed.toString() : null,
      blockNumber: receipt ? Number(receipt.blockNumber) : null,
      timestamp,
    });
  } catch {
    // getTransaction 抛错通常意味着这笔交易在该网络上还查不到
    return NextResponse.json(
      { error: "在 BNB 测试网上找不到这笔交易，确认哈希和网络是否正确" },
      { status: 404 },
    );
  }
}
