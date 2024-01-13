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
import { Plus, ImagePlus, Video, X, Minus } from 'lucide-react';
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
import { difficulty, healthy, time } from '@/lib/constants';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

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

  const [activeInputIndex, setActiveInputIndex] = useState<number | null>(null);

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
    router.push(`/recipes/${newRecipe.id}`);
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
          <div className='flex justify-center pb-10'>
            <Input
              placeholder='Tên món ăn'
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className='w-4/5 rounded-none border-0 border-b-2 border-highlight text-center text-3xl text-highlight placeholder:text-highlight focus-visible:ring-transparent focus-visible:ring-offset-transparent lg:w-1/3'
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
                    allowedContent: 'Dưới 4MB thôi nha!',
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
            <div className='col-start-1 col-end-13 xl:col-start-5'>
              <div className='flex'>
                <Select>
                  <SelectTrigger className=''>
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

                <Select>
                  <SelectTrigger className=''>
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

                <Select>
                  <SelectTrigger className=''>
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
              </div>

              <h3 className='mt-10 text-2xl text-highlight'>Calories</h3>

              <Input
                placeholder='Nhập lượng calories mà món ăn cung cấp'
                className='rounded-none border-0 border-b-2 border-highlight p-0 text-xl focus-visible:ring-transparent focus-visible:ring-offset-transparent'
              />
            </div>

            {/* Ingredient header */}
            <div className='col-start-1 col-end-13 mt-10 xl:col-start-5'>
              <h3 className='text-2xl text-highlight'>Nguyên liệu</h3>
            </div>

            {/* Ingredients list */}
            <ul className='col-start-1 col-end-13 xl:col-start-5'>
              {ingredients.map((ingredient, index) => (
                <li key={index} className='mb-4 flex items-center'>
                  <div className='flex-grow'>
                    <Input
                      value={ingredient.name}
                      onChange={(e) => {
                        handleIngredientChange(index, 'name', e.target.value);
                        handleIngredientSearchChange(e);
                      }}
                      onFocus={() => setActiveInputIndex(index)}
                      onBlur={() => setActiveInputIndex(null)}
                      placeholder='Chọn nguyên liệu...'
                      className='rounded-none border-0 border-b-2 border-highlight p-0 text-xl focus-visible:ring-transparent focus-visible:ring-offset-transparent'
                    />

                    {ingredientSearch && activeInputIndex === index && (
                      <Dropdown
                        items={filteredIngredients}
                        onSelectItem={(item) =>
                          handleSelectIngredient(index, item)
                        }
                      />
                    )}
                  </div>

                  <span className='mx-3 text-highlight'>
                    <Minus />
                  </span>

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
                      className='rounded-none border-0 border-b-2 border-highlight p-0 text-xl focus-visible:ring-transparent focus-visible:ring-offset-transparent'
                    />
                  </div>

                  {/* Remove-ingredient button */}
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

            {/* Add-more-ingredient button */}
            <div className='col-start-1 col-end-13 xl:col-start-5'>
              <Button
                variant={'outline'}
                className='border-dashed border-highlight bg-transparent text-highlight hover:bg-highlight hover:text-white'
                onClick={handleAddIngredient}
                type='button'
              >
                <Plus />
              </Button>
            </div>

            {/* Step header */}
            <div className='col-start-1 col-end-13 mt-10 xl:col-start-5'>
              <h3 className='text-2xl text-highlight'>Công thức</h3>
            </div>

            {/* Steps list */}
            <ul className='col-span-full'>
              {steps.map((step, index) => (
                <li
                  key={index}
                  className='mb-4 grid grid-cols-12 gap-0 gap-y-4'
                >
                  {/* Steps ordinal number */}
                  <div className='col-start-1 col-end-3 xl:col-start-4 xl:col-end-5'>
                    <div className='flex justify-center'>
                      <Badge className='flex aspect-square w-1/2 justify-center rounded-lg text-xl md:w-1/3'>
                        {index + 1}
                      </Badge>
                    </div>
                  </div>

                  {/* Step description */}
                  <div className='col-span-full col-start-3 xl:col-start-5 xl:col-end-11'>
                    <div className='relative mr-3 flex h-full flex-col gap-4'>
                      <Input
                        placeholder='Tên bước'
                        className='w-1/2 rounded-none border-0 border-b-[1px] border-white p-0 text-xl focus-visible:border-b-[2px] focus-visible:ring-transparent focus-visible:ring-offset-transparent'
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
                          handleStepChange(index, 'description', e.target.value)
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

                  {/* Step image uploader */}
                  <div className='col-span-full col-start-3 xl:col-start-11 xl:col-end-13'>
                    {step.imageUrl.length > 0 ? (
                      <div className='relative w-4/5 md:w-1/2 xl:w-full'>
                        <div>
                          <Image
                            src={step.imageUrl}
                            alt='Uploaded Image'
                            width={500}
                            height={500}
                            className='rounded-2xl'
                          />
                        </div>

                        <X
                          className='absolute right-2 top-2 z-10 h-5 w-5 cursor-pointer hover:text-red-500'
                          onClick={() => handleRemoveStepImage(index)}
                        />
                      </div>
                    ) : (
                      <UploadDropzone
                        endpoint='imageUploader'
                        content={{
                          uploadIcon() {
                            return <ImagePlus className='h-8 w-8' />;
                          },
                          label: `Thêm hình ảnh bước ${index + 1}`,
                          allowedContent: 'Dưới 4MB thôi nha!',
                          button: 'Tải ảnh lên',
                        }}
                        appearance={{
                          container:
                            'mt-0 flex aspect-square w-4/5 cursor-pointer select-none flex-col items-center justify-center rounded-2xl border-dashed border-highlight text-highlight md:w-1/2 xl:w-full',
                          label:
                            'text-highlight text-xs lg:text-base hover:text-hightlight',
                          allowedContent: 'text-xs',
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
                </li>
              ))}
            </ul>

            {/* Add-more-step button */}
            <div className='col-start-1 col-end-13 xl:col-start-5'>
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
