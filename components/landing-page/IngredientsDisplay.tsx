import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IngredientsCard from '../ingredient/IngredientsCard';

const IngredientsDisplay = () => {
  return (
    <Tabs defaultValue='vegetable' className='h-full overflow-auto'>
      <TabsList className='flex justify-center gap-8 rounded-none border-b border-[#aaaaaa] bg-inherit px-0 text-left text-foreground dark:border-[#393c49] md:justify-start'>
        <TabsTrigger
          value='vegetable'
          className='px-0 py-0.5 pr-1 text-left text-2xl data-[state=active]:rounded-none data-[state=active]:border-b-[3px] data-[state=active]:border-hightlight data-[state=active]:text-hightlight'
        >
          Rau
        </TabsTrigger>
        <TabsTrigger
          value='meat'
          className='px-0 py-0.5 pr-1 text-left text-2xl data-[state=active]:rounded-none data-[state=active]:border-b-[3px] data-[state=active]:border-hightlight data-[state=active]:text-hightlight'
        >
          Thịt
        </TabsTrigger>
        <TabsTrigger
          value='spice'
          className='px-0 py-0.5 pr-1 text-left text-2xl data-[state=active]:rounded-none data-[state=active]:border-b-[3px] data-[state=active]:border-hightlight data-[state=active]:text-hightlight'
        >
          Gia Vị
        </TabsTrigger>
        <TabsTrigger
          value='other'
          className='px-0 py-0.5 pr-1 text-left text-2xl data-[state=active]:rounded-none data-[state=active]:border-b-[3px] data-[state=active]:border-hightlight data-[state=active]:text-hightlight'
        >
          Khác
        </TabsTrigger>
      </TabsList>
      <TabsContent value='vegetable'>
        <Card className='flex-1 border-none'>
          <CardContent className='grid grid-cols-2 gap-4 bg-background p-0 md:grid-cols-4 '>
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
