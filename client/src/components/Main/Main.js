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
  return (
    <React.Fragment>
      <AddQuestion />
      <Categories />
      <div>
        {questions.map((question) => (
          <div style={{ margin: "5px" }} class="card border-primary h-100">
            <div class="card-body d-flex flex-column align-items-start">
              <h4 class="card-title text-primary ng-binding" key={question._id}>
                <Link
                  key={question._id}
                  to={{ pathname: `/question`, state: { question } }}
                >
                  {" "}
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
