'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ModeToggle } from '../ThemeToggle';
import { LogOut } from 'lucide-react';
import DropdownHeader from '../dropdown/DropdownHeader';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { theme } = useTheme();
  const [logoSrc, setLogoSrc] = useState('/images/logo_light.png');
  const router = useRouter();

  useEffect(() => {
    if (theme === 'light') {
      setLogoSrc('/images/logo_white.png');
    } else if (theme === 'dark') {
      setLogoSrc('/images/logo_dark.png');
    }
  }, [theme]);

  return (
    <header className='z-50 flex w-full items-center justify-between bg-white px-2 dark:bg-darkbg md:px-12 md:py-2'>
      <div className='flex gap-5'>
        <Image
          src={logoSrc}
          alt='Logo'
          width={88}
          height={88}
          className='cursor-pointer'
          onClick={() => router.push(`/`)}
        />
        <ul className='hidden items-center gap-5 text-xl md:flex'>
          <li>
            <a href={'/'}> Đề xuất món ăn</a>
          </li>
          <li>
            <a href={'/recipes'}> Công thức nấu ăn</a>
          </li>
          <li>
            <a href={'/'}> Lên thực đơn</a>
          </li>
        </ul>
      </div>
      <div className='flex items-center gap-5'>
        <ModeToggle />
        <Image
          src='/images/avatar_placeholder.png'
          alt='avatar'
          width={50}
          height={50}
          className='hidden md:block'
        />
        <LogOut className='hidden h-[30px] w-[30px] text-highlight md:block' />
        <DropdownHeader />
      </div>
    </header>
  );
};
export default Header;
