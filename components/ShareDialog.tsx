'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus, ImagePlus, Video, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { UploadDropzone } from '@/lib/uploadThing';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { Ingredient, InputIngredient, Step } from '../types';
import { Dropdown } from './Dropdown';
import { createIngredient, addRecipe } from '../services/actions';
import { useRouter } from 'next/navigation';

export function ShareDialog({
  dbIngredients,
}: {
  dbIngredients: Ingredient[];
}) {
  const { toast } = useToast();
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState<string>('');

  const [ingredients, setIngredients] = useState<InputIngredient[]>([
    { name: '', quantity: '' },
  ]);

  const [ingredientSearch, setIngredientSearch] = useState('');

  const [recipeName, setRecipeName] = useState('');

  const [steps, setSteps] = useState<Step[]>([
    { title: '', description: '', imageUrl: '' },
  ]);

  const filteredIngredients = dbIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  const handleIngredientSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientSearch(e.target.value);
  };

  const handleSelectIngredient = (
    index: number,
    selectedIngredient: Ingredient
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index].name = selectedIngredient.name;
    setIngredients(newIngredients);
    setIngredientSearch('');
  };

  const handleDeleteImage = () => {
    setImageUrl('');
  };

  const handleIngredientChange = (
    index: number,
    field: keyof InputIngredient,
    value: string
  ) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [field]: value };
      }
      return ingredient;
    });

    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleStepChange = (
    index: number,
    field: keyof Step,
    value: string
  ) => {
    const newSteps = steps.map((step, i) =>
      i === index ? { ...step, [field]: value } : step
    );
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, { title: '', description: '', imageUrl: '' }]);
  };

  const handleRemoveStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  const handleSetStepImageUrl = (index: number, url: string) => {
    handleStepChange(index, 'imageUrl', url);
  };

  const handleRemoveStepImage = (index: number) => {
    handleStepChange(index, 'imageUrl', '');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const ingredientPromises = ingredients.map(async (ingredient) => {
      const dbIngredient = dbIngredients.find(
        (dbIng) => dbIng.name === ingredient.name
      );
      if (dbIngredient) {
        return { ingredientId: dbIngredient.id, amount: ingredient.quantity };
      } else {
        try {
          const newIngredient = await createIngredient({
            name: ingredient.name,
          });
          return {
            ingredientId: newIngredient.id,
            amount: ingredient.quantity,
          };
        } catch (error) {
          console.error('Error creating new ingredient:', error);
        }
      }
    });
    const recipeIngredients = await Promise.all(ingredientPromises);

    console.log('recipeIngredients', recipeIngredients);

    const recipeData = {
      name: recipeName,
      image: imageUrl,
      ingredients: recipeIngredients,
      steps,
      rating: {
        average: 0,
        quantity: 0,
      },
      kcals: 0,
    };

    const newRecipe = await addRecipe(recipeData);
    router.push('/');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='flex min-h-[250px] cursor-pointer select-none flex-col items-center justify-center rounded-2xl border-dashed border-highlight text-highlight'>
          <Plus className='mb-2 h-6 w-6' />
          <p>Chia sẻ công thức</p>
        </Card>
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] overflow-auto sm:max-w-[80vw]'>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-center pb-6'>
            <Input
              placeholder='Tên món ăn'
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className='w-4/5 rounded-none border-0 border-b-2 border-highlight text-center text-3xl text-highlight placeholder:text-highlight lg:w-1/3'
            />
          </div>

          <div className='grid grid-cols-12 gap-0 gap-y-4'>
            {/* Recipe image uploader */}
            <div className='col-span-full flex justify-center xl:col-span-3'>
              {imageUrl.length > 0 ? (
                <div className='relative w-4/5 md:w-1/2 xl:w-full'>
                  <div className='flex items-center justify-center'>
                    <Image
                      src={imageUrl}
                      alt='Uploaded Image'
                      width={500}
                      height={500}
                      className='rounded-2xl'
                    />
                  </div>

                  <X
                    className='absolute right-2 top-2 z-10 h-5 w-5 cursor-pointer hover:text-red-500'
                    onClick={handleDeleteImage}
                  />
                </div>
              ) : (
                <UploadDropzone
                  endpoint='imageUploader'
                  content={{
                    uploadIcon() {
                      return <ImagePlus className='h-8 w-8' />;
                    },
                    label: 'Thêm hình ảnh món ăn',
                    allowedContent: 'Dưới 4MB thôi nhen!',
                    button: 'Tải ảnh lên',
                  }}
                  appearance={{
                    container:
                      'mt-0 flex aspect-square w-4/5 cursor-pointer select-none flex-col items-center justify-center rounded-2xl border-dashed border-highlight text-highlight md:w-1/2 xl:w-full',
                    label:
                      'text-highlight text-sm lg:text-base hover:text-hightlight',
                    allowedContent: 'text-sm',
                    button:
                      'text-white text-sm lg:text-base bg-hightlight ut-uploading:bg-hightlight ',
                  }}
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              )}
            </div>

            {/* Recipe video uploader */}
            <div className='col-start-1 col-end-13 flex justify-center xl:col-start-5'>
              <div
                className='flex h-full min-h-[200px] w-4/5 cursor-pointer select-none flex-col items-center justify-center rounded-2xl border border-dashed border-white text-white xl:w-full'
                onClick={() => {
                  toast({
                    title: 'Tính năng này hiện đang được phát triển.',
                  });
                }}
              >
                <Video className='mb-2 h-8 w-8' />

                <p className='text-sm lg:text-base'>
                  Thêm video hướng dẫn nấu ăn
                </p>
              </div>
            </div>

            {/* Calories input, filter values */}
            <div className='col-span-full bg-red-500 xl:col-span-3'>
              Calories input, filter values
            </div>

            {/* Ingredients list */}
            <ul className='col-start-1 col-end-13 bg-blue-500 xl:col-start-5'>
              <li className='bg-blue-500'>
                <div>Ingredients list</div>
              </li>
            </ul>

            {/* Steps list */}
            <ul className='col-span-full'>
              <li className='grid grid-cols-12 gap-0 gap-y-4'>
                {/* Steps ordinal number */}
                <div className='col-start-1 col-end-2 bg-green-500 xl:col-start-4 xl:col-end-5'>
                  Number
                </div>

                {/* Step description */}
                <div className='col-start-2 col-end-11 bg-blue-500 xl:col-start-5'>
                  Step
                </div>

                {/* Step image uploader */}
                <div className='col-start-11 col-end-13 bg-yellow-500'>
                  Step image
                </div>
              </li>
            </ul>
          </div>

          <div className='grid grid-cols-12 gap-0 gap-y-4'>
            <div className='bg-red-500'>1</div>
            <div className='bg-red-500'>2</div>
            <div className='bg-red-500'>3</div>
            <div className='bg-red-500'>4</div>
            <div className='bg-red-500'>5</div>
            <div className='bg-red-500'>6</div>
            <div className='bg-red-500'>7</div>
            <div className='bg-red-500'>8</div>
            <div className='bg-red-500'>9</div>
            <div className='bg-red-500'>10</div>
            <div className='bg-red-500'>11</div>
            <div className='bg-red-500'>12</div>
          </div>

          <DialogFooter>
            <Button
              className='bg-highlight text-lg text-white md:text-xl'
              size='lg'
              type='submit'
            >
              Chia sẻ
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
