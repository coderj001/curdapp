import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/add", (req, res) => {
  res.render("add_employees");
});

router.get("/view", (req, res) => {
  res.render("view_employees");
});

export default router;
