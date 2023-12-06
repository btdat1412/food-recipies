"use client"; // DropdownHeader.jsx

import { useState } from "react";
import { AlignJustify, LogOut } from "lucide-react";
import Image from "next/image";

const DropdownHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="text-left">
      <AlignJustify
        onClick={toggleDropdown}
        className="w-[30px] h-[30px] text-hightlight block md:hidden"
      />

      {isOpen && (
        <div
          className="flex flex-col items-start absolute top-[88px] left-0 w-full z-10 
        scale-100 origin-top transition-transform duration-300 ease-in-out rounded-md shadow-lg bg-darkbg"
        >
          <ul>
            <li>
              <a href={"/"} className="block px-4 py-2 text-sm ">
                Đề xuất món ăn
              </a>
            </li>
            <li>
              <a href={"/"} className="block px-4 py-2 text-sm ">
                Công thức nấu ăn
              </a>
            </li>
            <li>
              <a href={"/"} className="block px-4 py-2 text-sm ">
                Lên Thực Đơn
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-4 px-4 pt-2">
            <Image
              src="/images/avatar_placeholder.png"
              alt="avatar"
              width={50}
              height={50}
            />
            <LogOut className="w-[30px] h-[30px] text-icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownHeader;
