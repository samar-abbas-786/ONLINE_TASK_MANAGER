// practice2.js
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/taskSchema"); // Import the User model with correct path
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// DATABASE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// Set up EJS view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views")); // Correct path to the views folder

// Route to render the signup form
app.get("/", (req, res) => {
  return res.render("signup");
});

// app.post("/user/signup", async (req, res) => {
//   const data = {
//     fullName: req.body.fullName,
//     email: req.body.email,
//     password: req.body.password,
//   };
//   await User.insertMany([data]);
//   res.render("task");
// });
// Route to handle the signup form submission
app.post("/user/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(req.body);
  try {
    await User.create({
      fullName,
      email,
      password,
    });
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
