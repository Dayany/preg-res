import { Link } from "react-router-dom";
import React from "react";
import AddQuestion from "../Question/AddQuestion.js";
import Categories from "./Categories.js";

const { useEffect, useState } = require("react");

function Main() {
  useEffect(() => {
    fetchQuestions();
  }, []);

  const [questions, setQuestions] = useState([]);
  const fetchQuestions = async () => {
    const data = await fetch("http://localhost:8080/question");
    const questions = await data.json();
    setQuestions(questions);
  };
  return (
    <React.Fragment>
      <AddQuestion />
      <Categories />
      <div>
        {questions.map((question) => (
          <h3 key={question._id}>
            <Link
              key={question._id}
              to={{ pathname: `/question`, state: { question } }}
            >
              {" "}
              {question.text}
            </Link>
          </h3>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Main;
