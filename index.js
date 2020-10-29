import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config({ path: "./config.env" });

// Mongodb config
mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static
app.use(express.static("public"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Started At ${port}`);
});
