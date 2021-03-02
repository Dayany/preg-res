import React from "react";

class CardAnswer extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div
          style={{ margin: "5px" }}
          className="card border-primary h-100"
          key={this.props.state.id}
        >
          <div className="card-body d-flex flex-column align-items-start">
            <h4 className="card-title text-primary ng-binding">
              <p className="card-text">{this.props.state.text}</p>
            </h4>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CardAnswer;
