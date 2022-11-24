/*
  Warnings:

  - You are about to drop the column `threadId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_threadId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "threadId";

-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
