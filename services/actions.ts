'use server';
import { db } from '@/lib/prismaDb';
import { Step } from '../types';

export async function addRecipe(recipeData: any) {
  try {
    const recipe = await db.recipe.create({
      data: {
        name: recipeData.name,
        image: recipeData.image,
        kcal: recipeData.kcal,
        rating: recipeData.rating,
        recipeItems: recipeData.ingredients.map((ingredient: any) => ({
          amount: ingredient.amount,
          ingredientId: ingredient.ingredientId,
        })),
        steps: recipeData.steps.map((step: Step) => ({
          title: step.title,
          descriptions: [step.description],
          imageUrl: step.imageUrl,
        })),
      },
    });
    return recipe;
  } catch (error) {
    console.error('Failed to add recipe:', error);
    throw error;
  }
}

export async function createIngredient(ingredientData: any) {
  try {
    const ingredient = await db.ingredient.create({
      data: {
        name: ingredientData.name,
        image: ingredientData.image,
        kcal: ingredientData.kcal,
        type: ingredientData.type,
      },
    });
    return ingredient;
  } catch (error) {
    console.error('Failed to create ingredient:', error);
    throw error;
  }
}
