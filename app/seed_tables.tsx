import { PrismaClient, Prisma } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  await prisma.user.create({
    data: {
      email: "test@mail.com",
      password: "password"
    }
  });

  await prisma.collection.createMany({
    data: [
      { name: "bash", imgPath: "icons/code.png" },
      { name: "python", imgPath: "icons/code.png" },
      { name: "windows", imgPath: "icons/code.png" },
      { name: "JavaScript", imgPath: "icons/code.png" },
      { name: "C", imgPath: "icons/code.png" },
      { name: "Networking", imgPath: "icons/code.png" },
      { name: "SQL", imgPath: "icons/code.png" },
      { name: "SysAdmin", imgPath: "icons/code.png" },
    ]
  });
}

main();
