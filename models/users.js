const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
});

usersSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", usersSchema);
