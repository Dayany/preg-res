import React from "react";
import AddQuestion from "../Question/AddQuestion.js";
import Categories from "./Categories.js";
import CardQuestion from "../Question/CardQuestion.js";

const { useEffect, useState } = require("react");

function Main() {
  useEffect(() => {
    fetchQuestions();
  }, []);

  const [questions, setQuestions] = useState([]);
  const fetchQuestions = async () => {
    const data = await fetch(process.env.REACT_APP_DB_URL + "/question");
    const questions = await data.json();
    setQuestions(questions);
  };

  const updateQuestions = (question) => {
    const newQuestions = [question].concat(questions);
    setQuestions(newQuestions);
  };
  return (
    <React.Fragment>
      <AddQuestion setQuestionsChild={updateQuestions} />
      <Categories />
      <div>
        {questions.map((question) => (
          <div key={question._id}>
            <CardQuestion state={question} />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Main;
