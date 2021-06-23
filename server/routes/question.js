const express = require("express");
const Question = require("../models/Question");
const router = express.Router();

//Get all questions
router.get("/", async (req, res) => {
  try {
    const question = await Question.find().sort({ date: "asc" });
    res.status(200);
    res.json(question);
  } catch (err) {
    res.status(500);
    res.json({ message: err });
  }
});

//Add a question
router.post("/add", async (req, res) => {
  const question = new Question({
    text: req.body.text,
    email: req.body.email,
    category: req.body.category,
  });

  try {
    const savedQuestion = await question.save();
    res.status(200);
    res.json(savedQuestion);
  } catch (error) {
    res.status(500);
    res.json({ message: error });
  }
});

//Add answer
router.patch("/addanswer/:questionId", async (req, res) => {
  try {
    const updatedAnswer = await Question.findOneAndUpdate(
      { _id: req.params.questionId },
      { $addToSet: { answers: { text: req.body.text, date: Date.now } } },
      { new: true }
    );
    res.status(200);
    res.json(updatedAnswer);
  } catch (error) {
    res.status(500);
    res.json({ message: error });
  }
});

module.exports = router;
