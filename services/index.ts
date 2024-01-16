'use server';
import { db } from '@/lib/prismaDb';

export const getAllIngredients = async () => {
  const ingredients = await db.ingredient.findMany();
  return {
    ingredients,
    revalidate: 10,
  };
};

export const getAllRecipes = async () => {
  const recipes = await db.recipe.findMany();
  return {
    recipes,
    revalidate: 10,
  };
};
