-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_examID_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "examID" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("examID") ON DELETE RESTRICT ON UPDATE CASCADE;
