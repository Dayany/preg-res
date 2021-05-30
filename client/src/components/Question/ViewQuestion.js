import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import AddAnswer from "../Answer/AddAnswer";
import CardAnswer from "../Answer/CardAnswer";

function ViewQuestion(props) {
  const dispatch = useDispatch();
  const loadQuestion = (question) => {
    dispatch({ type: "LOAD_QUESTION", payload: question });
  };
  useEffect(() => {
    loadQuestion(props.location.state.question);
  }, []);
  const question = useSelector((state) => state.viewQuestion.question);
  return (
    <React.Fragment key={question._id}>
      <div>
        <h1 className="card-title text-primary ng-binding">
          <FormattedMessage id="PregRes.question" />:
        </h1>
      </div>
      <div
        className="card border-primary h-100"
        style={{ marginBottom: "5px" }}
      >
        <div className="card-body d-flex flex-column align-items-start">
          <div className="col-xl-12 col-lg-4 mb-4">
            <p className="card-text" style={{ paddingTop: "10px" }}>
              {question && question.text}
            </p>
          </div>
        </div>
      </div>
      <div>
        <AddAnswer question={question} />
      </div>
      <div>
        {question &&
          question.answers &&
          question.answers
            .slice(0)
            .reverse()
            .map((answer) => (
              <div key={answer.id}>
                <CardAnswer answer={answer} />
              </div>
            ))}
      </div>
    </React.Fragment>
  );
}

export default ViewQuestion;
