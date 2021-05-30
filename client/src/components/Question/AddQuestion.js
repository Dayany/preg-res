import React, { useContext, useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { AuthContext } from "../Auth/Auth";
import {
  errorNotAddedNotification,
  questionAddedNotification,
} from "../Notification/RenderNotifications";
import { useDispatch } from "react-redux";

function AddQuestion({ categoriesList }) {
  const dispatch = useDispatch();

  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(0);
  const [question, setQuestion] = useState("");
  const getTodaysDate = () => {
    let today = new Date();

    return (
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1 < 10 ? "0" : "") +
      (today.getMonth() + 1) +
      "-" +
      today.getDate()
    );
  };
  const addQuestion = (question) => {
    dispatch({ type: "ADD_QUESTION", payload: question });
  };
  const createQuestion = (question) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    };
    fetch("http://localhost:8080/questions/add", requestOptions).then(
      (response) => {
        return response.json().then((data) => addQuestion(data));
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = currentUser ? currentUser.uid : null;

    const data = {
      text: event.target.question.value,
      email: event.target.email.value,
      category: parseInt(event.target.category.options.selectedIndex),
      date: getTodaysDate(),
      answers: [],
      userId,
    };

    try {
      createQuestion(data);
      questionAddedNotification();
    } catch (error) {
      errorNotAddedNotification();
    }
  };

  return (
    <Row>
      <div className="col-md-12">
        <Form
          style={{ padding: "15px" }}
          className="card bg-primary text-white "
          onSubmit={handleSubmit}
        >
          {currentUser ? (
            <Form.Group controlId="formBasicEmail" style={{ display: "none" }}>
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
                    value={email}
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
                    value={email ? email : undefined}
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
              value={category ? category : undefined}
              as="select"
            >
              {categoriesList.map((category, key) => (
                <option key={key}>{category}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicQuestion">
            <Form.Label>
              <FormattedMessage id="PregRes.question" />:
            </Form.Label>
            <FormattedMessage id="PregRes.writeYourQuestionHere">
              {(placeholder) => (
                <Form.Control
                  type="text"
                  placeholder={placeholder}
                  name="question"
                  value={question ? question : undefined}
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

export default AddQuestion;
