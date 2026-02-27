import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrismaClient: PrismaClient | undefined;
}

export const prisma: PrismaClient = global.cachedPrismaClient ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" 
    ? ["query", "info", "warn", "error"]
    : ["warn", "error"],
});

if (process.env.NODE_ENV !== "production") {
  global.cachedPrismaClient = prisma;
}


