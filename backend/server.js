const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const checkUsername = require("./auth/auth");

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(checkUsername);
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
