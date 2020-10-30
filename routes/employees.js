const express = require("express");
const employees = require("../models/employees.js");
const Employees = require("../models/employees.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/add", (req, res) => {
  res.render("add_employees");
});

router.post("/add/new", (req, res) => {
  let newEmployee = {
    name: req.body.name,
    designation: req.body.designation,
    salary: req.body.salary,
  };
  Employees.create(newEmployee)
    .then((employee) => {
      res.redirect("/view");
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/view", (req, res) => {
  Employees.find({})
    .then((employees) => {
      res.render("view_employees", { employees: employees });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/search", (req, res) => {
  res.render("search", { employees: null });
});

router.post("/search", (req, res) => {
  let searchQuery = { name: req.body.search };
  Employees.find(searchQuery)
    .then((employees) => {
      res.render("search", { employees: employees });
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
