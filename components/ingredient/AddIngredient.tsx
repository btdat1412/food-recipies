'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ImagePlus, X } from 'lucide-react';
import { UploadDropzone } from '@/lib/uploadThing';
import { Input } from '../ui/input';
import { createIngredient } from '../../services/actions';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export default function AddIngredient() {
  const [ingredientName, setIngredientName] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [kcal, setKcal] = useState('');
  const [ingredientType, setIngredientType] = useState('');

  const handleDeleteImage = () => {
    setImageUrl('');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const newIngredient: { [key: string]: string | number } = {
      name: ingredientName,
      kcal: parseFloat(kcal),
      image: imageUrl,
    };

    if (ingredientType) {
      newIngredient.type = ingredientType;
    }

    try {
      const newlyCreatedIngredient = await createIngredient(newIngredient);
      console.log('Đã thêm nguyên liệu mới');
      console.log(newlyCreatedIngredient);

      setIngredientName('');
      setImageUrl('');
      setKcal('');
      setIngredientType('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='mt-10 flex justify-center'>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
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
              label: 'Thêm hình ảnh nguyên liệu',
              allowedContent: 'Hình ảnh dưới 4MB',
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

        <Input
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          placeholder='Tên nguyên liệu'
          className='rounded-none border-0 border-b-2 border-highlight p-0 text-xl focus-visible:ring-transparent focus-visible:ring-offset-transparent'
        />

        <Input
          value={kcal}
          onChange={(e) => setKcal(e.target.value)}
          placeholder='kcal'
          className='rounded-none border-0 border-b-2 border-highlight p-0 text-xl focus-visible:ring-transparent focus-visible:ring-offset-transparent'
        />

        <Select onValueChange={setIngredientType}>
          <SelectTrigger aria-label='Select ingredient type'>
            <SelectValue placeholder='Loại nguyên liệu' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='meat'>Meat</SelectItem>
            <SelectItem value='spicy'>Spicy</SelectItem>
            <SelectItem value='vegetable'>Vegetable</SelectItem>
            <SelectItem value='other'>Other</SelectItem>
          </SelectContent>
        </Select>

        <Button
          className='bg-highlight text-lg text-white md:text-xl'
          size='lg'
          type='submit'
        >
          Thêm nguyên liệu
        </Button>
      </form>
    </div>
  );
}
