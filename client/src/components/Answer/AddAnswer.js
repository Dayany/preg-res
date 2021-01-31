import React from "react";
import { Form, Button } from "react-bootstrap";

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicQuestionID">
          <Form.Control
            style={{ display: "none" }}
            type="text"
            value={this.props.state}
          />
        </Form.Group>
        <Form.Group controlId="formBasicAddAnswer">
          <Form.Label>Respuesta</Form.Label>
          <Form.Control type="text" placeholder="text" />
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
