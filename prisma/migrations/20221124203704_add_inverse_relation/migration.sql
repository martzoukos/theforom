/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Thread` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_categoryId_fkey";

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "CategoriesOnThreads" (
    "threadId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoriesOnThreads_pkey" PRIMARY KEY ("threadId","categoryId")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnThreads" ADD CONSTRAINT "CategoriesOnThreads_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnThreads" ADD CONSTRAINT "CategoriesOnThreads_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
