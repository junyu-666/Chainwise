import { NextResponse } from "next/server";
import { z } from "zod";
import { hasDatabase } from "@/lib/prisma";

const schema = z.object({
  anonymousId: z.string().min(1).max(128),
  walletAddress: z.string().max(64).optional(),
  currentStep: z.string().max(64).optional(),
  completedSteps: z.array(z.string().max(64)).max(64).optional(),
});

/**
 * 写入 / 更新学习进度。未配置数据库时优雅降级——
 * 进度仍由浏览器 localStorage 负责，这里只做可选的跨设备持久化。
 */
export async function POST(request: Request) {
  if (!hasDatabase) {
    return NextResponse.json({ ok: false, reason: "no-db" });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "参数不合法" }, { status: 400 });
  }

  const { prisma } = await import("@/lib/prisma");
  const data = parsed.data;
  const progress = await prisma.userProgress.upsert({
    where: { anonymousId: data.anonymousId },
    create: data,
    update: data,
  });
  return NextResponse.json({ ok: true, progress });
}

export async function GET(request: Request) {
  if (!hasDatabase) {
    return NextResponse.json({ ok: false, reason: "no-db" });
  }

  const anonymousId = new URL(request.url).searchParams.get("anonymousId");
  if (!anonymousId) {
    return NextResponse.json({ error: "缺少 anonymousId" }, { status: 400 });
  }

  const { prisma } = await import("@/lib/prisma");
  const progress = await prisma.userProgress.findUnique({
    where: { anonymousId },
  });
  return NextResponse.json({ ok: true, progress });
}
