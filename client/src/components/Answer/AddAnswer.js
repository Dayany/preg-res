import React from "react";
import { Form, Button, Row } from "react-bootstrap";
import emailjs from "emailjs-com";
import { FormattedMessage } from "react-intl";
import firebase from "firebase/app";
import {
  answerAddedNotification,
  errorNotAddedNotification,
} from "../Notification/RenderNotifications";

const { useState } = require("react");
function AddAnswer(props) {
  const [answer, setAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const sendEmail = (e) => {
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.target.email.value = props.state.email;

    if (isChecked) return sendEmail(event);

    const data = {
      text: event.target.answer.value,
      date: firebase.firestore.Timestamp.now(),
    };

    try {
      await props.questionRef.update({
        answers: firebase.firestore.FieldValue.arrayUnion(data),
      });
      answerAddedNotification();
    } catch (error) {
      errorNotAddedNotification();
    }
    setAnswer("");
  };

  return (
    <Row>
      <div className="col-md-12">
        <Form
          style={{ padding: "15px" }}
          className="card bg-primary text-white "
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="formBasicQuestionEmail">
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
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              )}
            </FormattedMessage>
          </Form.Group>
          {props.state && props.state.email && (
            <Form.Group controlId="formBasicCheckbox">
              <FormattedMessage id="PregRes.privateAnswer">
                {(label) => (
                  <Form.Check
                    type="checkbox"
                    name="sendEmail"
                    label={label}
                    defaultChecked={isChecked}
                    onChange={(e) => setIsChecked(!isChecked)}
                  />
                )}
              </FormattedMessage>
            </Form.Group>
          )}
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

export default AddAnswer;
