import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IngredientsCard from "../ingredient/IngredientsCard";

const IngredientsDisplay = () => {
  return (
    <Tabs defaultValue="vegetable" className="h-full overflow-auto">
      <TabsList className="flex bg-inherit justify-start gap-8 text-left text-foreground px-0 border-b border-[#393c49] rounded-none">
        <TabsTrigger
          value="vegetable"
          className="text-left px-0 text-2xl data-[state=active]:text-hightlight data-[state=active]:border-b data-[state=active]:border-hightlight data-[state=active]:rounded-none"
        >
          Rau
        </TabsTrigger>
        <TabsTrigger
          value="meat"
          className="text-left px-0 text-2xl data-[state=active]:text-hightlight data-[state=active]:border-b data-[state=active]:border-hightlight data-[state=active]:rounded-none"
        >
          Thịt
        </TabsTrigger>
        <TabsTrigger
          value="spice"
          className="text-left px-0 text-2xl data-[state=active]:text-hightlight data-[state=active]:border-b data-[state=active]:border-hightlight data-[state=active]:rounded-none"
        >
          Gia Vị
        </TabsTrigger>
        <TabsTrigger
          value="other"
          className="text-left px-0 text-2xl data-[state=active]:text-hightlight data-[state=active]:border-b data-[state=active]:border-hightlight data-[state=active]:rounded-none"
        >
          Khác
        </TabsTrigger>
      </TabsList>
      <TabsContent value="vegetable">
        <Card className="flex-1 ">
          <CardContent className="p-0 grid grid-cols-4 gap-4 ">
            {Array.from({ length: 20 }, (_, index) => (
              <IngredientsCard
                key={index}
                image="/images/image_1.png"
                name="Bắp cải"
                kcal="20"
              />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default IngredientsDisplay;
