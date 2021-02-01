import React from "react";
import { Form, Button } from "react-bootstrap";

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.formBasicPassword });
  }
  handleSubmit(event) {
    event.preventDefault();

    const data = {
      text: event.target.question.value,
      email: event.target.email.value,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
    fetch("http://localhost:8080/question/add", requestOptions)
      .then(function (response) {
        return response.json();
      })
      .then(function (body) {
        console.log(body);
      });
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Direccion Email (Opcional)</Form.Label>
          <Form.Control
            type="email"
            placeholder="Permite respuestas privadas."
            name="email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicQuestion">
          <Form.Label>Pregunta</Form.Label>
          <Form.Control type="text" placeholder="Pregunta" name="question" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default AddQuestion;
