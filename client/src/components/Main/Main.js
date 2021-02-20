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
        {questions.map((question, i) => (
          <div
            style={{ margin: "5px" }}
            class="card border-primary h-100"
            key={i}
          >
            <div class="card-body d-flex flex-column align-items-start" key={i}>
              <h4 class="card-title text-primary ng-binding" key={i}>
                <Link
                  key={i}
                  to={{ pathname: `/question`, state: { question } }}
                >
                  {question.text}
                </Link>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Main;
