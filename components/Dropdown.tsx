import { Ingredient } from '../types';

type DropdownProps = {
  items: Ingredient[];
  onSelectItem: (item: Ingredient) => void;
};

export const Dropdown = ({ items, onSelectItem }: DropdownProps) => {
  return (
    <div className='relative'>
      <div className='absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg'>
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelectItem(item)}
            className='cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
