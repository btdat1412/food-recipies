import Image from 'next/image';
import { Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Recipe = {
  id: string;
  name: string;
  image: string;
  kcal: number;
  recipeItems: { ingredientId: string; amount: string }[];
  rating: { quantity: number; average: number };
  steps: { title: string; imageUrl: string; descriptions: string[] }[];
} | null;

type RecipeDetailPageParams = {
  recipe: Recipe;
};

export default function RecipeDetailPage({ recipe }: RecipeDetailPageParams) {
  if (!recipe) {
    return <div>No recipe found</div>;
  }

  return (
    <div className='flex flex-col items-center pt-5'>
      <h1 className='text-6xl text-highlight'>{recipe.name}</h1>

      <div className='mb-32 mt-4 flex items-center justify-between space-x-2'>
        <Image
          src='/images/avatar_placeholder.png'
          alt='avatar'
          width={40}
          height={40}
          className='hidden md:block'
        />

        <Minus />

        <p className='text-lg'>datphan</p>
      </div>

      <h1 className='mb-16 text-4xl text-highlight'>Các bước thực hiện</h1>

      <ul className=''>
        {recipe.steps.map((step: any, index: any) => (
          <li key={index}>
            <Badge className='text-xl'>{index + 1}</Badge>

            <p>{step.title}</p>

            {step.descriptions.map((desc: any, descIndex: any) => (
              <p key={descIndex}>{desc}</p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
