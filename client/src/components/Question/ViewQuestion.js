import React from "react";
import { FormattedMessage } from "react-intl";
import AddAnswer from "../Answer/AddAnswer";
import CardAnswer from "../Answer/CardAnswer";

import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";

function ViewQuestion(props) {
  const firestore = firebase.firestore();

  const questionsRef = firestore.collection("questions");
  const query = questionsRef.doc(props.location.state.questionId);
  const [question] = useDocumentData(query, { idField: "id" });

  return (
    <React.Fragment>
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
              {question && question.text && question.text}
            </p>
          </div>
        </div>
      </div>
      <div>
        <AddAnswer state={question} questionRef={query} />
      </div>
      <div>
        {question &&
          question.answers &&
          question.answers.reverse().map((answer) => (
            <div key={answer.id}>
              <CardAnswer state={answer} />
            </div>
          ))}
      </div>
    </React.Fragment>
  );
}

export default ViewQuestion;
