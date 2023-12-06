'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

type IngredientsCardProps = {
  image: string;
  name: string;
  kcal: string;
};

const IngredientsCard = ({ image, name, kcal }: IngredientsCardProps) => {
  return (
    <div className='relative mt-4 flex h-60 w-44 flex-col items-center bg-inherit md:mt-6 md:h-[260px] md:w-48 '>
      <Image
        src={image}
        alt={name}
        width={150}
        height={150}
        className='absolute top-0 z-10'
      />
      <Card className='mt-auto flex h-56 w-44 flex-col rounded-2xl bg-darkbg md:h-[226px] md:w-48'>
        <CardContent className='mt-auto pb-0'>
          <CardHeader className='flex flex-col items-center pb-9'>
            <CardTitle className='text-xl'>{name}</CardTitle>
            <CardDescription className='text-xl'>{kcal} kcal</CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
};

export default IngredientsCard;
