import PaginationControls from "@/components/PaginationControls";
import TypeFilterPopover from "@/components/TypeFilterPopover";
import axios from "axios";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IQuestion, PaginatedResponse } from "@/interfaces/interfaces";
import QuestionTypeDisplay from "./QuestionTypeDisplay";
import Example from "./Example";

const PAGE_SIZE = 20;

const QuestionSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedType, setSelectedType] = useState("ALL");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const fetchQuestions = async (
    query: string,
    page: number,
    typeFilter: string
  ) => {
    if (!query.trim()) {
      setQuestions([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get<PaginatedResponse>(
        "https://pep-project.onrender.com/questions",
        {
          headers: {
            method: "title",
            username: "lux",
          },
          params: {
            title: query.trim(),
            page,
            // If typeFilter is "ALL", skip sending it
            ...(typeFilter !== "ALL" && { type: typeFilter }),
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
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      fetchQuestions(debouncedQuery, currentPage, selectedType);
    }
  }, [debouncedQuery, currentPage, selectedType]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4 md:p-6">
      <Card className="container mx-auto h-[calc(100vh-3rem)] dark:bg-gray-800/50 backdrop-blur border-gray-200 dark:border-gray-700 shadow-xl">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700/50">
          <CardTitle className="dark:text-white text-center space-y-6">
            {/* Search and Filter */}
            <div className="relative mx-auto flex items-center gap-4">
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                  setQuestions([]);
                }}
                className="w-full h-12 rounded-xl shadow-sm
                  dark:bg-gray-700/50 dark:text-white dark:border-gray-600
                  focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500
                  transition-all duration-200"
              />

              {/* Type Filter Popover */}
              <TypeFilterPopover
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                setCurrentPage={setCurrentPage}
              />
            </div>

            {/* Pagination controls */}
            {questions.length > 0 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                setQuestions={setQuestions}
              />
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="overflow-auto h-[calc(100%-12rem)] py-6">
          <div className="space-y-4  mx-auto">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-400 dark:border-gray-300"></div>
              </div>
            ) : questions.length > 0 ? (
              questions.map((question, index) => {
                const globalIndex = (currentPage - 1) * PAGE_SIZE + index + 1;
                return (
                  <Card
                    key={question.id}
                    className="dark:bg-gray-700/50 backdrop-blur transition-all duration-200 hover:shadow-md"
                  >
                    <CardContent className="p-4 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-lg dark:text-white flex items-center gap-2">
                          <span className="px-2 py-0.5 text-sm rounded-full bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                            {globalIndex}
                          </span>
                          {question.title}
                        </h3>
                        <QuestionTypeDisplay question={question} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              !isLoading && (
                <div className="text-center py-12">
                  {debouncedQuery ? (
                    <p className="text-gray-500 dark:text-gray-400">
                      No questions found
                    </p>
                  ) : (
                    <div className="max-w-2xl mx-auto">
                      <Example />
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionSearch;
