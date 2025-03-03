/*
  Warnings:

  - A unique constraint covering the columns `[studentID,examID,questionID]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Answer_studentID_examID_questionID_key" ON "Answer"("studentID", "examID", "questionID");
