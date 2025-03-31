const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to the SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
    // Create a users table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          phone TEXT,
          email TEXT UNIQUE,
          password TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Table creation error:", err.message);
        }
      }
    );

    // Create an appointments table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS appointments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          phone TEXT,
          appointment_date TEXT,
          time_slot TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Table creation error:", err.message);
        }
      }
    );
  }
});

// API endpoint for signup
app.post("/api/signup", (req, res) => {
  const { name, phone, email, password } = req.body;

  const checkEmailSql = "SELECT * FROM users WHERE email = ?";
  db.get(checkEmailSql, [email], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Database error occurred." });
    } else if (row) {
      res.status(400).json({ error: "Email already exists. Please use a different email." });
    } else {
      const sql = "INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)";
      const params = [name, phone, email, password];

      db.run(sql, params, function (err) {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json({ message: "User registered successfully!", id: this.lastID });
        }
      });
    }
  });
});

// API endpoint for login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  const params = [email, password];

  db.get(sql, params, (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(401).json({ error: "Invalid login credentials" });
    } else {
      const token = Math.random().toString(36).substr(2);
      res.status(200).json({ token, user: row });
    }
  });
});

// API endpoint for creating an appointment
app.post("/api/appointments", (req, res) => {
  const { appointmentDate, timeSlot, name, phone } = req.body;

  const sql = `
    INSERT INTO appointments (name, phone, appointment_date, time_slot)
    VALUES (?, ?, ?, ?)
  `;
  const params = [name, phone, appointmentDate, timeSlot];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: "Appointment created successfully!", id: this.lastID });
    }
  });
});

// API endpoint to fetch appointments
app.get("/api/appointments", (req, res) => {
  const sql = "SELECT * FROM appointments";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// API endpoint for notifications
app.get("/api/notifications", (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required to fetch notifications." });
  }

  const sql = `
    SELECT * FROM appointments
    WHERE phone IN (SELECT phone FROM users WHERE email = ?)
    ORDER BY appointment_date ASC, time_slot ASC
  `;

  db.all(sql, [email], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});