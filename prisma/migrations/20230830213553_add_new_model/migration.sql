-- CreateTable
CREATE TABLE "Denuncias" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nroMesa" INTEGER NOT NULL,
    "pregunta1" TEXT NOT NULL,
    "pregunta2" TEXT NOT NULL,
    "pregunta3" TEXT NOT NULL,
    "image" BYTEA,

    CONSTRAINT "Denuncias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fiscales" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "idPartido" TEXT NOT NULL,
    "foto_dni" BYTEA,
    "fiscalizado" BOOLEAN NOT NULL DEFAULT false,
    "foto_poder_fiscal" BYTEA,
    "foto_selfie_mesa" BYTEA,
    "nro_mesa" INTEGER,
    "colegio" TEXT,

    CONSTRAINT "Fiscales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partido" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "Partido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Denuncias_user_id_key" ON "Denuncias"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Partido_id_key" ON "Partido"("id");

-- AddForeignKey
ALTER TABLE "Denuncias" ADD CONSTRAINT "Denuncias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fiscales" ADD CONSTRAINT "Fiscales_idPartido_fkey" FOREIGN KEY ("idPartido") REFERENCES "Partido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fiscales" ADD CONSTRAINT "Fiscales_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
