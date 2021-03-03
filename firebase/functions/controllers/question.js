/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const questionApp = express();
questionApp.use(cors({ origin: true }));

// Retrieve all questions
questionApp.get("/", async (req, res) => {
  const snapshot = await db
    .collection("questions")
    .orderBy("date", "desc")
    .get();
  const questions = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    questions.push({
      _id: id,
      ...data,
    });
  });
  res.status(200).send(JSON.stringify(questions));
});

// Add a question
questionApp.post("/add", async (req, res) => {
  const date = admin.firestore.Timestamp.now();
  const question = {
    date,
    ...req.body,
    answers: [],
  };
  await db.collection("questions").add(question);
  res.status(201).send(JSON.stringify(question));
});

questionApp.patch("/addanswer/:questionId", async (req, res) => {
  const date = admin.firestore.Timestamp.now();
  const body = req.body;
  const questionRef = await db
    .collection("questions")
    .doc(req.params.questionId.toString());
  await questionRef.update({
    answers: admin.firestore.FieldValue.arrayUnion({ date, ...body }),
  });
  const data = (await questionRef.get().then()).data();
  res.status(200).send(JSON.stringify(data));
});
exports.questions = functions.https.onRequest(questionApp);
