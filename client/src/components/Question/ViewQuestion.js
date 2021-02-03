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
    this.setState({ answers: newAnswers}); 
  };

  render() {
    return (
      <React.Fragment>
        {/* {this.props.location.state.redirect ?  <Redirect to="/" /> : null} */}
        <div>
          <h3 key={this.props.location.state.question.id}>
            <p>{this.props.location.state.question.text}</p>
          </h3>
          <AddAnswer
            updateAnswerChild={this.updateAnswers}
            state={this.props.location.state.question._id}
          />

          <div>
            {this.state.answers.map((answer) => (
              <h3 key={answer._id}>
                <p>{answer.text}</p>
              </h3>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewQuestion;
