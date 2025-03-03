/*
  Warnings:

  - You are about to drop the column `examId` on the `Result` table. All the data in the column will be lost.
  - Added the required column `examID` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_examId_fkey";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "examId",
ADD COLUMN     "examID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("examID") ON DELETE RESTRICT ON UPDATE CASCADE;
