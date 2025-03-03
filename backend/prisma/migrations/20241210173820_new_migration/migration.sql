/*
  Warnings:

  - You are about to drop the column `examId` on the `StudentExam` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentID,examID]` on the table `StudentExam` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `examID` to the `StudentExam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudentExam" DROP CONSTRAINT "StudentExam_examId_fkey";

-- DropIndex
DROP INDEX "StudentExam_studentID_examId_key";

-- AlterTable
ALTER TABLE "StudentExam" DROP COLUMN "examId",
ADD COLUMN "examID" TEXT NOT NULL DEFAULT 'temporary_exam_id';


-- CreateIndex
CREATE UNIQUE INDEX "StudentExam_studentID_examID_key" ON "StudentExam"("studentID", "examID");

-- AddForeignKey
ALTER TABLE "StudentExam" ADD CONSTRAINT "StudentExam_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("examID") ON DELETE RESTRICT ON UPDATE CASCADE;
