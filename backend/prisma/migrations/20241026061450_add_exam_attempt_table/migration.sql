/*
  Warnings:

  - Added the required column `examAttemptID` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "examAttemptID" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ExamAttempt" (
    "id" SERIAL NOT NULL,
    "studentID" INTEGER NOT NULL,
    "examID" INTEGER NOT NULL,
    "examDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalScore" INTEGER NOT NULL,
    "grade" TEXT NOT NULL,

    CONSTRAINT "ExamAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExamAttempt_studentID_examID_key" ON "ExamAttempt"("studentID", "examID");

-- AddForeignKey
ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_examAttemptID_fkey" FOREIGN KEY ("examAttemptID") REFERENCES "ExamAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
