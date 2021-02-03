import React from "react";
import { Form, Button, Row } from "react-bootstrap";

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { answer: null };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      text: event.target.answer.value,
    };
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(
      `http://localhost:8080/question/addanswer/${event.target.questionId.value}`,
      requestOptions
    )
      .then(function (response) {
        return response.json().then((data) => ({
          data: data,
        }));
      })
      .then(function (body) {});

    this.props.updateAnswerChild({ _id: "Newid", text: data.text });
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicQuestionID">
          <Form.Control
            style={{ display: "none" }}
            type="text"
            defaultValue={this.props.state}
            name="questionId"
          />
        </Form.Group>
        <Form.Row>
          <Form.Group controlId="formBasicAddAnswer">
            <Form.Label>Respuesta</Form.Label>
            <Form.Control type="text" placeholder="text" name="answer" />
          </Form.Group>
        </Form.Row>
        <Row>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Respuesta privada?" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Row>
      </Form>
    );
  }
}

export default AddAnswer;
