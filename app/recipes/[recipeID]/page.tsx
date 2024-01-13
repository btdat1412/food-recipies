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

  // Convert the BigInt string to a number
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
