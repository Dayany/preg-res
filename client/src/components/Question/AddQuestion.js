import React from "react";
import { Form, Button } from "react-bootstrap";

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Direccion Email (Opcional)</Form.Label>
          <Form.Control
            type="email"
            placeholder="Permite respuestas privadas."
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Pregunta</Form.Label>
          <Form.Control type="text" placeholder="Pregunta" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default AddQuestion;
