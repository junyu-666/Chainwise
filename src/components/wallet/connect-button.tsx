"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shorten } from "@/lib/utils";

/** 触发 Reown AppKit 连接弹窗（扫码 + 注入钱包）。 */
export function ConnectButton({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();

  return (
    <Button
      size={size}
      variant={isConnected ? "outline" : "primary"}
      onClick={() => open()}
    >
      <Wallet className="h-4 w-4" />
      {isConnected && address ? shorten(address) : "连接钱包"}
    </Button>
  );
}
