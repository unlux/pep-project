import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

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

const QuestionSearch = () => {
  //variables
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async (query: string) => {
    if (!query.trim()) {
      setQuestions([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get("http://localhost:3000/questions", {
        headers: {
          method: "title",
          username: "lux",
        },
        params: { title: query.trim() },
      });

      setQuestions(response.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchQuestions(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="p-4 space-y-4 dark:bg-gray-900">
      <Card className="w-full dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="dark:text-white">
            <div className="relative">
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </CardTitle>
        </CardHeader>

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
