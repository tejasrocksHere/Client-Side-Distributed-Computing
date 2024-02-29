import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost", 
  user: "root",
  password: "",
  database: "test",
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
    console.log("MySQL username:", db.config.user);
  }
});

app.use(express.json()); // Parse JSON requests
t
app.get("/", (req, res) => {
  res.json("Hello, this is the backend");
});

app.get("/books", (req, res) => {
  const q = 'SELECT * FROM book';

  db.query(q, (err, data) => {
    if (err) {
      console.error("Error querying books:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const q = "DELETE FROM book WHERE id=?";
  db.query(q, [bookId], (err, data) => {
    if (err) {
      console.error("Error deleting book:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json("Book has been deleted successfully");
  });
});

app.post("/books", (req, res) => {
  const { name, desc1, cover, date, username } = req.body;

  const q = "INSERT INTO book (name, desc1, cover, date, username) VALUES (?, ?, ?, ?, ?)";
  const values = [name, desc1, cover, date, username];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error inserting book:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json("Book has been created successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const { name, desc1, cover, date } = req.body;

  const q = "UPDATE book SET name=?, desc1=?, cover=?, date=? WHERE id=?";
  const values = [name, desc1, cover, date, bookId];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error updating book:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json("Book has been updated successfully");
  });
});

const port = 8800;

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend connected on port ${port}`);
});