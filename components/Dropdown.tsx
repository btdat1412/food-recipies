import { Ingredient } from '../types';

type DropdownProps = {
  items: Ingredient[];
  onSelectItem: (item: Ingredient) => void;
};

export const Dropdown = ({ items, onSelectItem }: DropdownProps) => {
  return (
    <div className='relative'>
      <div className='absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-background shadow-lg max-h-60 overflow-y-auto'>
        {items.map((item, index) => (
          <div
            key={index}
            onMouseDown={() => onSelectItem(item)}
            className='cursor-pointer px-4 py-2 text-sm hover:bg-gray-200 hover:text-darkbg'
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
