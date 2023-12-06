import React from "react";
import SearchIngredients from "../components/search/SearchIngredients";
import IngredientsDisplay from "../components/landing-page/IngredientsDisplay";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import IngredientsPick from "../components/ingredient/IngredientsPick";

export default async function Home() {
  return (
    <div className="pt-8 px-2 md:px-6 flex justify-between gap-9 h-full">
      <div className="flex flex-col w-full h-full gap-6">
        <div className=" flex justify-between items-center">
          <h1 className="text-3xl">Chọn Nguyên Liệu</h1>
          <SearchIngredients />
        </div>
        <IngredientsDisplay />
      </div>
      <Card className="w-[502px] h-full bg-darkbg flex flex-col rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Nguyên liệu đã chọn</CardTitle>
        </CardHeader>
        <CardContent className="grow h-full overflow-auto">
          <IngredientsPick />
        </CardContent>
      </Card>
    </div>
  );
}
