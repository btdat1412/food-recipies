import TestComponent from '../../components/TestComponent';
import { db } from '../../lib/prismaDb';

export default async function Test() {
  const ingredients = await db.ingredient.findMany();

  const recipes = await db.recipe.findMany();

  return <TestComponent ingredients={ingredients} recipes={recipes} />;
}