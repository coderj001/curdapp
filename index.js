const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const employeesRouter = require("./routes/employees.js");

const app = express();

dotenv.config({ path: "./config.env" });

// Mongodb config
mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// Static
app.use(express.static("public"));

// Routes
app.use("/", employeesRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Started At Port:${port}`);
});
