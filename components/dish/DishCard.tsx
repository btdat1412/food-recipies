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
import Link from 'next/link';

type IngredientsCardProps = {
  id: string;
  image: string;
  name: string;
  rating: number;
  kcal: number;
  onClick: () => void;
};

const DishCard = ({
  id,
  image,
  name,
  rating,
  kcal,
  onClick,
}: IngredientsCardProps) => {
  return (
    <Card className='flex cursor-pointer flex-col rounded-2xl border-highlight'>
      <CardHeader
        className='flex flex-row justify-center p-2'
        onClick={onClick}
      >
        <Image
          src={image}
          alt={name}
          width={130}
          height={130}
          className='min-h-[130px] min-w-[130px] rounded-[65px]'
        />
      </CardHeader>
      <CardContent className='flex flex-1 flex-col text-center'>
        <CardTitle className='flex-1 pb-1 text-xl !leading-7 md:text-2xl'>
          {name}
        </CardTitle>
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
          <Link href={`/recipes/${id}`}>Xem chi tiết</Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default DishCard;
