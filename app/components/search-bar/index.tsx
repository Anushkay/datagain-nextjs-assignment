import SearcIcon from "@/app/icons/SearcIcon";
import { Input } from "@heroui/react";
import { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  width?: string;  
  height?: string; 
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

export default function SearchBar({
  width = "480px",
  height = "40px",
  filterValue,
  setFilterValue,
  placeholder = "Search",
}: SearchBarProps) {
  return (
    <div className="max-w-[420px] w-full">
      <Input
        startContent={<SearcIcon size={22} color="#2C4E6C" />}
        style={{ width, height }} 
        className="w-full" 
        classNames={{
          input: "bg-transparent placeholder:font-light placeholder:text-[12px]",
          inputWrapper: [
            "bg-transparent",
            "rounded-md",
            "border-[0.75px]",
            "border-gray-100",
            "hover:bg-transparent",
            "data-[hover=true]:bg-transparent",
            "focus-within:bg-transparent",
            "data-[focus=true]:bg-transparent",
            "shadow-none",
            "hover:shadow-none",
            "active:shadow-none",
          ],
        }}
        placeholder={placeholder}
        aria-label="Search-bar"
        type="text"
        value={filterValue}
        onClear={() => setFilterValue("")}
        onValueChange={setFilterValue}
      />
    </div>
  );
}
