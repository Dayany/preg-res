import React from "react";

function CardAnswer({ answer }) {
  return (
    <React.Fragment key={answer._id}>
      <div
        style={{ margin: "5px" }}
        className="card border-primary h-100"
        key={answer._id}
      >
        <div className="card-body d-flex flex-column align-items-start">
          <h4 className="card-title text-primary ng-binding">
            <p className="card-text">{answer.text}</p>
          </h4>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CardAnswer;
