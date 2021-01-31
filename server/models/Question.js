const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  schema: {
    type: Number,
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
  answers: [
    {
      body: String,
      date: Date.now,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

function setAnswer(num) {
  return (num / 100).toFixed(2);
}

module.exports = mongoose.model("Question", questionSchema);
