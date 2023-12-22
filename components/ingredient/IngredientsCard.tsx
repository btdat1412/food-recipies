'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import clsx from 'clsx';

type IngredientsCardProps = {
  image: string;
  name: string;
  kcal: number;
  isSelected: boolean;
  onClick: () => void;
};

const IngredientsCard = ({
  image,
  name,
  kcal,
  isSelected,
  onClick,
}: IngredientsCardProps) => {
  const handleCardClick = () => {
    onClick();
  };

  const cardClasses = clsx(
    'absolute bottom-0 flex h-56 flex-col rounded-2xl md:min-h-[226px] w-full transition-bg duration-300',
    {
      'bg-hightlight': isSelected,
      'bg-default': !isSelected,
    }
  );
  return (
    <div
      className='relative mt-4 flex h-60 cursor-pointer flex-col items-center bg-inherit md:mt-6 md:min-h-[260px]'
      onClick={handleCardClick}
    >
      <Image src={image} alt={name} width={130} height={130} className='z-10' />
      <Card className={cardClasses}>
        <CardContent className='mt-auto pb-0'>
          <CardHeader className='flex flex-col items-center px-0 pb-6 text-center md:pb-9'>
            <CardTitle className='text-xl md:text-2xl'>{name}</CardTitle>
            <CardDescription className='text-sm text-text'>
              {kcal} kcal
            </CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
};

export default IngredientsCard;
