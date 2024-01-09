'use client';
import IngredientsPick from '@/components/ingredient/IngredientsPick';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Ingredient } from '@/types';
import { Search as SearchButton } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import dishesData from '../../fakedb/recipes.json';
import DishCard from '@/components/dish/DishCard';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingBag } from 'lucide-react';
import { calories, difficulty, healthy } from '@/lib/constants';

let timeoutId: ReturnType<typeof setTimeout>;

export default function SuggestPage({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  const searchParams = useSearchParams();
  const ingredientsId = searchParams.get('ingredients')?.split(',').map(String);
  const [selectedIngredients, setSelectedIngredients] = useState(
    ingredients.filter((i) => ingredientsId?.includes(i.id))
  );
  const [filterDishes, setFilterDishes] = useState(dishesData);
  const [termFilter, setTermFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [healthyFilter, setHealthyFilter] = useState('');
  const [caloriesFilter, setCaloriesFilter] = useState('');
  const [showFilter, setShowFilter] = useState(true);

  useEffect(() => {
    setFilterDishes(
      dishesData.filter(
        (d) =>
          d.name.toLowerCase().includes(termFilter.toLowerCase()) &&
          d.difficulty.includes(difficultyFilter) &&
          d.healthy.includes(healthyFilter) &&
          matchFilterCalories(d.kcal)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termFilter, difficultyFilter, healthyFilter, caloriesFilter]);

  const matchFilterCalories = (kcal: number) => {
    switch (caloriesFilter) {
      case calories[0]:
        return kcal <= 100;
      case calories[1]:
        return kcal > 100 && kcal <= 300;
      case calories[2]:
        return kcal > 300;
      default:
        return true;
    }
  };

  const removeIngredient = (ingredient: Ingredient) => {
    const newSelectedIngredients = selectedIngredients.filter(
      (i) => ingredient.id !== i.id
    );
    setSelectedIngredients(newSelectedIngredients);
  };

  const handleSearch = (term: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setTermFilter(term);
    }, 500);
  };

  const toggleFilter = () => {
    if (showFilter) {
      setTermFilter('');
      setCaloriesFilter('');
      setDifficultyFilter('');
      setHealthyFilter('');
    }
    setShowFilter(!showFilter);
  };

  return (
    <div className='flex h-full w-full'>
      <Card className='hidden h-full flex-col rounded-none border-none shadow-lg md:flex md:w-[350px] lg:w-[400px]'>
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
      <div className='relative flex-1 overflow-y-auto p-5 lg:p-10'>
        <div className='flex justify-between'>
          <h1 className='text-3xl'>Món ăn đề xuất</h1>
          <div className='flex items-center gap-4'>
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
                onClick={toggleFilter}
              >
                <Filter className='mr-2 h-4 w-4' />
                Lọc
              </Button>
            </div>
            <div className='cursor-pointer md:hidden'>
              <Sheet>
                <SheetTrigger asChild>
                  <ShoppingBag size={30} />
                </SheetTrigger>
                <SheetContent className='flex flex-col'>
                  <SheetHeader>
                    <SheetTitle className='py-2 text-left text-xl'>
                      Nguyên liệu đã chọn
                    </SheetTitle>
                  </SheetHeader>
                  <div className='h-full grow overflow-auto'>
                    <IngredientsPick
                      selectedIngredients={selectedIngredients}
                      onRemove={(ingredient) => removeIngredient(ingredient)}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        <div className='p-5'>
          {showFilter && (
            <div className='mb-5 flex gap-6 text-[#5B5B5B]'>
              <Select onValueChange={(value) => setDifficultyFilter(value)}>
                <SelectTrigger className='w-[120px]'>
                  <SelectValue placeholder='Độ khó' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {difficulty.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setHealthyFilter(value)}>
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Độ lành mạnh' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {healthy.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setCaloriesFilter(value)}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Hàm lượng calories' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {calories.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
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
