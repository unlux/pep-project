import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface TypeFilterPopoverProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  setCurrentPage: (page: number) => void;
}
const questionTypes = ["ALL", "ANAGRAM", "CONTENT_ONLY", "READ_ALONG", "MCQ"];

const TypeFilterPopover: FC<TypeFilterPopoverProps> = ({
  selectedType,
  setSelectedType,
  setCurrentPage,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="dark:text-gray-300">
          {selectedType === "ALL" ? "ALL Types" : selectedType}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-60 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-2">
        {questionTypes.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? "solid" : "ghost"} // Changed variant to "solid"
            onClick={() => {
              setSelectedType(type);
              setCurrentPage(1); // Reset to first page on filter change
            }}
            className={`w-full text-left ${
              selectedType === type
                ? "bg-gray-600 text-white hover:bg-gray-500" // Custom classes for selected state
                : "dark:text-gray-300"
            }`}
          >
            {type}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default TypeFilterPopover;
