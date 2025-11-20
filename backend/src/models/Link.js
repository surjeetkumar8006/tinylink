const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 8
  },
  target: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  last_clicked: {
    type: Date
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Link", linkSchema);
