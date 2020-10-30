const express = require("express");
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
      req.flash("success_msg", "Employee created successfully.");
      res.redirect("/view");
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/view");
    });
});

router.get("/view", (req, res) => {
  Employees.find({})
    .then((employees) => {
      res.render("view_employees", { employees: employees });
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/view");
    });
});

router.get("/search", (req, res) => {
  res.render("search", { employees: null });
});

router.post("/search", (req, res) => {
  let searchQuery = { name: { $regex: req.body.search.trim(), $options: "i" } };
  Employees.find(searchQuery)
    .then((employees) => {
      res.render("search", { employees: employees });
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/view");
    });
});

router.get("/edit/:id", (req, res) => {
  Employees.findById(req.params.id)
    .then((employee) => {
      res.render("edit", { employee: employee });
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/view");
    });
});

router.put("/edit/:id", (req, res) => {
  Employees.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary,
      },
    }
  )
    .then((employee) => {
      req.flash("success_msg", "Employee updated successfully.");
      res.redirect("/view");
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/view");
    });
});

router.delete("/edit/:id", (req, res) => {
  Employees.findOneAndDelete(req.params.id)
    .then((employee) => {
      req.flash("success_msg", "Employee deleted successfully.");
      res.redirect("/view");
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/view");
    });
});

module.exports = router;
