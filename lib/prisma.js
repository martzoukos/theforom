import { PrismaClient, Prisma as PrismaNamespace } from '@prisma/client';

let prisma, prismaNamespace;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  prismaNamespace = PrismaNamespace
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
    global.prismaNamespace = PrismaNamespace
  }
  prisma = global.prisma;
  prismaNamespace = global.prismaNamespace;
}

export {prisma}
export {prismaNamespace}
