// ...existing code...
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface AnagramDropDownProps {
  blocks: string[];
}

const AnagramDropDown: FC<AnagramDropDownProps> = ({ blocks }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Show Blocks</Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-60 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-2">
        {blocks.map((block, i) => (
          <Button key={i} variant="ghost" className="text-left">
            {block}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default AnagramDropDown;
// ...existing code...
