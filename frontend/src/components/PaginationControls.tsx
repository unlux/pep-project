import { FC, useState, KeyboardEvent } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IQuestion } from "@/interfaces/interfaces";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setQuestions: (questions: IQuestion[]) => void;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  setQuestions,
}) => {
  const [jumpPage, setJumpPage] = useState("");

  const handleJump = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = Number(jumpPage);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        setJumpPage("");
        setQuestions([]);
      }
    }
  };

  return (
    <Pagination>
      <PaginationContent className="flex items-center justify-center gap-4">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="h-9 cursor-pointer dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors flex items-center"
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        <PaginationItem>
          <span className="h-9 px-4 inline-flex items-center text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-700/50 dark:text-gray-300">
            {currentPage} / {totalPages}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => setCurrentPage(Math.max(1, currentPage + 1))}
            className="h-9 cursor-pointer dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors flex items-center"
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>

        <PaginationItem className="flex items-center gap-2">
          <Input
            type="number"
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onKeyDown={handleJump}
            placeholder="Jump"
            className="w-20 h-9 text-center rounded-lg dark:bg-gray-700/50 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition-all"
            min={1}
            max={totalPages}
          />
          <Button
            onClick={() => {
              const page = Number(jumpPage);
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
                setJumpPage("");
              }
            }}
            className="h-9 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700/50 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600/50 transition-colors"
            variant="outline"
            size="sm"
          >
            Go
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
