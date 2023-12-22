import PickIngredientsPage from '../components/ingredient/PickIngredientsPage';
import { db } from '../lib/prismaDb';

export default async function Home() {
  const ingredients = await db.ingredient.findMany();

  return <PickIngredientsPage ingredients={ingredients} />;
}
