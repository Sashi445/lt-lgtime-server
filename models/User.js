const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  confirmed: { type: Boolean, default: false },
});

const userModel = mongoose.model("USER", userSchema);

module.exports = userModel;
