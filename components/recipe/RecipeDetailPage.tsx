'use client';

import Image from 'next/image';
import { Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../ui/button';
import { useToast } from '@/components/ui/use-toast';
import StarRatings from 'react-star-ratings';
import { Recipes } from '@/types';

type RecipeDetailPageParams = {
  recipe: Recipes;
};

export default function RecipeDetailPage({ recipe }: RecipeDetailPageParams) {
  const { toast } = useToast();

  const reviews = [
    'Món ăn ở đây không chỉ là để no bụng mà còn để thỏa mãn tâm hồn. Từ cách nấu cho đến cách trình bày thành phẩm, tất cả đều được thực hiện một cách cẩn thận và tỉ mỉ. Tôi sẽ thử công thức này ngay ngày mai.',
    'Nhìn thèm quá.',
    'Đã thử nấu và thấy rất ngon miệng, hương vị rất hấp dẫn.',
    `Món ${recipe?.name} này khiến mình thèm từ cái nhìn đầu tiên.`,
    'Không chỉ ngon miệng mà còn rất đẹp mắt nha.',
  ];

  if (!recipe) {
    return <div>No recipe found</div>;
  }

  return (
    <div className='container flex flex-col items-center pt-5'>
      <h1 className='text-5xl text-highlight'>{recipe.name}</h1>

      <div className='mb-32 mt-4 flex flex-col items-center justify-between space-x-2 sm:flex-row'>
        <Image
          src='/images/avatar_placeholder.png'
          alt='avatar'
          width={48}
          height={48}
        />

        <Minus className='hidden sm:block' />

        <p className='text-lg'>datphan</p>
      </div>

      <h1 className='mb-16 text-4xl text-highlight'>Các bước thực hiện</h1>

      <ul className='container'>
        {recipe.steps.map((step: any, index: any) => (
          <li
            key={index}
            className={`mb-16 flex items-center justify-between lg:space-x-10 ${
              index % 2 === 0
                ? 'flex-col lg:flex-row'
                : 'flex-col lg:flex-row-reverse lg:space-x-reverse'
            }`}
          >
            <div
              className={`flex flex-col items-center ${
                index % 2 === 0 ? 'lg:items-start' : 'lg:items-end'
              }`}
            >
              <Badge className='flex aspect-square w-12 justify-center rounded-lg text-4xl lg:w-14'>
                {index + 1}
              </Badge>

              <p className='mb-4 mt-4 text-center text-3xl font-bold'>
                {step.title}
              </p>

              <ul className='list-outside list-disc pb-6'>
                {step.descriptions.map((desc: any, descIndex: any) => (
                  <li key={descIndex}>{desc}</li>
                ))}
              </ul>
            </div>

            <div>
              <Image
                src={step.imageUrl}
                alt={`Image of step ${index + 1}`}
                width={700}
                height={400}
                className='rounded-2xl object-cover'
              />
            </div>
          </li>
        ))}
      </ul>

      <h1 className='mb-16 text-4xl text-highlight'>
        Ý kiến ({reviews.length})
      </h1>

      <div className='mb-16 grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle className='text-center'>
              Chia sẻ ý kiến về công thức
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Textarea className='text-base' />
          </CardContent>

          <CardFooter className='flex flex-row-reverse'>
            <Button
              className='md:text-lb bg-highlight text-base text-white'
              onClick={() => {
                toast({ title: 'Tính năng này hiện đang được phát triển.' });
              }}
            >
              Chia sẻ
            </Button>
          </CardFooter>
        </Card>

        {reviews.map((review, index) => (
          <Card className='flex flex-col rounded-2xl bg-gray-600' key={index}>
            <CardHeader>
              <div className='flex flex-row items-center space-x-2'>
                <Image
                  src='/images/avatar_placeholder.png'
                  alt='avatar'
                  width={60}
                  height={60}
                />

                <div>
                  <p className='text-lg'>user123</p>

                  <p className='opacity-75'>17:05 26/5/2023</p>

                  <StarRatings
                    rating={4.5}
                    starRatedColor='#FEBC0B'
                    starDimension='16px'
                    starSpacing='2px'
                    name='rating'
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p>{review}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
