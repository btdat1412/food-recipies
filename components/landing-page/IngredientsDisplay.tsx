import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IngredientsCard from '../ingredient/IngredientsCard';

const IngredientsDisplay = () => {
  return (
    <Tabs defaultValue='vegetable' className='h-full overflow-auto'>
      <TabsList className='flex justify-center gap-8 rounded-none border-b border-[#393c49] bg-inherit px-0 text-left text-foreground md:justify-start'>
        <TabsTrigger
          value='vegetable'
          className='px-0 text-left text-2xl data-[state=active]:rounded-none data-[state=active]:border-b data-[state=active]:border-hightlight data-[state=active]:text-hightlight'
        >
          Rau
        </TabsTrigger>
        <TabsTrigger
          value='meat'
          className='px-0 text-left text-2xl data-[state=active]:rounded-none data-[state=active]:border-b data-[state=active]:border-hightlight data-[state=active]:text-hightlight'
        >
          Thịt
        </TabsTrigger>
        <TabsTrigger
          value='spice'
          className='px-0 text-left text-2xl data-[state=active]:rounded-none data-[state=active]:border-b data-[state=active]:border-hightlight data-[state=active]:text-hightlight'
        >
          Gia Vị
        </TabsTrigger>
        <TabsTrigger
          value='other'
          className='px-0 text-left text-2xl data-[state=active]:rounded-none data-[state=active]:border-b data-[state=active]:border-hightlight data-[state=active]:text-hightlight'
        >
          Khác
        </TabsTrigger>
      </TabsList>
      <TabsContent value='vegetable'>
        <Card className='flex-1 '>
          <CardContent className='grid grid-cols-2 gap-4 p-0 md:grid-cols-4 '>
            {Array.from({ length: 20 }, (_, index) => (
              <IngredientsCard
                key={index}
                image='/images/image_1.png'
                name='Bắp cải'
                kcal='20'
              />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default IngredientsDisplay;
