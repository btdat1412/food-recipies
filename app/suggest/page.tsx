import SuggestPage from '@/components/suggest-page/SuggestPage';
import { getAllIngredients, getAllRecipes } from '@/services';

export default async function Suggest() {
  const ingredients = await getAllIngredients();
  const recipes = await getAllRecipes();

  return (
    <SuggestPage
      ingredients={ingredients.ingredients}
      recipes={recipes.recipes}
    />
  );
}
