const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: string, required: true },

  lastName: { type: string, required: true },

  email: { type: string, required: true, unique: true },

  password: { type: string, required: true },

  age: { type: number, required: true },

  country: { type: string },

  grade: { type: string },

  Specialization: { type: string },

  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
});

module.exports = mongoose.model("User", userSchema);
