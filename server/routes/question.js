const express = require("express");
const { get } = require("mongoose");
const Question = require("../models/Question");
const router = express.Router();

//Add a question
router.post("/add", async (req, res) => {
  const question = new Question({
    text: req.body.amount,
  });

  try {
    const savedQuestion = await question.save();
    res.json(savedQuestion);
  } catch (error) {
    res.json({ message: error });
  }
});

//Get all questions
router.get("/", async (req, res) => {
  try {
    const question = await Question.find();
    res.json(question);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a specific question
router.get("/:questionId", async (req, res) => {
  try 
    const question = await Question.findById(req.params.questionId);
    res.json(question);
  } catch (error) {
    res.json({ message: error });
  }
});

//Delete question
router.delete("/:questionId", async (req, res) => {
  try {
    const removedQuestion = await Question.remove({ _id: req.params.questionId });
    res.json(removedQuestion);
  } catch (error) {
    res.json({ message: error });
  }
});


module.exports = router;
