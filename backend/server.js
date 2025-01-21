const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const checkUsername = require("./auth/auth");

const app = express();
const prisma = new PrismaClient();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(checkUsername);
app.use(morgan("dev"));
app.use(cors());

// Get questions
app.get("/questions", async (req, res) => {
  const { title, page = 1 } = req.query;
  const pageSize = 20;
  const skip = (Number(page) - 1) * pageSize;

  if (req.headers["method"] == "title") {
    try {
      const [questions, total] = await Promise.all([
        prisma.questions.findMany({
          where: {
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
          skip,
          take: pageSize,
          // orderBy: { id: "desc" },
        }),
        prisma.questions.count({
          where: {
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
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
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
