const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
