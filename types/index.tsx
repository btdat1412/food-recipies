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
