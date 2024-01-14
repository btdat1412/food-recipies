export interface Ingredient {
  id: string;
  type: string;
  name: string;
  kcal: number;
  image: string;
}

export interface Dish {
  id: number;
  rating: number;
  name: string;
  kcal: number;
  image: string;
}

export type InputIngredient = {
  name: string;
  quantity: string;
};

export type Step = {
  title: string;
  description: string;
  imageUrl: string;
};

export type Recipes = {
  id: string;
  image: string;
  kcal: number;
  name: string;
  difficulty: string;
  healthy: string;
  time: string;
  rating: {
    quantity: number;
    average: number;
  };
  recipeItems: { ingredientId: string; amount: string }[];
  steps: { title: string; imageUrl: string; descriptions: string[] }[];
} | null;