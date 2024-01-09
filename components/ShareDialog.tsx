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
import { Plus, ImagePlus, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

export function ShareDialog() {
  const { toast } = useToast();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='flex min-h-[250px] cursor-pointer select-none flex-col items-center justify-center rounded-2xl border-dashed border-highlight text-highlight'>
          <Plus className='mb-2 h-6 w-6' />
          <p>Chia sẻ công thức</p>
        </Card>
      </DialogTrigger>

      <DialogContent className='max-h-screen overflow-auto sm:max-w-[60vw]'>
        <div className='flex justify-center pb-6'>
          <Input
            placeholder='Tên món ăn'
            className='w-4/5 rounded-none border-0 border-b-4 border-highlight text-center text-3xl text-highlight placeholder:text-highlight placeholder:opacity-75 lg:w-1/3'
          />
        </div>

        {/* 1st row */}
        <div className='grid grid-cols-1 gap-0 gap-y-4 xl:grid-cols-4'>
          <div className='flex justify-center'>
            <Card
              className='flex aspect-square w-1/2 cursor-pointer select-none flex-col items-center justify-center rounded-2xl border-dashed border-highlight text-highlight xl:w-full'
              onClick={() => {
                toast({ title: 'Tính năng này hiện đang được phát triển.' });
              }}
            >
              <ImagePlus className='mb-2 h-6 w-6' />

              <p className='text-sm lg:text-base'>Thêm hình ảnh món ăn</p>
            </Card>
          </div>

          <div className='col-span-3 grid grid-cols-1 xl:grid-cols-12'>
            <div></div>

            <div className='col-span-11'>
              <Card
                className='flex h-full min-h-[200px] w-full cursor-pointer select-none flex-col items-center justify-center rounded-2xl border-dashed border-white text-white'
                onClick={() => {
                  toast({ title: 'Tính năng này hiện đang được phát triển.' });
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
                <li>
                  <Input
                    placeholder='Nguyên liệu'
                    className='mb-4 rounded-none border-0 border-b-2 border-white p-0 text-2xl'
                  />
                </li>
              </ul>

              <Button
                variant={'default'}
                className='bg-transparent text-highlight hover:bg-highlight hover:text-white'
                onClick={() => {
                  toast({
                    title: 'Tính năng này hiện đang được phát triển.',
                  });
                }}
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
              <li className='grid grid-cols-12'>
                <div className='justify-self-center'>
                  <Badge className='text-xl'>1</Badge>
                </div>

                <div className='col-span-11'>
                  <Input
                    placeholder='Tên bước'
                    className='mb-4 rounded-none border-0 border-b-2 border-white p-2 text-xl md:p-0'
                  />

                  <Textarea
                    placeholder='Mô tả chi tiết'
                    className='mb-4 rounded-none border-2 border-white text-lg'
                  />

                  <Card
                    className='flex aspect-square w-3/5 cursor-pointer select-none flex-col items-center justify-center rounded-2xl border-dashed border-highlight text-highlight xl:w-1/3'
                    onClick={() => {
                      toast({
                        title: 'Tính năng này hiện đang được phát triển.',
                      });
                    }}
                  >
                    <ImagePlus className='mb-2 h-6 w-6' />

                    <p className='text-sm lg:text-base'>
                      Thêm hình ảnh cho bước 1
                    </p>
                  </Card>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 4th row */}
        <div className='grid grid-cols-1 gap-0 gap-y-4 xl:grid-cols-4'>
          <div></div>

          <div className='col-span-3 grid grid-cols-12'>
            <div></div>

            <div className='col-span-11'>
              <Button
                variant={'default'}
                className='bg-transparent text-highlight hover:bg-highlight hover:text-white'
                onClick={() => {
                  toast({
                    title: 'Tính năng này hiện đang được phát triển.',
                  });
                }}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            className='mt-6 bg-highlight text-lg text-white md:text-xl'
            size={'lg'}
            onClick={() => {
              toast({ title: 'Tính năng này hiện đang được phát triển.' });
            }}
          >
            Chia sẻ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
