const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const cors = require("cors");
dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://admin:${DB_PASSWORD}@cluster0.ei4m9.mongodb.net/ltlgtime?retryWrites=true&w=majority`).then(() => {
  console.log("Connected to DB!");
});

app.use(express.json());
// To deliver static content
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authMiddleWare = require("./middlewares/auth");

// For logging
const morgan = require("morgan")
app.use(morgan('tiny'))


// for testing backend server
app.get("", (req, res) => {
  return res.json({message : "Hello, world!!"})
})

// Main APIs for the application
app.use("/users", require("./routes/usersApi"));
app.use(authMiddleWare);
app.use("/posts", require("./routes/postsApi"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}....`);
});
