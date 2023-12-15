'use client'; // DropdownHeader.jsx

import { useState } from 'react';
import { AlignJustify, LogOut } from 'lucide-react';
import Image from 'next/image';

const DropdownHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='text-left'>
      <AlignJustify
        onClick={toggleDropdown}
        className='block h-[30px] w-[30px] text-hightlight md:hidden'
      />

      {isOpen && (
        <div
          className='absolute left-0 top-[88px] z-10 flex w-full origin-top scale-100 
        flex-col items-start rounded-md bg-darkbg shadow-lg transition-transform duration-300 ease-in-out'
        >
          <ul>
            <li>
              <a href={'/'} className='block px-4 py-2 text-sm '>
                Đề xuất món ăn
              </a>
            </li>
            <li>
              <a href={'/'} className='block px-4 py-2 text-sm '>
                Công thức nấu ăn
              </a>
            </li>
            <li>
              <a href={'/'} className='block px-4 py-2 text-sm '>
                Lên thực đơn
              </a>
            </li>
          </ul>
          <div className='flex items-center gap-4 px-4 pt-2'>
            <Image
              src='/images/avatar_placeholder.png'
              alt='avatar'
              width={50}
              height={50}
            />
            <LogOut className='text-icon h-[30px] w-[30px]' />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownHeader;
