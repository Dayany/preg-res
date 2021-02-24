import React from "react";
import { Form, Button, Row } from "react-bootstrap";

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      question: null,
      category: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.formBasicCategory });
  }
  handleSubmit(event) {
    event.preventDefault();

    const data = {
      text: event.target.question.value,
      email: event.target.email.value,
      category: parseInt(event.target.category.options.selectedIndex),
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(process.env.REACT_APP_DB_URL + "/question/add", requestOptions).then(
      (response) => {
        return response
          .json()
          .then((data) => (this.props.setQuestionsChild(data), {}));
      }
    );
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
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Direccion Email (Opcional):</Form.Label>
              <Form.Control
                type="email"
                placeholder="Permite respuestas privadas."
                name="email"
                value={this.state.email ? this.state.email : undefined}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCategory">
              <Form.Label>Categoria:</Form.Label>
              <Form.Control
                name="category"
                value={this.state.category ? this.state.category : undefined}
                as="select"
              >
                {this.props.categoriesList.map((category, key) => (
                  <option key="{key}">{category}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicQuestion">
              <Form.Label>Pedido:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Describe tu pedido aca"
                name="question"
                value={this.state.question ? this.state.question : undefined}
              />
            </Form.Group>
            <center>
              <Button
                className="btn btn-primary border-white mt-auto"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </center>
          </Form>
        </div>
      </Row>
    );
  }
}

export default AddQuestion;
