export interface Ingredient {
  id: number;
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
