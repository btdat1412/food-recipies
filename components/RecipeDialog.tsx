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

type RecipeDialogProps = {
  name: string;
  image: string;
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
  ingredients,
  steps,
  stepDescription,
}: RecipeDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className='w-full cursor-pointer text-center'>Xem chi tiết</p>
      </DialogTrigger>
      {/* <DialogContent className='sm:max-w-[425px]'> */}
      <DialogContent className='max-h-screen overflow-auto sm:max-w-[80vw]'>
        <DialogHeader className='pb-3'>
          <DialogTitle>
            <h1 className='text-center text-3xl text-hightlight'>{name}</h1>
          </DialogTitle>
        </DialogHeader>

        <div className='grid grid-cols-4'>
          <div className='flex flex-col items-center'>
            <Image src={image} alt={name} width={250} height={250} />

            <h3 className='text-2xl text-hightlight'>Người chia sẻ</h3>
            <Image
              src='/images/avatar_placeholder.png'
              alt='avatar'
              width={50}
              height={50}
              className='hidden md:block'
            />

            <h3 className='text-2xl text-hightlight'>Đánh giá công thức</h3>
          </div>

          <div className='col-span-3'>
            <div className='grid grid-cols-12'>
              <div></div>
              <div className='col-span-11'>
                <h3 className='text-2xl text-hightlight'>Nguyên liệu</h3>

                <ul className='list-inside list-disc pb-3'>
                  {ingredients.map((item, index) => (
                    <li key={index} className='text-lg'>
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className='text-2xl text-hightlight'>Công thức</h3>
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
