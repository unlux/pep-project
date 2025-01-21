// services/questionService.ts
import mongoose, { Schema, Document } from "mongoose";

// Define interfaces
export interface IBlock {
  text: string;
  showInOption: boolean;
  isAnswer: boolean;
}

export interface IQuestion extends Document {
  type: "ANAGRAM" | "CONTENT_ONLY" | "READ_ALONG" | "MCQ";
  anagramType?: string;
  blocks?: IBlock[];
  siblingId?: mongoose.Types.ObjectId;
  solution?: string;
  title: string;
}

// Define schemas
const BlockSchema = new Schema<IBlock>({
  text: { type: String, required: true },
  showInOption: { type: Boolean, required: true },
  isAnswer: { type: Boolean, required: true },
});

const QuestionSchema = new Schema<IQuestion>({
  type: {
    type: String,
    required: true,
    enum: ["ANAGRAM", "CONTENT_ONLY", "READ_ALONG", "MCQ"],
  },
  anagramType: String,
  blocks: [BlockSchema],
  siblingId: { type: Schema.Types.ObjectId, ref: "Question" },
  solution: String,
  title: { type: String, required: true },
});

// Create model
export const Question = mongoose.model<IQuestion>("Question", QuestionSchema);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.tsgqtix.mongodb.net/"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Service functions
export const searchQuestions = async (
  searchQuery: string,
  type: string
): Promise<IQuestion[]> => {
  try {
    let query: any = {};

    // Add search condition if searchQuery exists
    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" };
    }

    // Add type filter if specific type is selected
    if (type && type !== "ALL") {
      query.type = type;
    }

    const questions = await Question.find(query)
      .limit(20) // Limit results for performance
      .exec();

    return questions;
  } catch (error) {
    console.error("Error searching questions:", error);
    throw error;
  }
};

export default {
  connectDB,
  searchQuestions,
};
