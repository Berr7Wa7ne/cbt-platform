-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_examID_fkey";

-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "examID" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exam"("examID") ON DELETE RESTRICT ON UPDATE CASCADE;
