'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import IngredientsPick from '../components/ingredient/IngredientsPick';
import { Search as SearchButton } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ingredientsData from '../fakedb/ingredients.json';
import IngredientsCard from '../components/ingredient/IngredientsCard';
import { Ingredient } from '@/types';

const vegetablesData = ingredientsData.filter((i) => i.type === 'vegetable');
const meatsData = ingredientsData.filter((i) => i.type === 'meat');
const spiciesData = ingredientsData.filter((i) => i.type === 'spicy');
const othersData = ingredientsData.filter((i) => i.type === 'other');

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [filteredVegetables, setFilteredVegetables] = useState(vegetablesData);
  const [filteredMeats, setFilteredMeats] = useState(meatsData);
  const [filteredSpices, setFilteredSpices] = useState(spiciesData);
  const [filteredOthers, setFilteredOthers] = useState(othersData);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    // Filter vegetables
    const filteredVegetables = vegetablesData.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredVegetables(filteredVegetables);

    // Filter meats
    const filteredMeats = meatsData.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredMeats(filteredMeats);

    // Filter spices
    const filteredSpices = spiciesData.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSpices(filteredSpices);

    // Filter others
    const filteredOthers = othersData.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOthers(filteredOthers);
  };

  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );

  const handleIngredientClick = (ingredient: Ingredient) => {
    const isSelected = selectedIngredients.some(
      (selected) => selected.name === ingredient.name
    );

    if (isSelected) {
      const updatedIngredients = selectedIngredients.filter(
        (selected) => selected.name !== ingredient.name
      );
      setSelectedIngredients(updatedIngredients);
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: Ingredient) => {
    const updatedIngredients = selectedIngredients.filter(
      (selected) => selected.name !== ingredient.name
    );
    setSelectedIngredients(updatedIngredients);
  };

  useEffect(() => {
    localStorage.setItem(
      'selectedIngredients',
      JSON.stringify(selectedIngredients)
    );
  }, [selectedIngredients]);

  return (
    <div className='flex h-full justify-between gap-9 px-2 pt-4 md:px-12 md:pt-8'>
      <div className='relative flex h-full w-full flex-col gap-6'>
        <div className='relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <h1 className='text-3xl'>Chọn Nguyên Liệu</h1>
          <div className='relative'>
            <SearchButton
              className='absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500'
              size={20}
            />
            <Input
              className='bg-[dark:bg-[#2d303e] pl-10'
              placeholder='Tìm kiếm nguyên liệu...'
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
        <div className='absolute right-0 top-1 md:hidden'>
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
                  onRemove={handleRemoveIngredient}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Tabs defaultValue='vegetable' className='h-full overflow-auto'>
          <TabsList className='flex justify-center gap-8 rounded-none border-b border-[#aaaaaa] bg-inherit px-0 text-left text-foreground dark:border-[#393c49] md:justify-start'>
            <TabsTrigger
              value='vegetable'
              className='px-0 py-0.5 pr-1 text-left text-2xl data-[state=active]:rounded-none data-[state=active]:border-b-[3px] data-[state=active]:border-highlight data-[state=active]:text-highlight'
            >
              Rau
            </TabsTrigger>
            <TabsTrigger
              value='meat'
              className='px-0 py-0.5 pr-1 text-left text-2xl data-[state=active]:rounded-none data-[state=active]:border-b-[3px] data-[state=active]:border-highlight data-[state=active]:text-highlight'
            >
              Thịt
            </TabsTrigger>
            <TabsTrigger
              value='spice'
              className='px-0 py-0.5 pr-1 text-left text-2xl data-[state=active]:rounded-none data-[state=active]:border-b-[3px] data-[state=active]:border-highlight data-[state=active]:text-highlight'
            >
              Gia Vị
            </TabsTrigger>
            <TabsTrigger
              value='other'
              className='px-0 py-0.5 pr-1 text-left text-2xl data-[state=active]:rounded-none data-[state=active]:border-b-[3px] data-[state=active]:border-highlight data-[state=active]:text-highlight'
            >
              Khác
            </TabsTrigger>
          </TabsList>
          <TabsContent value='vegetable'>
            <Card className='flex-1 border-none'>
              <CardContent className='grid-custom gap-6 bg-background p-0 '>
                {filteredVegetables.map((item, index) => (
                  <IngredientsCard
                    key={index}
                    image={item.image}
                    name={item.name}
                    kcal={item.kcal}
                    onClick={() => handleIngredientClick(item)}
                    isSelected={selectedIngredients.some(
                      (selected) => selected.name === item.name
                    )}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='meat'>
            <Card className='flex-1 border-none'>
              <CardContent className='grid grid-cols-2 gap-4 bg-background p-0 md:grid-cols-4 '>
                {filteredMeats.map((item, index) => (
                  <IngredientsCard
                    key={index}
                    image={item.image}
                    name={item.name}
                    kcal={item.kcal}
                    onClick={() => handleIngredientClick(item)}
                    isSelected={selectedIngredients.some(
                      (selected) => selected.name === item.name
                    )}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='spice'>
            <Card className='flex-1 border-none'>
              <CardContent className='grid grid-cols-2 gap-4 bg-background p-0 md:grid-cols-4 '>
                {filteredSpices.map((item, index) => (
                  <IngredientsCard
                    key={index}
                    image={item.image}
                    name={item.name}
                    kcal={item.kcal}
                    onClick={() => handleIngredientClick(item)}
                    isSelected={selectedIngredients.some(
                      (selected) => selected.name === item.name
                    )}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='other'>
            <Card className='flex-1 border-none'>
              <CardContent className='grid grid-cols-2 gap-4 bg-background p-0 md:grid-cols-4 '>
                {filteredOthers.map((item, index) => (
                  <IngredientsCard
                    key={index}
                    image={item.image}
                    name={item.name}
                    kcal={item.kcal}
                    onClick={() => handleIngredientClick(item)}
                    isSelected={selectedIngredients.some(
                      (selected) => selected.name === item.name
                    )}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Card className='hidden h-full w-[502px] flex-col rounded-2xl border-none shadow-lg md:flex'>
        <CardHeader>
          <CardTitle className='text-xl'>Nguyên liệu đã chọn</CardTitle>
        </CardHeader>
        <CardContent className='h-full grow overflow-auto'>
          <IngredientsPick
            selectedIngredients={selectedIngredients}
            onRemove={handleRemoveIngredient}
          />
        </CardContent>
      </Card>
    </div>
  );
}
