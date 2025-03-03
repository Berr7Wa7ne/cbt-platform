/*
  Warnings:

  - Changed the type of `examID` on the `Result` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_examID_fkey";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "examID",
ADD COLUMN     "examID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Result_studentID_examID_examAttemptID_questionId_key" ON "Result"("studentID", "examID", "examAttemptID", "questionId");

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
