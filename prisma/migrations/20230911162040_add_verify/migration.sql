/*
  Warnings:

  - Added the required column `updatedAt` to the `Denuncias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Fiscales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nroLista` to the `Partido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Denuncias" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Fiscales" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Partido" ADD COLUMN     "nroLista" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "VerificationRequest" ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailConfirmed" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "VerificationRequest" ADD CONSTRAINT "VerificationRequest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
