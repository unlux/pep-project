const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const checkUsername = require("./auth/auth");

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// CORS Middleware (Fixed)
app.use(
  cors({
    origin: "*", // Change this to your frontend URL for security
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "method", "username"],
    optionsSuccessStatus: 200,
  })
);
app.options("*", cors()); // Handle preflight requests

app.use(express.json());
app.use(checkUsername);
app.use(morgan("dev"));

// Get questions
app.get("/questions", async (req, res) => {
  const { title, page = 1, type } = req.query;
  const pageSize = 20;
  const skip = (Number(page) - 1) * pageSize;

  try {
    const whereClause = {
      title: {
        contains: title,
        mode: "insensitive",
      },
    };

    if (type && type !== "ALL") {
      whereClause.type = { equals: type };
    }

    const [questions, total] = await Promise.all([
      prisma.questions.findMany({
        where: whereClause,
        skip,
        take: pageSize,
      }),
      prisma.questions.count({
        where: whereClause,
      }),
    ]);

    res.json({
      items: questions,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// Ensure server listens properly on Render
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
