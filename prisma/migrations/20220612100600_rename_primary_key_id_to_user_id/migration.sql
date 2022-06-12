/*
  Warnings:

  - The primary key for the `UserModel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserModel" DROP CONSTRAINT "UserModel_pkey",
DROP COLUMN "id",
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD CONSTRAINT "UserModel_pkey" PRIMARY KEY ("user_id");
