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
      process.env.REACT_APP_DB_URL + `/question/addanswer/${event.target.questionId.value}`,
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
      <Row>
        <div class="col-md-12">
          <Form
            style={{ padding: "15px" }}
            className="card bg-primary text-white "
            onSubmit={this.handleSubmit}
          >
            <Form.Group controlId="formBasicQuestionID">
              <Form.Control
                style={{ display: "none" }}
                type="text"
                defaultValue={this.props.state}
                name="questionId"
              />
            </Form.Group>
            <Form.Group controlId="formBasicAddAnswer">
              <Form.Label>Respuesta</Form.Label>
              <Form.Control as="textarea" placeholder="Escriba su respuesta aca" name="answer" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Respuesta privada?" />
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

export default AddAnswer;
