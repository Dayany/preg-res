import React from "react";
import AddAnswer from "../Answer/AddAnswer";
import { loadState, saveState } from "../../localStorage";
import CardAnswer from "../Answer/CardAnswer";

//View for a single question.
//Display answers if any
class ViewQuestion extends React.Component {
  constructor(props) {
    super(props);

    // if (loadState()) {
    //   this.state = loadState();
    // } else {
    this.state = {
      answers: this.props.location.state.question.answers,
    };
    this.updateAnswers = this.updateAnswers.bind(this);
  }
  updateAnswers = (answer) => {
    this.setState({ answers: answer });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h1 className="card-title text-primary ng-binding">Pedido:</h1>
        </div>
        <div className="card border-primary h-100" style={{marginBottom: "5px"}}>
          <div className="card-body d-flex flex-column align-items-start">
            <div className="col-xl-12 col-lg-4 mb-4">
              <p className="card-text" style={{ paddingTop: "10px" }}>
                {this.props.location.state.question.text}
              </p>
            </div>
          </div>
        </div>
        <div>
          <AddAnswer
            updateAnswerChild={this.updateAnswers}
            state={this.props.location.state.question}
          />
        </div>
        <div>
          {this.state.answers
            .slice(0)
            .reverse()
            .map((answer) => (
              <div key={answer._id}>
                <CardAnswer state={answer} />
              </div>
            ))}
        </div>
      </React.Fragment>
    );
  }
}

export default ViewQuestion;
