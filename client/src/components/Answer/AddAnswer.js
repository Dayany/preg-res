import React from "react";
import { Form, Button, Row } from "react-bootstrap";
import emailjs from "emailjs-com";
import { FormattedMessage } from "react-intl";

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { answer: null, isChecked: false };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAIL_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.email.value = this.props.state.email;

    if (this.state.isChecked) return this.sendEmail(event);

    const data = {
      text: event.target.answer.value,
    };
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(
      process.env.REACT_APP_DB_URL +
        `/question/addanswer/${event.target.questionId.value}`,
      requestOptions
    ).then((response) => {
      return response
        .json()
        .then((data) => (this.props.updateAnswerChild(data.answers), {}));
    });
  }
  toggleCheckbox() {
    return this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    return (
      <Row>
        <div className="col-md-12">
          <Form
            style={{ padding: "15px" }}
            className="card bg-primary text-white "
            onSubmit={this.handleSubmit}
          >
            <Form.Group controlId="formBasicQuestionID">
              <Form.Control
                style={{ display: "none" }}
                type="text"
                defaultValue={this.props.state.id}
                name="questionId"
              />
              <Form.Control
                style={{ display: "none" }}
                type="text"
                defaultValue=""
                name="email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicAddAnswer">
              <Form.Label>
                <FormattedMessage id="PregRes.answer" />
              </Form.Label>
              <FormattedMessage id="PregRes.writeAnswerHere">
                {(placeholder) => (
                  <Form.Control
                    as="textarea"
                    placeholder={placeholder}
                    name="answer"
                  />
                )}
              </FormattedMessage>
            </Form.Group>
            {this.props.state.email ? (
              <Form.Group controlId="formBasicCheckbox">
                <FormattedMessage id="PregRes.privateAnswer">
                  {(label) => (
                    <Form.Check
                      type="checkbox"
                      name="sendEmail"
                      label={label}
                      defaultChecked={this.state.isChecked}
                      onChange={this.toggleCheckbox}
                    />
                  )}
                </FormattedMessage>
              </Form.Group>
            ) : null}
            <center>
              <Button
                className="btn btn-primary border-white mt-auto"
                variant="primary"
                type="submit"
              >
                <FormattedMessage id="PregRes.answer" />
              </Button>
            </center>
          </Form>
        </div>
      </Row>
    );
  }
}

export default AddAnswer;
