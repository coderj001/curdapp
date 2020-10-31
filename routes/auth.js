const express = require("express");
const passport = require("passport");
const User = require("../models/users");

const router = express.Router();

// Get routes
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

// Post routes
router.post("/login", (req, res) => {
  res.render("login");
});

router.post("/signup", (req, res) => {
  let { name, email, password } = req.body;
  let userData = {
    name: name,
    email: email,
  };
  User.register(userData, password, (err, user) => {
    if (err) {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/users/signup");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success_msg", "Account is created successfully.");
      res.redirect("/view");
    });
  });
});

module.exports = router;
