/*
  Warnings:

  - You are about to drop the column `image` on the `Denuncias` table. All the data in the column will be lost.
  - You are about to drop the column `foto_poder_fiscal` on the `Fiscales` table. All the data in the column will be lost.
  - You are about to drop the column `foto_selfie_mesa` on the `Fiscales` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Denuncias" DROP COLUMN "image",
ADD COLUMN     "imagen_url" TEXT;

-- AlterTable
ALTER TABLE "Fiscales" DROP COLUMN "foto_poder_fiscal",
DROP COLUMN "foto_selfie_mesa",
ADD COLUMN     "foto_poder_fiscal_url" TEXT,
ADD COLUMN     "foto_selfie_mesa_url" TEXT,
ALTER COLUMN "foto_dni" SET DATA TYPE TEXT;
