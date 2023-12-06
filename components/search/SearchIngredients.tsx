import { Search as SearchButton } from "lucide-react";
import { Input } from "../ui/input";

const SearchIngredients = () => {
  return (
    <div className="relative">
      <SearchButton
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        size={20}
      />
      <Input
        className="pl-10 bg-[#2d303e]"
        placeholder="Tìm kiếm nguyên liệu"
      />
    </div>
  );
};

export default SearchIngredients;
