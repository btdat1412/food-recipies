"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type IngredientsCardProps = {
  image: string;
  name: string;
  kcal: string;
};

const IngredientsCard = ({ image, name, kcal }: IngredientsCardProps) => {
  return (
    <div className="w-[192px] h-[260px] bg-inherit relative flex flex-col items-center mt-6 ">
      <Image
        src={image}
        alt={name}
        width={150}
        height={150}
        className="z-10 absolute top-0"
      />
      <Card className="w-[192px] h-[226px] bg-darkbg mt-auto flex flex-col rounded-2xl">
        <CardContent className="mt-auto pb-0">
          <CardHeader className="flex flex-col items-center pb-9">
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="text-xl">{kcal} kcal</CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
};

export default IngredientsCard;
