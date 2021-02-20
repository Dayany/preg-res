const express = require("express");
const { get } = require("mongoose");
const Question = require("../models/Question");
const router = express.Router();

//Add a question
router.post("/add", async (req, res) => {
  const question = new Question({
    text: req.body.text,
    email: req.body.email,
    category: req.body.category,
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
    const question = await Question.find().sort({ _id: -1 });
    res.json(question);
  } catch (err) {
    res.json({ message: err });
  }
});

//Add answer
router.patch("/addanswer/:questionId", async (req, res) => {
  try {
    const updatedAnswer = await Question.findOneAndUpdate(
      { _id: req.params.questionId },
      { $addToSet: { answers: { text: req.body.text , createdAt: Date.now} } }, 
      {new: true}
    );
    res.json(updatedAnswer);
  } catch (error) {
    res.json({ message: error });
  }
});
//Update charge
// router.patch("/addanswer/:chargeId", async (req, res) => {
//   try {
//     const updatedCharge = await Charge.updateOne(
//       { _id: req.params.chargeId },
//       { $set: { answers : req.body.answer } }
//     );
//     res.json(updatedCharge);
//   } catch (error) {
//     res.json({ message: error });
//   }
// });

//Delete question
// router.delete("/:questionId", async (req, res) => {
//   try {
//     const removedQuestion = await Question.remove({ _id: req.params.questionId });
//     res.json(removedQuestion);
//   } catch (error) {
//     res.json({ message: error });
//   }
// });

module.exports = router;
