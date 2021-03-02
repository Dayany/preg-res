const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
admin.initializeApp(functions.config().firebase);

const app = express();

// Retrieve all questions
app.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection("questions").get();
  const questions = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    questions.push({id, ...data});
  });
  res.set("Access-Control-Allow-Origin", "*");
  res.status(200).send(JSON.stringify(questions));
});

// Add a question
app.post("/add", async (req, res) => {
  const date = admin.firestore.Timestamp.now();
  const question = {
    date,
    ...req.body,
  };
  await admin.firestore().collection("questions").add(question);
  res.set("Access-Control-Allow-Origin", "*");
  res.status(201).send();
});

app.put("/addanswer/:questionId", async (req, res) => {
  const body = req.body;
  await admin.firestore().collection("questions").doc(req.params.id).update({
    body,
  });
  res.set("Access-Control-Allow-Origin", "*");
  res.status(200).send();
  // const updatedAnswer = await Question.findOneAndUpdate(
  //   { _id: req.params.questionId },
  //   { $addToSet: { answers: { text: req.body.text, createdAt: Date.now } } },
  //   { new: true }
  // );
});
exports.questions = functions.https.onRequest(app);

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
