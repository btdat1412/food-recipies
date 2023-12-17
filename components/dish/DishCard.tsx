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
    [key: string]: string;
  };
  stepDescription: {
    [key: string]: string[];
  };
  onClick: () => void;
};

const DishCard = ({
  image,
  name,
  rating,
  kcal,
  ingredients,
  steps,
  stepDescription,
  onClick,
}: IngredientsCardProps) => {
  return (
    <Card className='flex flex-col rounded-2xl border-hightlight'>
      <CardHeader className='flex flex-row justify-center p-0'>
        <Image src={image} alt={name} width={130} height={130} className='' />
      </CardHeader>
      <CardContent className='flex-1 text-center'>
        <CardTitle className='text-xl md:text-2xl'>{name}</CardTitle>
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
      <CardFooter
        className='dark:text- rounded-b-2xl bg-[#FAE0DB] p-3 text-hightlight underline dark:bg-[#50343A]'
        onClick={onClick}
      >
        {/* <p className='w-full cursor-pointer text-center' onClick={onClick}>Xem chi tiết</p> */}
        <RecipeDialog
          name={name}
          image={image}
          ingredients={ingredients}
          steps={steps}
          stepDescription={stepDescription}
        />
      </CardFooter>
    </Card>
  );
};

export default DishCard;
