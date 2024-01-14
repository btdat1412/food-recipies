import { db } from '../../../lib/prismaDb';
import RecipeDetailPage from '@/components/recipe/RecipeDetailPage';

export default async function RecipeDetail({
  params,
}: {
  params: { recipeID: string };
}) {
  const recipe = await db.recipe.findUnique({
    where: {
      id: params.recipeID,
    },
  });

  if (!recipe) {
    return <div>Loading...</div>;
  }

  // Convert the rating quantity from a BigInt (string) to a number (int
  const quantity = Number(recipe.rating.quantity);

  const modifiedRecipe = {
    ...recipe,
    rating: {
      ...recipe.rating,
      quantity: quantity,
    },
  };

  return <RecipeDetailPage recipe={modifiedRecipe} />;
}
