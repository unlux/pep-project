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
  const { id, title } = req.query;

  if (req.headers["method"] == "id") {
    try {
      const question = await prisma.questions.findMany({
        where: { id },
        take: 20,
        orderBy: { id: "desc" },
      });
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      console.error("Error fetching question:", error);
      res.status(500).json({ error: "Failed to fetch question" });
    }
  }

  if (req.headers["method"] == "title") {
    try {
      const question = await prisma.questions.findMany({
        where: {
          title: {
            contains: title,
            mode: "insensitive",
          },
        },
        take: 100,
        orderBy: { id: "desc" },
      });
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      console.error("Error fetching question:", error);
      res.status(500).json({ error: "Failed to fetch question" });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
