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

import RecipeDialog from '@/components/RecipeDialog';

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
  return (
    <Card className='flex flex-col rounded-2xl border-highlight'>
      <CardHeader className='flex flex-row justify-center p-2'>
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
      <CardFooter className='dark:text- rounded-b-2xl bg-[#FAE0DB] p-3 text-highlight underline dark:bg-[#50343A]'>
        {/* <p className='w-full cursor-pointer text-center' onClick={onClick}>Xem chi tiết</p> */}
        <RecipeDialog
          name={name}
          image={image}
          rating={rating}
          ingredients={ingredients}
          steps={steps}
          stepDescription={stepDescription}
        />
      </CardFooter>
    </Card>
  );
};

export default DishCard;
