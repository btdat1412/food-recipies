'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Minus } from 'lucide-react';
import StarRatings from 'react-star-ratings';
import { Button } from '@/components/ui/button';

type RecipeDialogProps = {
  name: string;
  image: string;
  rating: number;
  ingredients: string[];
  steps: {
    [key: string]: string;
  };
  stepDescription: {
    [key: string]: string[];
  };
};

const RecipeDialog = ({
  name,
  image,
  rating,
  ingredients,
  steps,
  stepDescription,
}: RecipeDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className='w-full cursor-pointer text-center'>Xem chi tiết</p>
      </DialogTrigger>
      {/* sm:max-w-[425px] */}
      <DialogContent className='max-h-screen overflow-auto sm:max-w-[80vw]'>
        <DialogHeader className='pb-3'>
          <DialogTitle>
            <h1 className='text-highlight text-center text-3xl'>{name}</h1>
          </DialogTitle>
        </DialogHeader>

        <div className='grid grid-cols-1 xl:grid-cols-4'>
          <div className='flex flex-col items-center pb-6'>
            <Image src={image} alt={name} width={250} height={250} />

            <h3 className='text-highlight pb-2 pt-2 text-2xl'>Người chia sẻ</h3>

            <div className='flex items-center justify-between pb-6'>
              <Image
                src='/images/avatar_placeholder.png'
                alt='avatar'
                width={50}
                height={50}
                className='hidden md:block'
              />

              <Minus />

              <p>User12345</p>
            </div>

            <h3 className='text-highlight pb-2 text-2xl'>Đánh giá công thức</h3>

            <div className='flex items-center pb-2'>
              <StarRatings
                starDimension='16px'
                starSpacing='2px'
                name='rating'
              />

              <Button
                className='ml-2 bg-[#FEBC0B] text-sm text-white md:text-xl'
                size={'sm'}
              >
                Gửi
              </Button>
            </div>

            <p className='text-lg'>
              <span className='text-[#FEBC0B]'>{rating}</span> / 5
            </p>

            <a
              className='text-highlight cursor-pointer select-none text-lg italic underline'
              onClick={() => {
                console.log('Đánh giá chi tiết');
              }}
            >
              Đánh giá chi tiết
            </a>
          </div>

          <div className='col-span-3'>
            <div className='grid grid-cols-12'>
              <div></div>
              <div className='col-span-11'>
                <h3 className='text-highlight text-2xl'>Nguyên liệu</h3>

                <ul className='list-inside list-disc pb-3'>
                  {ingredients.map((item, index) => (
                    <li key={index} className='text-lg'>
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className='text-highlight text-2xl'>Công thức</h3>
              </div>
            </div>

            <ul>
              {Object.entries(steps).map(([key, value], index) => (
                <li key={index} className='grid grid-cols-12 gap-4 text-lg'>
                  <div className='justify-self-end'>
                    <Badge className='text-xl'>{key}</Badge>
                  </div>

                  <div className='col-span-11'>
                    <h3 className='pb-2 text-xl'>{value}</h3>

                    <ul className='list-inside list-disc pb-4'>
                      {stepDescription[key].map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDialog;
