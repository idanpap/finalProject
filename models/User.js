const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: String,
    password: String,
    languagesSpoken: { type: Array, default: [] },
    languagesToLearn: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
