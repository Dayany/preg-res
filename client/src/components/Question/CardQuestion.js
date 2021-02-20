import React from "react";
import { Link } from "react-router-dom";

class CardQuestion extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div
          style={{ margin: "5px" }}
          className="card border-primary h-100"
          key={this.props.state._id}
        >
          <div
            className="card-body d-flex flex-column align-items-start"
            key={this.props.state._id}
          >
            <h4
              className="card-title text-primary ng-binding"
              key={this.props.state._id}
            >
              <Link
                key={this.props.state._id}
                to={{
                  pathname: `/question`,
                  state: { question: this.props.state },
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
