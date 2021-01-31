import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import AddAnswer from "../Answer/AddAnswer";

// const { useEffect, useState } = require("react");

//View for a single question.
//Display answers if any
const ViewQuestion = (props) => {
  if (typeof props.location.state === "undefined") {
    return <Redirect to="/" />;
  }

  // const [questions, setQuestions] = useState([]);
  return (
    <React.Fragment>
      <div>
        <h3 key={props.location.state.question.id}>
          <p>{props.location.state.question.text}</p>
        </h3>

       <AddAnswer state={ props.location.state.question.id } / >
      </div>
    </React.Fragment>
  );
};

export default ViewQuestion;
