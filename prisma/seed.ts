import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.note.upsert({
    where: { id: "seed-welcome" },
    update: {},
    create: {
      id: "seed-welcome",
      title: "Welcome to AI Workspace",
      content:
        "This is your AI workspace. Add prompts, notes, and instructions here. Use this area to keep track of ideas and experiments.",
    },
  });
  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
