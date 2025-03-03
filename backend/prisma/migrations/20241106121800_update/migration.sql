/*
  Warnings:

  - Added the required column `courseTitle` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credits` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examDate` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examTitle` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "courseTitle" TEXT NOT NULL,
ADD COLUMN     "credits" INTEGER NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "examDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "examTitle" TEXT NOT NULL,
ADD COLUMN     "level" INTEGER NOT NULL;
