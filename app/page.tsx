import React from 'react';
import SearchIngredients from '../components/search/SearchIngredients';
import IngredientsDisplay from '../components/landing-page/IngredientsDisplay';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import IngredientsPick from '../components/ingredient/IngredientsPick';
import { ShoppingBag } from 'lucide-react';
import ToggleIngredientsList from '../components/landing-page/ToggleIngredientsList';

export default async function Home() {
  return (
    <div className='flex h-full justify-between gap-9 px-2 pt-4 md:px-6 md:pt-8'>
      <div className='flex h-full w-full flex-col gap-6'>
        <div className='relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <h1 className='text-3xl'>Chọn Nguyên Liệu</h1>
          <SearchIngredients />
          <ToggleIngredientsList />
        </div>
        <IngredientsDisplay />
      </div>
      <Card className='hidden h-full w-[502px] flex-col rounded-2xl bg-darkbg md:flex'>
        <CardHeader>
          <CardTitle className='text-xl'>Nguyên liệu đã chọn</CardTitle>
        </CardHeader>
        <CardContent className='h-full grow overflow-auto'>
          <IngredientsPick />
        </CardContent>
      </Card>
    </div>
  );
}
