import { Search as SearchButton } from 'lucide-react';
import { Input } from '../ui/input';

const SearchIngredients = () => {
  return (
    <div className='relative mr-3'>
      <SearchButton
        className='absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500'
        size={20}
      />
      <Input
        className='bg-[dark:bg-[#2d303e] pl-10'
        placeholder='Tìm kiếm nguyên liệu...'
      />
    </div>
  );
};

export default SearchIngredients;
