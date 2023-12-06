import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import IngredientsPick from '../ingredient/IngredientsPick';

const ToggleIngredientsList = () => {
  return (
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
            <IngredientsPick />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ToggleIngredientsList;
