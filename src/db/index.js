const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3001", // Allow requests from this origin
    methods: "GET,POST,PUT,DELETE", // Allow these HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow these headers
  })
);

app.use(express.json());

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM posts");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Get a specific post by ID
app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the post" });
  }
});

// Create a new post
app.post("/posts", async (req, res) => {
  const { title, excerpt, content, author } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO posts (title, excerpt, content, author) VALUES (?, ?, ?, ?)",
      [title, excerpt, content, author]
    );
    res
      .status(201)
      .json({ id: result[0].insertId, title, excerpt, content, author });
  } catch (error) {
    res.status(500).json({ error: "Failed to create the post" });
  }
});

// Update an existing post by ID
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, content, author } = req.body;
  try {
    await db.query(
      "UPDATE posts SET title = ?, excerpt = ?, content = ?, author = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [title, excerpt, content, author, id]
    );
    res.json({ id, title, excerpt, content, author });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the post" });
  }
});

// Delete a post by ID
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM posts WHERE id = ?", [id]);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the post" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
