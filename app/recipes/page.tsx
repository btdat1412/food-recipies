'use client';
import { useState } from 'react';
import { Search as SearchButton } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown, Plus } from 'lucide-react';
import dishesData from '../../fakedb/dishes.json';
import DishCard from '@/components/dish/DishCard';
import { Card } from '@/components/ui/card';

import { ShareDialog } from '@/components/ShareDialog';

let timeoutId: ReturnType<typeof setTimeout>;

export default function Recipes() {
  const [filterDishes, setFilterDishes] = useState(dishesData);

  const handleSearch = (term: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setFilterDishes(
        dishesData.filter((d) => d.name.toLowerCase().includes(term))
      );
    }, 500);
  };

  return (
    <div className=' h-full w-full flex-1 overflow-y-auto px-12 py-10'>
      <div className='flex justify-between'>
        <h1 className='text-3xl'>Công thức</h1>
        <div className='flex gap-4'>
          <div className='relative'>
            <SearchButton
              className='absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500'
              size={20}
            />
            <Input
              className='pl-10 dark:bg-[#2d303e]'
              placeholder='Tìm kiếm món ăn...'
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div>
            <Button
              className='bg-white text-sm dark:bg-[#2D303E]'
              size={'default'}
              variant='secondary'
            >
              <Filter className='mr-2 h-4 w-4' />
              Lọc
            </Button>
          </div>
        </div>
      </div>
      <div className='p-5'>
        <div className='mb-5 flex gap-6 text-[#5B5B5B]'>
          <Button
            className='flex items-center bg-white text-sm dark:bg-[#2D303E]'
            size={'default'}
            variant='secondary'
          >
            <ChevronDown className='mr-2 h-4 w-4' />
            Buổi
          </Button>
          <Button
            className='flex items-center bg-white text-sm dark:bg-[#2D303E]'
            size={'default'}
            variant='secondary'
          >
            <ChevronDown className='mr-2 h-4 w-4' />
            Độ khó
          </Button>
          <Button
            className='bg-white text-sm dark:bg-[#2D303E]'
            size={'default'}
            variant='secondary'
          >
            <ChevronDown className='mr-2 h-4 w-4' />
            Độ lành mạnh
          </Button>
          <Button
            className='bg-white text-sm dark:bg-[#2D303E]'
            size={'default'}
            variant='secondary'
          >
            <ChevronDown className='mr-2 h-4 w-4' />
            Hàm lượng calories
          </Button>
        </div>
        <div className='grid-custom gap-5'>
          {/* <Card
            className='flex min-h-[250px] cursor-pointer flex-col items-center justify-center rounded-2xl border-dashed border-highlight text-highlight'
            onClick={() => console.log('Open modal share')}
          >
            <Plus className='mb-2 h-6 w-6' />
            <p>Chia sẻ công thức</p>
          </Card> */}
          <ShareDialog />
          {filterDishes.map((item, index) => (
            <DishCard
              key={index}
              image={item.image}
              rating={item.rating}
              name={item.name}
              kcal={item.kcal}
              ingredients={item.ingredients}
              steps={item.steps}
              stepDescription={item.stepDescription}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
