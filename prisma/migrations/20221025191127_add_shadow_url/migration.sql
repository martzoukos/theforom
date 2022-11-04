/*
  Warnings:

  - You are about to drop the column `contentJSON` on the `Post` table. All the data in the column will be lost.
  - The `content` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "contentJSON",
DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL DEFAULT '{}';
