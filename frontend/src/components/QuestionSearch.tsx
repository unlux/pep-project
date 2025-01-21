import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IBlock {
  text: string;
  showInOption: boolean;
  isAnswer: boolean;
}

interface IQuestion {
  _id: string;
  type: "ANAGRAM" | "CONTENT_ONLY" | "READ_ALONG" | "MCQ";
  anagramType?: string;
  blocks?: IBlock[];
  siblingId?: string;
  solution?: string;
  title: string;
}

interface PaginatedResponse {
  items: IQuestion[];
  total: number;
  currentPage: number;
  totalPages: number;
}

const QuestionSearch = () => {
  //variables
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [jumpPage, setJumpPage] = useState(""); // Add state for jump input

  const fetchQuestions = async (query: string, page: number) => {
    if (!query.trim()) {
      setQuestions([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get<PaginatedResponse>(
        "http://localhost:3000/questions",
        {
          headers: {
            method: "title",
            username: "lux",
          },
          params: {
            title: query.trim(),
            page,
          },
        }
      );

      setQuestions(response.data.items);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchQuestions(searchQuery, currentPage);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, currentPage]);

  // Add jump handler
  const handleJump = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = Number(jumpPage);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        setJumpPage("");
      }
    }
  };

  return (
    <div className="p-4 space-y-4 dark:bg-gray-900">
      <Card className="w-full dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="dark:text-white">
            <div className="relative">
              {/* main input */}
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />

              {/* pagination */}
              <p className="text-sm">
                {questions.length > 0 && (
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(1, prev - 1))
                          }
                          className="cursor-pointer dark:text-gray-300"
                          disabled={currentPage === 1}
                        />
                      </PaginationItem>

                      <PaginationItem>
                        <span className="px-4 py-2 dark:text-gray-300">
                          Page {currentPage} of {totalPages}
                        </span>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(totalPages, prev + 1)
                            )
                          }
                          className="cursor-pointer dark:text-gray-300"
                          disabled={currentPage === totalPages}
                        />
                      </PaginationItem>

                      <PaginationItem className="flex">
                        <Input
                          type="number"
                          value={jumpPage}
                          onChange={(e) => setJumpPage(e.target.value)}
                          onKeyDown={handleJump}
                          placeholder="Jump to..."
                          className="w-28 h-8 text-center dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
                )}
              </p>
            </div>
          </CardTitle>
        </CardHeader>

        {/* the questions are here */}
        <CardContent>
          <div className="space-y-2">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary dark:border-gray-300"></div>
              </div>
            ) : questions.length > 0 ? (
              questions.map((question) => (
                <Card key={question._id} className="dark:bg-gray-700">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium dark:text-white">
                          Title: {question.title}
                        </h3>
                        <p className="text-sm text-muted-foreground dark:text-gray-300">
                          Type: {question.type}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground dark:text-gray-400">
                {searchQuery !== "ALL"
                  ? "No questions found"
                  : "Start typing to search questions"}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionSearch;
