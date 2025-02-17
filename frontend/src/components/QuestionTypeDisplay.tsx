import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { IQuestion } from "@/interfaces/interfaces";

const QuestionTypeDisplay: FC<{ question: IQuestion }> = ({ question }) => {
  if (question.type.toUpperCase() === "MCQ" && question.options?.length) {
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
  }
  if (question.type.toUpperCase() === "ANAGRAM" && question.blocks?.length) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="dark:text-gray-300 hover:dark:bg-gray-600/50 transition-colors flex items-center gap-1"
          >
            Anagram <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-4 w-60 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-2">
          {question.blocks.map((block, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <p className="text-sm dark:text-gray-300">
                {index}: {block.text}
              </p>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    );
  }
  // For other question types
  return (
    <span className="px-3 py-1 text-sm rounded-full border border-gray-300 dark:border-gray-600 dark:text-gray-300">
      {question.type.toUpperCase()}
    </span>
  );
};

export default QuestionTypeDisplay;
