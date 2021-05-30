import React from "react";
import { Link } from "react-router-dom";

function CardQuestion({ question }) {
  return (
    <React.Fragment>
      <Link
        key={question.id}
        to={{
          pathname: `/question`,
          state: {
            question: question,
          },
        }}
      >
        <div style={{ margin: "5px" }} className="card border-primary h-100">
          <div className="card-body d-flex flex-column align-items-start">
            <h4 className="card-title text-primary ng-binding">
              {question.text}
            </h4>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
}

export default CardQuestion;
