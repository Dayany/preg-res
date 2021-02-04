import React from "react";
import { Redirect } from "react-router-dom";
import AddAnswer from "../Answer/AddAnswer";

//View for a single question.
//Display answers if any
class ViewQuestion extends React.Component {
  constructor(props) {
    super(props);

    // if (!this.props.location.state) {
    //   this.setState({ redirect: true });
    // } else {
    this.state = {
      answers: this.props.location.state.question.answers,
    };
    // }
    this.updateAnswers = this.updateAnswers;
  }
  updateAnswers = (answer) => {
    const newAnswers = this.state.answers.concat(answer);
    this.setState({ answers: newAnswers });
  };

  render() {
    return (
      <React.Fragment>
        {/* {this.props.location.state.redirect ?  <Redirect to="/" /> : null} */}
        <div>
          <h3 key={this.props.location.state.question.id}>
            <h1 class="card-title text-primary ng-binding">Pedido:</h1>
            <div class="card border-primary h-100">
              <div class="card-body d-flex flex-column align-items-start">
                <div class="col-xl-12 col-lg-4 mb-4">
                  <p class="card-text" style={{ paddingTop: "10px" }}>
                    {this.props.location.state.question.text}
                  </p>
                </div>
              </div>
            </div>
          </h3>
          <AddAnswer
            updateAnswerChild={this.updateAnswers}
            state={this.props.location.state.question._id}
          />

          <div>
            {this.state.answers.map((answer) => (
              <div style={{ margin: "5px" }} class="card border-primary h-100">
                <div class="card-body d-flex flex-column align-items-start">
                  <h4
                    class="card-title text-primary ng-binding"
                    key={answer._id}
                  >
                    <p class="card-text">{answer.text}</p>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewQuestion;
