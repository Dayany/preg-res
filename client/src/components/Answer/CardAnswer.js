import React from "react";

class CardAnswer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div
            style={{ margin: "5px" }}
            class="card border-primary h-100"
            key={this.props.state._id}
          >
            <div class="card-body d-flex flex-column align-items-start">
              <h4 class="card-title text-primary ng-binding">
                <p class="card-text">{this.props.state.text}</p>
              </h4>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CardAnswer;
