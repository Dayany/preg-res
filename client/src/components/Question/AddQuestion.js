import React from "react";
import { Form, Button, Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { AuthContext } from "../Auth/Auth";
import firebase from "firebase/app";

class AddQuestion extends React.Component {
  static contextType = AuthContext;
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
  async handleSubmit(event) {
    event.preventDefault();
    const userId = this.context.currentUser
      ? this.context.currentUser.uid
      : null;

    const data = {
      text: event.target.question.value,
      email: event.target.email.value,
      category: parseInt(event.target.category.options.selectedIndex),
      date: firebase.firestore.FieldValue.serverTimestamp(),
      answers: [],
      userId,
    };

    await this.props.questionsRef.add(data);
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
            {this.context.currentUser ? (
              <Form.Group
                controlId="formBasicEmail"
                style={{ display: "none" }}
              >
                <Form.Label>
                  <FormattedMessage id="PregRes.emailAddressOptional" />:
                </Form.Label>
                <FormattedMessage id="PregRes.permitsPrivateAnswer">
                  {(placeholder) => (
                    <Form.Control
                      type="email"
                      placeholder={placeholder}
                      name="email"
                      readOnly
                      value={this.context.currentUser.email}
                    />
                  )}
                </FormattedMessage>
              </Form.Group>
            ) : (
              <Form.Group controlId="formBasicEmail">
                <Form.Label>
                  <FormattedMessage id="PregRes.emailAddressOptional" />:
                </Form.Label>
                <FormattedMessage id="PregRes.permitsPrivateAnswer">
                  {(placeholder) => (
                    <Form.Control
                      type="email"
                      placeholder={placeholder}
                      name="email"
                      value={this.state.email ? this.state.email : undefined}
                    />
                  )}
                </FormattedMessage>
              </Form.Group>
            )}
            <Form.Group controlId="formBasicCategory">
              <Form.Label>
                <FormattedMessage id="PregRes.category" />:
              </Form.Label>
              <Form.Control
                name="category"
                value={this.state.category ? this.state.category : undefined}
                as="select"
              >
                {this.props.categoriesList.map((category, key) => (
                  <option key={key}>{category}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicQuestion">
              <Form.Label>
                <FormattedMessage id="PregRes.question" />:
              </Form.Label>
              <FormattedMessage id="PregRes.permitsPrivateAnswer">
                {(placeholder) => (
                  <Form.Control
                    type="text"
                    placeholder={placeholder}
                    name="question"
                    value={
                      this.state.question ? this.state.question : undefined
                    }
                  />
                )}
              </FormattedMessage>
            </Form.Group>
            <center>
              <Button
                className="btn btn-primary border-white mt-auto"
                variant="primary"
                type="submit"
              >
                <FormattedMessage id="PregRes.submit" />
              </Button>
            </center>
          </Form>
        </div>
      </Row>
    );
  }
}

export default AddQuestion;
