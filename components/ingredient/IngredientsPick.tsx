import { Trash } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

const IngredientsPick = () => {
  return (
    <div className='flex h-full flex-col'>
      <div className='flex flex-none items-center justify-between'>
        <p>Nguyên liệu</p>
        <div className='flex items-center gap-2 md:gap-[18px]'>
          <p>Khối lượng(gam)</p>
          <Trash className='hidden h-8 w-8 rounded-sm border border-hightlight p-2 text-hightlight md:block md:h-12 md:w-12 md:rounded-xl md:p-[14px] md:opacity-0' />
        </div>
      </div>
      <div className='no-scrollbar h-full grow overflow-y-scroll border-b border-t border-[#c4c4c4] py-6'>
        <div className='flex flex-col gap-6'>
          {/* Duplicate code */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Image
                src='/images/image_1.png'
                alt='ingredient'
                width={45}
                height={41}
              />
              <div className='flex flex-col'>
                <p className='text-sm'>Bắp cải</p>
                <p className='text-xs'>24 kCal</p>
              </div>
            </div>
            <div className='flex items-center gap-2 md:gap-[18px]'>
              <div className='flex h-12 w-20 items-center justify-center rounded-xl bg-[#f4bdb4] dark:bg-background md:w-[114px]'>
                100
              </div>
              <Trash className='h-8 w-8 rounded-sm border border-hightlight p-2 text-hightlight md:h-12 md:w-12 md:rounded-xl md:p-[14px]' />
            </div>
          </div>

          {/* Duplicate code */}
        </div>
      </div>
      <div className='flex flex-none flex-col'>
        <div className='mt-4 flex justify-between'>
          <p>Tổng Calories</p>
          <p>202 kCal</p>
        </div>
        <Button className='mt-6 bg-hightlight text-2xl' size={'xl'}>
          Đề xuất món ăn
        </Button>
      </div>
    </div>
  );
};

export default IngredientsPick;
