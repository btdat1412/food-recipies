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
    // <div className='flex flex-col items-center pt-5'>
    <div className='container flex flex-col items-center pt-5'>
      <h1 className='text-5xl text-highlight'>{recipe.name}</h1>

      <div className='mb-32 mt-4 flex flex-col items-center justify-between space-x-2 sm:flex-row'>
        <Image
          src='/images/avatar_placeholder.png'
          alt='avatar'
          width={40}
          height={40}
        />

        <Minus className='hidden sm:block' />

        <p className='text-lg'>datphan</p>
      </div>

      <h1 className='mb-16 text-4xl text-highlight'>Các bước thực hiện</h1>

      <ul className=''>
        {recipe.steps.map((step: any, index: any) => (
          <li
            key={index}
            className={`mb-16 flex items-center space-x-8 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse space-x-reverse'
            }`}
          >
            <div className=''>
              <Badge className='text-4xl font-extrabold'>{index + 1}</Badge>

              <p className='mb-4 mt-4 text-3xl font-bold'>{step.title}</p>

              <ul className='list-inside list-disc pb-6 indent-6'>
                {step.descriptions.map((desc: any, descIndex: any) => (
                  <li key={descIndex}>{desc}</li>
                ))}
              </ul>
            </div>

            <Image
              src={step.imageUrl}
              alt={`Image of step ${index + 1}`}
              width={600}
              height={400}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
