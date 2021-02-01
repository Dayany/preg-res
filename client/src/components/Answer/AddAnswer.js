import React from "react";
import { Form, Button } from "react-bootstrap";

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { answer : null };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.formBasicPassword });
  }
  handleSubmit(event) {
    event.preventDefault();

    const data = {
      text: event.target.answer.value,
    };
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
    fetch(`http://localhost:8080/question/addanswer/${ event.target.questionId.value }`, requestOptions)
      .then(function (response) {
        return response.json();
      })
      .then(function (body) {
      });
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicQuestionID">
          <Form.Control
            style={{ display: "none" }}
            type="text"
            value={this.props.state} 
            name="questionId"
          />
        </Form.Group>
        <Form.Group controlId="formBasicAddAnswer">
          <Form.Label>Respuesta</Form.Label>
          <Form.Control type="text" placeholder="text" name="answer" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Respuesta privada?" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default AddAnswer;
