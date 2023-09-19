/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Fiscales` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Fiscales_user_id_key" ON "Fiscales"("user_id");
