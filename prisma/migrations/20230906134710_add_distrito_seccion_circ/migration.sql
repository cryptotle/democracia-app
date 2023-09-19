/*
  Warnings:

  - You are about to drop the column `nro_mesa` on the `Fiscales` table. All the data in the column will be lost.
  - Added the required column `circ` to the `Denuncias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distrito` to the `Denuncias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seccion` to the `Denuncias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Denuncias" ADD COLUMN     "circ" INTEGER NOT NULL,
ADD COLUMN     "distrito" INTEGER NOT NULL,
ADD COLUMN     "seccion" INTEGER NOT NULL,
ALTER COLUMN "pregunta3" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Fiscales" DROP COLUMN "nro_mesa",
ADD COLUMN     "circ" INTEGER,
ADD COLUMN     "distrito" INTEGER,
ADD COLUMN     "nroMesa" INTEGER,
ADD COLUMN     "seccion" INTEGER;
