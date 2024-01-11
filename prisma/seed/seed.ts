import { PrismaClient } from '@prisma/client';
import ingredientsData from '../../fakedb/ingredients.json';
import recipesData from '../../fakedb/seedRecipes.json';

const prisma = new PrismaClient();

async function seedIngredients() {
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

async function seedRecipes() {
  for (const recipeData of recipesData) {
    const recipeItems = recipeData.recipeItems.map((item) => ({
      ingredientId: item.ingredientId,
      amount: item.amount,
    }));

    const steps = recipeData.steps.map((step) => ({
      title: step.title,
      imageUrl: step.imageUrl,
      descriptions: step.descriptions,
    }));

    await prisma.recipe.create({
      data: {
        name: recipeData.name,
        image: recipeData.image,
        kcal: recipeData.kcal,
        rating: {
          quantity: recipeData.rating.quantity,
          average: recipeData.rating.average,
        },
        recipeItems,
        steps,
      },
    });
  }
}

async function main() {
  // await seedIngredients();
  await seedRecipes();
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