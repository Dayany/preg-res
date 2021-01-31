import { Link } from "react-router-dom";
import React from "react";
import AddQuestion from "../Question/AddQuestion.js";

const { useEffect, useState } = require("react");

function Main() {
  useEffect(() => {
    fetchQuestions();
  }, []);

  

  const [questions, setQuestions] = useState([]);

  const  fetchQuestions = async () => {
    const questions = [{ id: "211312", text: "Tesasdasdsat"}, { id: "2113123", text: "Tesasdasdsatckjnzxkcn"}];
    // const data = await fetch("http://localhost:8080/question");
    // const questions = await data.json();
    setQuestions(questions);
  };
  return (
    <React.Fragment>
    <AddQuestion />
        <div>
        { questions.map( question => (
           <h3 key={question._id}><Link to={{ pathname: `/question`,  state: { question } }} > { question.text }</Link></h3>
        )) }
        </div>
    </React.Fragment>
  );
}

export default Main;
