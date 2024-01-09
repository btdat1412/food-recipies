import { db } from '@/lib/prismaDb';

export const getAllIngredients = async () => {
  const ingredients = await db.ingredient.findMany();
  return ingredients;
};
