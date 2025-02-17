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
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="cursor-pointer dark:text-gray-300"
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        <PaginationItem>
          <span className="px-4 py-2 text-lg dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              setCurrentPage(Math.min(totalPages, currentPage + 1));
              setQuestions([]);
            }}
            className="cursor-pointer dark:text-gray-300"
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>

        <PaginationItem className="flex">
          <Input
            type="number"
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onKeyDown={handleJump}
            placeholder="Jump to..."
            className="w-24 h-8 text-center dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
            className="h-8 px-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
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
