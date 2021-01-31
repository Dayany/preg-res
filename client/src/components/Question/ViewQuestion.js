import React from "react";

// const { useEffect, useState } = require("react");

const ViewQuestion = (props) => {

  // const [questions, setQuestions] = useState([]);
  return (
    <React.Fragment>
      <div>
        <h3 key={props.location.state.question.id}>
          <p>{props.location.state.question.text }</p>
        </h3>
      </div>
    </React.Fragment>
  );
}

export default ViewQuestion;
