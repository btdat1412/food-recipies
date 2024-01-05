import { db } from '../../../lib/prismaDb';
import RecipeDetailPage from '@/components/recipe/RecipeDetailPage';

export default async function RecipeDetail({
  params,
}: {
  params: { recipeID: string };
}) {
  const recipes = await db.recipe.findMany();

  return <RecipeDetailPage recipeID={params.recipeID} />;
}
