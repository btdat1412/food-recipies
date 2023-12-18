'use client';
import IngredientsPick from '@/components/ingredient/IngredientsPick';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Ingredient } from '@/types';
import { Search as SearchButton } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown } from 'lucide-react';
import ingredientsData from '../../fakedb/ingredients.json';
import dishesData from '../../fakedb/recipes.json';
import DishCard from '@/components/dish/DishCard';

let timeoutId: ReturnType<typeof setTimeout>;

export default function Suggest() {
  const searchParams = useSearchParams();
  const ingredientsId = searchParams.get('ingredients')?.split(',').map(Number);
  const [selectedIngredients, setSelectedIngredients] = useState(
    ingredientsData.filter((i) => ingredientsId?.includes(i.id))
  );
  const [filterDishes, setFilterDishes] = useState(dishesData);

  const removeIngredient = (ingredient: Ingredient) => {
    const newSelectedIngredients = selectedIngredients.filter(
      (i) => ingredient.id !== i.id
    );
    setSelectedIngredients(newSelectedIngredients);
  };

  const handleSearch = (term: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setFilterDishes(
        dishesData.filter((d) => d.name.toLowerCase().includes(term))
      );
    }, 500);
  };

  return (
    <div className='flex h-full w-full'>
      <Card className='hidden h-full w-[400px] flex-col rounded-none border-none shadow-lg md:flex'>
        <CardHeader>
          <CardTitle className='text-xl'>Nguyên liệu đã chọn</CardTitle>
        </CardHeader>
        <CardContent className='h-full grow overflow-auto'>
          <IngredientsPick
            showBackButton={true}
            selectedIngredients={selectedIngredients}
            onRemove={(ingredient) => removeIngredient(ingredient)}
          />
        </CardContent>
      </Card>
      <div className='flex-1 overflow-y-auto p-10'>
        <div className='flex justify-between'>
          <h1 className='text-3xl'>Món ăn đề xuất</h1>
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
          {filterDishes.length === 0 && (
            <div className='text-center text-lg'>No dish found</div>
          )}
          <div className='grid-custom gap-5'>
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
    </div>
  );
}
