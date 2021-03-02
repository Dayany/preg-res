const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const questionApp = express();
questionApp.use(cors({origin: true}));

// Retrieve all questions
questionApp.get("/", async (req, res) => {
  const snapshot = await db.collection("questions").get();
  const questions = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    questions.push({
      id,
      ...data,
    });
  });
  res.set("Access-Control-Allow-Origin", "*");
  res.status(200).send(JSON.stringify(questions));
});

// Add a question
questionApp.post("/add", async (req, res) => {
  const date = admin.firestore.Timestamp.now();
  const question = {
    date,
    ...req.body,
  };
  await db.collection("questions").add(question);
  res.status(201).send();
});

questionApp.put("/addanswer/:questionId", async (req, res) => {
  const body = req.body;
  await db.collection("questions").doc(req.params.id).update({
    body,
  });
  res.status(200).send();
});
exports.questions = functions.https.onRequest(questionApp);
