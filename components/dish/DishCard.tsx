'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import StarRatings from 'react-star-ratings';

import RecipeDialog from '@/components/recipe/RecipeDialog';
import { useState } from 'react';
import Link from 'next/link';

type IngredientsCardProps = {
  image: string;
  name: string;
  rating: number;
  kcal: number;
  ingredients: string[];
  steps: {
    [key: string]: string | undefined;
  };
  stepDescription: {
    [key: string]: string[] | undefined;
  };
};

const DishCard = ({
  image,
  name,
  rating,
  kcal,
  ingredients,
  steps,
  stepDescription,
}: IngredientsCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className='flex cursor-pointer flex-col rounded-2xl border-highlight'>
      <CardHeader
        className='flex flex-row justify-center p-2'
        onClick={() => setOpen(true)}
      >
        <Image src={image} alt={name} width={130} height={130} className='' />
      </CardHeader>
      <CardContent className='flex flex-1 flex-col text-center'>
        <CardTitle className='flex-1 text-xl md:text-2xl'>{name}</CardTitle>
        <CardDescription className='text-sm text-text'>
          {kcal} kcal
        </CardDescription>
        <StarRatings
          rating={rating}
          starRatedColor='#FEBC0B'
          starDimension='16px'
          starSpacing='2px'
          name='rating'
        />
      </CardContent>
      <CardFooter className='dark:text- cursor-default rounded-b-2xl bg-[#FAE0DB] p-3 text-highlight underline dark:bg-[#50343A]'>
        <p className='w-full text-center'>
          <Link href='/recipes/65945e825ad1ae5006790515'>Xem chi tiết</Link>
        </p>
      </CardFooter>

      <RecipeDialog
        open={open}
        onOpenChange={setOpen}
        name={name}
        image={image}
        rating={rating}
        ingredients={ingredients}
        steps={steps}
        stepDescription={stepDescription}
      />
    </Card>
  );
};

export default DishCard;
