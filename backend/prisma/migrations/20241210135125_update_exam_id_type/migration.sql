-- DropForeignKey
ALTER TABLE "ExamAttempt" DROP CONSTRAINT "ExamAttempt_examID_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_examID_fkey";

-- AlterTable
ALTER TABLE "ExamAttempt" ALTER COLUMN "examID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Result" ALTER COLUMN "examID" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("examID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("examID") ON DELETE RESTRICT ON UPDATE CASCADE;
