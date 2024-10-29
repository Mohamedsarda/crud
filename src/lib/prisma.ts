// prismaClient.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to store the Prisma client
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
} else {
  // In production mode, create a new Prisma client instance
  prisma = new PrismaClient();
}

export default prisma;
