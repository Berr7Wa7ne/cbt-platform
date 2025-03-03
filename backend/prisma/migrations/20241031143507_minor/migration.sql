/*
  Warnings:

  - A unique constraint covering the columns `[studentID,examID,examAttemptID,questionId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Result_studentID_examID_examAttemptID_questionId_key" ON "Result"("studentID", "examID", "examAttemptID", "questionId");
