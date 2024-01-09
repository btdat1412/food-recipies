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

  return <RecipeDetailPage recipe={recipe} />;
}
