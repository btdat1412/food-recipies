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
import { Minus, Play } from 'lucide-react';
import StarRatings from 'react-star-ratings';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Recipes } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getIngredientName } from '@/services/actions';

type RecipeDialogProps = {
  recipe: Recipes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const RecipeDialog = ({ recipe, open, onOpenChange }: RecipeDialogProps) => {
  const { toast } = useToast();
  const { id, name, image, rating, recipeItems, steps } = recipe || {};
  const [ingredients, setIngredients] = useState<
    { name: string; amount: string }[]
  >([]);

  useEffect(() => {
    if (recipeItems) {
      Promise.all(
        recipeItems.map(async (item) => {
          const name = await getIngredientName(item.ingredientId);
          return { name, amount: item.amount };
        })
      ).then(setIngredients);
    }
  }, [recipeItems]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-auto sm:max-w-[80vw] md:max-w-[65vw]'>
        {/* name */}
        <DialogHeader className='pb-3'>
          <DialogTitle>
            <h1 className='text-center text-3xl text-highlight'>{name}</h1>
          </DialogTitle>
        </DialogHeader>

        <div className='grid grid-cols-1 xl:grid-cols-4'>
          {/* 1st column */}
          <div className='flex flex-col items-center pb-6'>
            <Image
              src={image || 'https://via.placeholder.com/400'}
              alt={name || ''}
              width={250}
              height={250}
            />

            <h3 className='pb-2 pt-2 text-2xl text-highlight'>Người chia sẻ</h3>

            <div className='flex items-center justify-between space-x-2 pb-6'>
              <Image
                src='/images/avatar_placeholder.png'
                alt='avatar'
                width={40}
                height={40}
                className='hidden md:block'
              />
              <Minus />
              <p>User12345</p>
            </div>

            <h3 className='pb-2 text-2xl text-highlight'>Đánh giá công thức</h3>

            <div className='flex items-center pb-2'>
              <StarRatings
                starDimension='16px'
                starSpacing='2px'
                name='rating'
              />

              <Button
                className='ml-2 bg-[#FEBC0B] text-sm text-white md:text-xl'
                size={'sm'}
                onClick={() => {
                  toast({ title: 'Tính năng này hiện đang được phát triển.' });
                }}
              >
                Gửi
              </Button>
            </div>

            <p className='text-lg'>
              <span className='text-[#FEBC0B]'>{rating?.average}</span> / 5
            </p>

            <a
              className='cursor-pointer select-none text-lg italic text-highlight underline'
              onClick={() => {
                toast({ title: 'Tính năng này hiện đang được phát triển.' });
              }}
            >
              Đánh giá chi tiết
            </a>
          </div>

          {/* 2nd column */}
          <div className='col-span-3'>
            <div className='grid grid-cols-12'>
              {/* 1st small column (empty column) */}
              <div></div>

              {/* 2nd small column */}
              <div className='col-span-11'>
                <h3 className='text-2xl text-highlight'>Nguyên liệu</h3>

                <ul className='list-inside list-disc pb-6 indent-6'>
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className='text-lg'>
                      {ingredient.name} - {ingredient.amount}
                    </li>
                  ))}
                </ul>

                <div className='mb-2 flex items-center'>
                  <h3 className='text-2xl text-highlight'>Công thức</h3>

                  <Link href={`/recipes/${id}`}>
                    <Button className='ml-12 animate-bounce bg-highlight text-sm text-white md:text-xl'>
                      Xem chi tiết các bước
                      <Play className='ml-1 h-4 w-4 md:h-6 md:w-6' />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <ul>
              {steps &&
                steps.map((step, index) => (
                  <li
                    key={index}
                    className='mb-4 grid grid-cols-12 gap-4 text-lg'
                  >
                    <div className='justify-self-end'>
                      <Badge className='aspect-square rounded-lg text-xl'>
                        {index + 1}
                      </Badge>
                    </div>

                    <div className='col-span-11'>
                      <h3 className='pb-2 text-xl'>{step.title}</h3>

                      <ul className='list-inside list-disc pb-4 indent-6'>
                        {step.descriptions.map((description, i) => (
                          <li key={i}>{description}</li>
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
