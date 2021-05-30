const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  schema_ver: {
    type: Number,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  category: {
    type: Number,
    default: 0,
  },
  answers: [
    {
      text: String,
    },
    {
      date: Date,
    },
  ],
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("Question", questionSchema);
