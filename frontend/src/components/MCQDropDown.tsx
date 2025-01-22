import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IQuestion } from "@/interfaces/interfaces";
import { ChevronDown } from "lucide-react";

interface MCQDropDownProps {
  question: IQuestion;
}

const MCQDropDown: FC<MCQDropDownProps> = ({ question }) => {
  if (question.type.toUpperCase() !== "MCQ" || !question.options?.length) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="dark:text-gray-300 hover:dark:bg-gray-600/50 transition-colors flex items-center gap-1"
        >
          MCQ <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4 dark:bg-gray-800 dark:border-gray-700/50">
        {question.options.map((option, index) => (
          <div key={index} className="mb-2 last:mb-0">
            <p className="text-sm dark:text-gray-300">
              {index}: {option.text}
            </p>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default MCQDropDown;
