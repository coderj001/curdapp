const express = require("express");
const Employees = require("../models/employees.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/add", (req, res) => {
  res.render("add_employees");
});

router.get("/add/new", (req, res) => {
  let newEmployee = {
    name: req.body.name,
    designation: req.body.designation,
    salary: req.body.salary,
  };
  Employees.create(newEmployee)
    .then((employee) => {
      console.log(employee);
      res.redirect("/view");
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/view", (req, res) => {
  res.render("view_employees");
});

router.get("/search", (req, res) => {
  res.render("search");
});

module.exports = router;
