import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import emailjs from "emailjs-com";
import { FormattedMessage } from "react-intl";
import {
  answerAddedNotification,
  errorNotAddedNotification,
} from "../Notification/RenderNotifications";
import { useDispatch } from "react-redux";

function AddAnswer({ question }) {
  const [answer, setAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

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

  const updateAnswer = (questionID, answer) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answer),
    };
    fetch(
      `http://localhost:8080/questions/addanswer/${questionID}`,
      requestOptions
    ).then((response) => {
      return response.json().then((data) => addAnswer(data.answers));
    });
  };
  const addAnswer = (question) => {
    dispatch({ type: "ADD_ANSWER", payload: question });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.target.email.value = question.email;

    if (isChecked) return sendEmail(event);

    const data = {
      text: event.target.answer.value,
    };

    try {
      updateAnswer(question._id, data);
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
          {question && question.email && (
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
