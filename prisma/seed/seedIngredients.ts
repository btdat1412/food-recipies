import { PrismaClient } from '@prisma/client';
import ingredientsData from '../../fakedb/ingredients.json';

const prisma = new PrismaClient();

async function main() {
  for (const ingredient of ingredientsData) {
    await prisma.ingredient.create({
      data: {
        image: ingredient.image,
        name: ingredient.name,
        kcal: ingredient.kcal,
        type: ingredient.type,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
