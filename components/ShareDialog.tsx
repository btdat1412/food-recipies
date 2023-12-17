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
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

export function ShareDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='flex min-h-[250px] cursor-pointer flex-col items-center justify-center rounded-2xl border-dashed border-highlight text-highlight'>
          <Plus className='mb-2 h-6 w-6' />
          <p>Chia sẻ công thức</p>
        </Card>
      </DialogTrigger>
      {/* sm:max-w-[425px] */}
      <DialogContent className='sm:max-w-[60vw]'>
        <div className='flex justify-center pb-3'>
          <Input
            placeholder='Tên món ăn'
            className='w-4/5 rounded-none border-0 border-b-4 border-highlight text-3xl text-highlight placeholder:text-highlight placeholder:opacity-75 lg:w-1/2'
          />
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-4'>
          {/* <div className='col-span-2 col-start-2 text-highlight'>
            <Input
              placeholder='Tên món ăn'
              className='border-0 border-b-4 border-highlight'
            />
          </div> */}

          <div className='bg-blue-500'>Them hinh anh</div>

          <div className='col-span-3'>
            <div className='grid grid-cols-12'>
              <div></div>

              <div className='col-span-11'>
                <h3 className='pb-2 text-2xl text-highlight'>Nguyên liệu</h3>

                <Input
                  placeholder='Nguyên liệu'
                  className='mb-4 rounded-none border-0 border-b-2 border-white text-2xl'
                />

                <h3 className='pb-2 text-2xl text-highlight'>Công thức</h3>
              </div>
            </div>

            {/* steps ul */}
            <ul>
              <li className='grid grid-cols-12 gap-4 text-lg'>
                <div className='justify-self-end'>
                  <Badge className='text-xl'>1</Badge>
                </div>

                <div className='col-span-11'>
                  {/* <h3 className='pb-2 text-xl'>input</h3> */}
                  <Input
                    placeholder='Tên bước'
                    className='mb-4 rounded-none border-0 border-b-2 border-white text-xl'
                  />

                  <Textarea
                    placeholder='Mô tả chi tiết'
                    className='rounded-none border-2 border-white text-lg'
                  />

                  {/* <ul className='list-inside list-disc pb-4 indent-6'></ul> */}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button
            className='mt-6 bg-highlight text-lg text-white md:text-xl'
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
