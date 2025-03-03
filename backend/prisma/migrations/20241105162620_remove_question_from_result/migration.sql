/*
  Warnings:

  - You are about to drop the column `questionId` on the `Result` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentID,examID,examAttemptID]` on the table `Result` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_questionId_fkey";

-- DropIndex
DROP INDEX "Result_studentID_examID_examAttemptID_questionId_key";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "questionId";

-- CreateIndex
CREATE UNIQUE INDEX "Result_studentID_examID_examAttemptID_key" ON "Result"("studentID", "examID", "examAttemptID");
