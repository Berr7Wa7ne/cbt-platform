/*
  Warnings:

  - You are about to drop the column `examId` on the `Enrollment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_examId_fkey";

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "examId",
ADD COLUMN     "examID" TEXT;

-- AlterTable
ALTER TABLE "StudentExam" ALTER COLUMN "examID" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("examID") ON DELETE SET NULL ON UPDATE CASCADE;
