'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export function ShareDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='border-highlight text-highlight flex min-h-[250px] cursor-pointer flex-col items-center justify-center rounded-2xl border-dashed'>
          <Plus className='mb-2 h-6 w-6' />
          <p>Chia sẻ công thức</p>
        </Card>
      </DialogTrigger>
      {/* sm:max-w-[425px] */}
      <DialogContent className='sm:max-w-[70vw]'>
        <DialogHeader className='flex justify-center'>
          <Input
            placeholder='Tên món ăn'
            className='border-highlight w-1/3 border-0 border-b-4'
          />
        </DialogHeader>
        <div className='grid grid-cols-4 gap-4'>
          {/* <div className='col-span-2 col-start-2 text-highlight'>
            <Input
              placeholder='Tên món ăn'
              className='border-0 border-b-4 border-highlight'
            />
          </div> */}

          <div className='bg-blue-500'>Them hinh anh</div>

          <div className='col-span-3 bg-red-500'>Them ten</div>
        </div>
        <DialogFooter>
          <Button
            className='bg-highlight mt-6 text-lg text-white md:text-xl'
            size={'lg'}
            onClick={() => console.log('Share')}
          >
            Chia sẻ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
