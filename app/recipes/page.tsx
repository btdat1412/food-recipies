'use client';
import { useEffect, useState } from 'react';
import { Search as SearchButton } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import DishCard from '@/components/dish/DishCard';
import { calories, difficulty, healthy, time } from '@/lib/constants';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShareDialog } from '@/components/ShareDialog';
import { getAllIngredients, getAllRecipes } from '@/services';
import { Ingredient, Recipe } from '@prisma/client';
import { LoadingSpinner } from '@/public/icon-loading';
import RecipeDialog from '@/components/recipe/RecipeDialog';
import { Recipes } from '@/types';

let timeoutId: ReturnType<typeof setTimeout>;

export default function Recipes() {
  const [filterDishes, setFilterDishes] = useState<Recipe[]>([]);
  const [termFilter, setTermFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [healthyFilter, setHealthyFilter] = useState('');
  const [caloriesFilter, setCaloriesFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [showFilter, setShowFilter] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>();
  const [recipes, setRecipes] = useState<Recipe[]>();

  const [open, setOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Recipes | null>(null);

  const handleClickOpen = (dish: Recipes) => {
    setSelectedDish(dish);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getIngredients = async () => {
    const data = await getAllIngredients();
    setIngredients(data);
  };

  const getRecipes = async () => {
    const data = await getAllRecipes();
    setRecipes(data);
    setFilterDishes(data);
  };

  useEffect(() => {
    getIngredients();
    getRecipes();
  }, []);
  useEffect(() => {
    setFilterDishes(
      recipes
        ? recipes.filter(
            (d) =>
              d.name.toLowerCase().includes(termFilter.toLowerCase()) &&
              (timeFilter === 'Tất cả' ||
                d.time === 'Tất cả' ||
                d.time.includes(timeFilter)) &&
              (difficultyFilter === 'Tất cả' ||
                d.difficulty.includes(difficultyFilter)) &&
              (healthyFilter === 'Tất cả' ||
                d.healthy.includes(healthyFilter)) &&
              (caloriesFilter === 'Tất cả' || matchFilterCalories(d.kcal))
          )
        : []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termFilter, difficultyFilter, healthyFilter, caloriesFilter, timeFilter]);

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

  if (!recipes)
    return (
      <div className='flex w-full items-center justify-center py-14'>
        <LoadingSpinner width={40} height={40} />
      </div>
    );

  return (
    <div className=' h-full w-full flex-1 overflow-y-auto p-5 md:px-12 md:py-10'>
      <div className='flex items-center justify-between'>
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
              onClick={toggleFilter}
            >
              <Filter className='mr-2 h-4 w-4' />
              Lọc
            </Button>
          </div>
        </div>
      </div>
      <div className='py-5'>
        {showFilter && (
          <div className='mb-5 flex gap-6 text-[#5B5B5B]'>
            <Select onValueChange={(value) => setTimeFilter(value)}>
              <SelectTrigger className='w-[115px]'>
                <SelectValue placeholder='Buổi' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {time.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

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
          <ShareDialog dbIngredients={ingredients || []} />

          {filterDishes.map((item, index) => (
            <DishCard
              key={index}
              id={item.id}
              image={item.image}
              rating={item.rating.average}
              name={item.name}
              kcal={item.kcal}
              onClick={() => {
                handleClickOpen(item);
                console.log(item);
              }}
            />
          ))}
        </div>

        <RecipeDialog
          open={open}
          onOpenChange={handleClose}
          recipe={selectedDish}
        />
      </div>
    </div>
  );
}
