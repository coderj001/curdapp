const mongoose = require("mongoose");

let employeesSchema = new mongoose.Schema({
  name: String,
  designation: String,
  salary: Number,
});

module.exports = mongoose.model("Employees", employeesSchema);
