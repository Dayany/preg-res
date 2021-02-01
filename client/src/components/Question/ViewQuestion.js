import React from "react";
import { Redirect } from "react-router-dom";
import AddAnswer from "../Answer/AddAnswer";

//View for a single question.
//Display answers if any
const ViewQuestion = (props) => {
  console.log(props.location.state.question.answers);
  if (typeof props.location.state === "undefined") {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <div>
        <h3 key={props.location.state.question.id}>
          <p>{props.location.state.question.text}</p>
        </h3>
        <AddAnswer state={props.location.state.question._id} />

        <div>
          {props.location.state.question.answers.map((answer) => (
            <h3 key={answer._id}>
             
             <p>{ answer.text}</p>
            </h3>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewQuestion;
