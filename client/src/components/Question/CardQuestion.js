import React from "react";
import { Link } from "react-router-dom";

class CardQuestion extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{ margin: "5px" }}
          className="card border-primary h-100"
          key={this.props.state.id}
        >
          <div
            className="card-body d-flex flex-column align-items-start"
            key={this.props.state.id}
          >
            <h4
              className="card-title text-primary ng-binding"
              key={this.props.state.id}
            >
              <Link
                key={this.props.state.id}
                to={{
                  pathname: `/question`,
                  state: {
                    questionId: this.props.state.id,
                    firestore: this.props.firestore,
                  },
                }}
              >
                {this.props.state.text}
              </Link>
            </h4>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CardQuestion;
