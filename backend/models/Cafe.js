// models/Cafe.js
const mongoose = require("mongoose");

const cafeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model("Cafe", cafeSchema);