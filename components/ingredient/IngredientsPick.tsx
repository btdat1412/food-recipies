import { Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const IngredientsPick = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-none flex justify-between items-center">
        <p>Nguyên liệu</p>
        <div className="flex items-center gap-[18px]">
          <p>Khối lượng(gam)</p>
          <Trash className="opacity-0 text-hightlight border border-hightlight p-[14px] w-12 h-12 rounded-xl" />
        </div>
      </div>
      <div className="grow py-6 border-t border-b border-hightlight h-full overflow-y-scroll no-scrollbar">
        <div className="flex flex-col gap-6">
          {/* Duplicate code */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/images/image_1.png"
                alt="ingredient"
                width={45}
                height={41}
              />
              <div className="flex flex-col">
                <p className="text-sm">Bắp cải</p>
                <p className="text-xs">24 kCal</p>
              </div>
            </div>
            <div className="flex items-center gap-[18px]">
              <div className="w-[114px] h-12 rounded-xl bg-background flex justify-center items-center">
                100
              </div>
              <Trash className="text-hightlight border border-hightlight p-[14px] w-12 h-12 rounded-xl" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/images/image_1.png"
                alt="ingredient"
                width={45}
                height={41}
              />
              <div className="flex flex-col">
                <p className="text-sm">Bắp cải</p>
                <p className="text-xs">24 kCal</p>
              </div>
            </div>
            <div className="flex items-center gap-[18px]">
              <div className="w-[114px] h-12 rounded-xl bg-background flex justify-center items-center">
                100
              </div>
              <Trash className="text-hightlight border border-hightlight p-[14px] w-12 h-12 rounded-xl" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/images/image_1.png"
                alt="ingredient"
                width={45}
                height={41}
              />
              <div className="flex flex-col">
                <p className="text-sm">Bắp cải</p>
                <p className="text-xs">24 kCal</p>
              </div>
            </div>
            <div className="flex items-center gap-[18px]">
              <div className="w-[114px] h-12 rounded-xl bg-background flex justify-center items-center">
                100
              </div>
              <Trash className="text-hightlight border border-hightlight p-[14px] w-12 h-12 rounded-xl" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/images/image_1.png"
                alt="ingredient"
                width={45}
                height={41}
              />
              <div className="flex flex-col">
                <p className="text-sm">Bắp cải</p>
                <p className="text-xs">24 kCal</p>
              </div>
            </div>
            <div className="flex items-center gap-[18px]">
              <div className="w-[114px] h-12 rounded-xl bg-background flex justify-center items-center">
                100
              </div>
              <Trash className="text-hightlight border border-hightlight p-[14px] w-12 h-12 rounded-xl" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/images/image_1.png"
                alt="ingredient"
                width={45}
                height={41}
              />
              <div className="flex flex-col">
                <p className="text-sm">Bắp cải</p>
                <p className="text-xs">24 kCal</p>
              </div>
            </div>
            <div className="flex items-center gap-[18px]">
              <div className="w-[114px] h-12 rounded-xl bg-background flex justify-center items-center">
                100
              </div>
              <Trash className="text-hightlight border border-hightlight p-[14px] w-12 h-12 rounded-xl" />
            </div>
          </div>
          {/* Duplicate code */}
        </div>
      </div>
      <div className="flex-none flex flex-col">
        <div className="flex justify-between mt-4">
          <p>Tổng Calories</p>
          <p>202 kCal</p>
        </div>
        <Button className="mt-6">Đề xuất món ăn</Button>
      </div>
    </div>
  );
};

export default IngredientsPick;
