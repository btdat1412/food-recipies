import { Trash } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Ingredient } from '@/types';
import { useRouter } from 'next/navigation';

type IngredientsPickProps = {
  showBackButton?: boolean;
  selectedIngredients: Array<Ingredient>;
  onRemove: (ingredient: Ingredient) => void;
};

const IngredientsPick = ({
  showBackButton,
  selectedIngredients,
  onRemove,
}: IngredientsPickProps) => {
  const router = useRouter();

  return (
    <div className='flex h-full flex-col'>
      <div className='flex flex-none items-center justify-between'>
        <p>Nguyên liệu</p>
        <div className='flex items-center gap-2 md:gap-[18px]'>
          <p>Khối lượng(gam)</p>
          <Trash className='border-highlight text-highlight hidden h-8 w-8 rounded-sm border p-2 md:block md:h-12 md:w-12 md:rounded-xl md:p-[14px] md:opacity-0' />
        </div>
      </div>
      <div className='h-full grow overflow-y-scroll border-b border-t border-[#c4c4c4] py-6'>
        <div className='flex flex-col gap-6'>
          {selectedIngredients.map((ingredient, index) => (
            <div key={index} className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Image
                  src={ingredient.image}
                  alt='ingredient'
                  width={45}
                  height={41}
                />
                <div className='flex flex-col'>
                  <p className='text-left text-sm'>{ingredient.name}</p>
                  <p className='text-xs'>{ingredient.kcal} kCal</p>
                </div>
              </div>
              <div className='flex items-center gap-2 md:gap-[18px]'>
                <div className='flex h-12 w-20 items-center justify-center rounded-xl bg-[#f4bdb4] dark:bg-background md:w-[114px]'>
                  100
                </div>
                <Trash
                  onClick={() => onRemove(ingredient)}
                  className='border-highlight text-highlight h-8 w-8 cursor-pointer rounded-sm border p-2 md:h-12 md:w-12 md:rounded-xl md:p-[14px]'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-none flex-col'>
        <div className='mt-4 flex justify-between'>
          <p>Tổng Calories</p>
          <p>
            {selectedIngredients.reduce(
              (total, ingredient) => total + ingredient.kcal,
              0
            )}
            kCal
          </p>
        </div>
        <Button
          className='bg-highlight mt-6 text-lg text-white md:text-xl'
          size={'xl'}
          onClick={() =>
            router.push(
              `/suggest?ingredients=${selectedIngredients
                .map((i) => i.id)
                .join(',')}`
            )
          }
        >
          ĐỀ XUẤT MÓN ĂN
        </Button>
        {showBackButton && (
          <Button
            className='mt-6 bg-white text-lg text-black shadow-[0_8px_24px_-0px_rgba(234,124,105,0.3)] md:text-xl'
            size={'xl'}
            onClick={() => router.push(`/`)}
          >
            QUAY VỀ
          </Button>
        )}
      </div>
    </div>
  );
};

export default IngredientsPick;
