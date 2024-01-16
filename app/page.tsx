import PickIngredientsPage from '../components/ingredient/PickIngredientsPage';
import { getAllIngredients } from '../services';

export default async function Home() {
  const ingredients = await getAllIngredients();

  return <PickIngredientsPage ingredients={ingredients.ingredients} />;
}
