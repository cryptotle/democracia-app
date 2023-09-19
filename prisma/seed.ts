
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { PARTIDOS_POLITICOS } from "./partidos";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("password123", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin",
      password,
      emailConfirmed: true,
    },
  });
  console.log({ user });

  const partidosData = PARTIDOS_POLITICOS;

  const createdPartidos = await prisma.partido.createMany({
    data: partidosData,
  });

  console.log({ createdPartidos });



}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
