'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
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
      <DialogContent className='max-h-screen overflow-auto pl-[80px] sm:max-w-[80vw]'>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-center pb-6'>
            <Input
              placeholder='Tên món ăn'
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className='w-4/5 rounded-none border-0 border-b-2 border-highlight text-center text-3xl text-highlight placeholder:text-highlight placeholder:opacity-75 lg:w-1/3'
            />
          </div>

          {/* 1st row */}
          <div className='grid grid-cols-1 gap-0 gap-y-4 xl:grid-cols-4'>
            <div className='relative flex w-full flex-col justify-center'>
              {imageUrl.length > 0 ? (
                <>
                  <div className=' flex w-full items-center justify-center'>
                    <Image
                      src={imageUrl}
                      alt='Uploaded Image'
                      width={500}
                      height={500}
                      className='rounded-2xl'
                    />
                  </div>
                  <X
                    className='absolute right-2 top-0 z-10 h-8 w-8 hover:text-red-500'
                    onClick={handleDeleteImage}
                  />
                </>
              ) : (
                <UploadDropzone
                  endpoint='imageUploader'
                  content={{
                    uploadIcon() {
                      return <ImagePlus className='h-8 w-8' />;
                    },
                    label: 'Thêm hình ảnh món ăn',
                  }}
                  appearance={{
                    container:
                      'mt-0 flex aspect-square w-1/2 cursor-pointer select-none flex-col items-center justify-center rounded-2xl border-dashed border-highlight text-highlight xl:w-full',
                    label:
                      'text-highlight text-sm lg:text-base hover:text-hightlight',
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

            <div className='col-span-3 grid grid-cols-1 xl:grid-cols-12'>
              <div></div>

              <div className='col-span-11'>
                <Card
                  className='flex h-full min-h-[200px] w-full cursor-pointer select-none flex-col items-center justify-center rounded-2xl border-dashed border-white text-white'
                  onClick={() => {
                    toast({
                      title: 'Tính năng này hiện đang được phát triển.',
                    });
                  }}
                >
                  <Video className='mb-2 h-6 w-6' />

                  <p className='text-sm lg:text-base'>
                    Thêm video hướng dẫn nấu ăn
                  </p>
                </Card>
              </div>
            </div>
          </div>

          {/* 2nd row */}
          <div className='grid grid-cols-1 gap-0 gap-y-4 xl:grid-cols-4'>
            <div></div>

            <div className='col-span-3 grid grid-cols-12'>
              <div></div>

              <div className='col-span-11'>
                <h3 className='pb-2 text-2xl text-highlight'>Nguyên liệu</h3>

                {/* Ingredients list */}
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className='mb-4 flex items-center'>
                      <div className='flex-grow'>
                        <Input
                          value={ingredient.name}
                          onChange={(e) => {
                            handleIngredientChange(
                              index,
                              'name',
                              e.target.value
                            );
                            handleIngredientSearchChange(e);
                          }}
                          placeholder='Chọn nguyên liệu...'
                          className='rounded-none border-0 border-b-2 border-highlight p-0 text-2xl'
                        />
                        {ingredientSearch && (
                          <Dropdown
                            items={filteredIngredients}
                            onSelectItem={(item) =>
                              handleSelectIngredient(index, item)
                            }
                          />
                        )}
                      </div>
                      <span className='mx-3 text-highlight'>—</span>
                      <div className='flex-grow'>
                        <Input
                          value={ingredient.quantity}
                          onChange={(e) =>
                            handleIngredientChange(
                              index,
                              'quantity',
                              e.target.value
                            )
                          }
                          placeholder='Khối lượng'
                          className='rounded-none border-0 border-b-2 border-highlight p-0 text-2xl'
                        />
                      </div>
                      <Button
                        variant={'outline'}
                        onClick={() => handleRemoveIngredient(index)}
                        className='ml-2 border-dashed border-highlight text-highlight hover:bg-highlight hover:text-white'
                        type='button'
                      >
                        <X className='h-6 w-6' />
                      </Button>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={'outline'}
                  className='border-dashed border-highlight bg-transparent text-highlight hover:bg-highlight hover:text-white'
                  onClick={handleAddIngredient}
                  type='button'
                >
                  <Plus />
                </Button>

                <h3 className='pb-2 pt-8 text-2xl text-highlight'>Công thức</h3>
              </div>
            </div>
          </div>

          {/* 3rd row */}
          <div className='grid grid-cols-1 gap-0 gap-y-4 xl:grid-cols-4'>
            <div></div>

            <div className='col-span-3'>
              {/* Steps list */}
              <ul>
                {steps.map((step, index) => (
                  <li key={index} className='mb-4 grid grid-cols-12'>
                    <div className='w-full pr-8'>
                      <Badge className='flex justify-center rounded-lg text-xl'>
                        {index + 1}
                      </Badge>
                    </div>

                    <div className='col-span-11 md:col-span-8'>
                      <div className='relative flex h-full flex-col gap-4'>
                        <Input
                          placeholder='Tên bước'
                          className='w-min rounded-none border-0 border-b-[1px] border-white p-2 text-xl focus-visible:border-b-[2px] focus-visible:ring-transparent focus-visible:ring-offset-transparent'
                          value={step.title}
                          onChange={(e) =>
                            handleStepChange(index, 'title', e.target.value)
                          }
                        />
                        <Textarea
                          placeholder='Mô tả chi tiết'
                          className='h-full w-full rounded-none border-[1px] border-white p-2 text-lg focus-visible:border-b-[2px] focus-visible:ring-transparent focus-visible:ring-offset-transparent'
                          value={step.description}
                          onChange={(e) =>
                            handleStepChange(
                              index,
                              'description',
                              e.target.value
                            )
                          }
                        />
                        <Button
                          variant={'outline'}
                          onClick={() => handleRemoveStep(index)}
                          className='absolute right-0 top-0 z-10 border-dashed border-highlight text-highlight hover:bg-highlight hover:text-white'
                          type='button'
                        >
                          <X className='h-6 w-6' />
                        </Button>
                      </div>
                    </div>

                    <div className=' col-span-12 md:col-span-3'>
                      <div className='relative flex w-full flex-col justify-center px-4'>
                        {step.imageUrl.length > 0 ? (
                          <>
                            <div className='flex w-full items-center justify-center'>
                              <Image
                                src={step.imageUrl}
                                alt='Uploaded Image'
                                width={200}
                                height={200}
                                className='rounded-2xl'
                              />
                            </div>
                            <X
                              className='absolute right-5 top-0 z-10 h-8 w-8 hover:text-red-500'
                              onClick={() => handleRemoveStepImage(index)}
                            />
                          </>
                        ) : (
                          <UploadDropzone
                            endpoint='imageUploader'
                            content={{
                              uploadIcon() {
                                return <ImagePlus className='h-8 w-8' />;
                              },
                              label: 'Thêm ảnh hướng dẫn',
                            }}
                            appearance={{
                              container:
                                'cursor-pointer aspect-square select-none rounded-2xl border-dashed border-highlight text-highlight',
                              label:
                                'text-highlight text-sm lg:text-base hover:text-hightlight',
                              button:
                                'text-white text-sm lg:text-base bg-hightlight ut-uploading:bg-hightlight ',
                            }}
                            onClientUploadComplete={(res) => {
                              handleSetStepImageUrl(index, res[0].url);
                            }}
                            onUploadError={(error: Error) => {
                              alert(`ERROR! ${error.message}`);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-0 gap-y-4 xl:grid-cols-4'>
            <div></div>

            <div className='col-span-3 grid grid-cols-12'>
              <div></div>

              <div className='col-span-11'>
                <Button
                  variant={'outline'}
                  className='border-dashed border-highlight bg-transparent text-highlight hover:bg-highlight hover:text-white'
                  onClick={handleAddStep}
                  type='button'
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              className=' bg-highlight text-lg text-white md:text-xl'
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
