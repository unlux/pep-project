interface QuestionsBlocks {
  isAnswer: boolean;
  showInOption: boolean;
  text: string;
}

interface QuestionsOptions {
  isCorrectAnswer: boolean;
  text: string;
}

interface IQuestion {
  id: string;
  type: string;
  anagramType?: string;
  blocks?: QuestionsBlocks[];
  options?: QuestionsOptions[];
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

export type { QuestionsBlocks, QuestionsOptions, IQuestion, PaginatedResponse };
