"use client";
import { useTheme } from "next-themes";
import { useState } from "react";
import Image from "next/image";
import { ModeToggle } from "../ThemeToggle";
import { LogOut } from "lucide-react";
import DropdownHeader from "../dropdown/DropdownHeader";

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className="px-2 md:px-6 md:py-2 flex items-center justify-between dark:bg-darkbg w-full z-50">
      <div className="flex gap-5">
        {theme === "light" ? (
          <Image
            src="/images/logo_white.png"
            alt="logo_white"
            width={88}
            height={88}
          />
        ) : (
          <Image
            src="/images/logo_dark.png"
            alt="logo_dark"
            width={88}
            height={88}
          />
        )}
        <ul className="hidden md:flex items-center gap-5 text-xl">
          <li>
            <a href={"/"}> Đề xuất món ăn</a>
          </li>
          <li>
            <a href={"/"}> Công thức nấu ăn</a>
          </li>
          <li>
            <a href={"/"}> Lên Thực Đơn</a>
          </li>
        </ul>
      </div>
      <div className="flex gap-5 items-center">
        <ModeToggle />
        <Image
          src="/images/avatar_placeholder.png"
          alt="avatar"
          width={50}
          height={50}
          className="hidden md:block"
        />
        <LogOut className="w-[30px] h-[30px] text-hightlight hidden md:block" />
        <DropdownHeader />
      </div>
    </header>
  );
};
export default Header;
