import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/** 是否配置了数据库。未配置时进度仅存于浏览器 localStorage。 */
export const hasDatabase = Boolean(process.env.DATABASE_URL);
