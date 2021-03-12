import { useContext, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import fire from "./Base";
import firebase from 'firebase/app';
import { FormattedMessage } from "react-intl";
import { AuthContext } from "./Auth";
import Logout from "./Logout";

const LoginModal = () => {
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clearErrors = () => {
    setSignInError("");
    setSignUpError("");
  };

  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    fire.auth().signInWithPopup(provider);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        setSignInError(err.message);
      });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        setSignUpError(err.message);
      });
  };
  const toggleHasAccount = () => {
    setHasAccount(!hasAccount);
  };

  if (currentUser) {
    return <Logout />;
  }

  return (
    <>
      <FormattedMessage id="PregRes.helloGuest" />{" "}
      <a href="#" onClick={handleShow}>
        <FormattedMessage id="PregRes.signIn" />!
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>
              {!hasAccount ? (
                <FormattedMessage id="PregRes.signIn" />
              ) : (
                <FormattedMessage id="PregRes.signUp" />
              )}
            </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmailLogin">
              <Form.Label>
                <FormattedMessage id="PregRes.emailAddress" />:
              </Form.Label>
              <FormattedMessage id="PregRes.emailAddress">
                {(placeholder) => (
                  <Form.Control
                    type="email"
                    placeholder={placeholder}
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                )}
              </FormattedMessage>
            </Form.Group>
            <Form.Group controlId="formPasswordLogin">
              <Form.Label>
                <FormattedMessage id="PregRes.password" />:
              </Form.Label>
              <FormattedMessage id="PregRes.password">
                {(placeholder) => (
                  <Form.Control
                    type="password"
                    placeholder={placeholder}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                )}
              </FormattedMessage>
            </Form.Group>
            {!hasAccount ? (
              <p>
                {signInError}
                <br />
                <FormattedMessage id="PregRes.doesNotHaveAccount" />
                <span>
                  {" "}
                  <a href="#" onClick={toggleHasAccount}>
                    <FormattedMessage id="PregRes.signUp" />
                  </a>
                </span>
              </p>
            ) : (
              <p>
                {signUpError}
                <br />
                <FormattedMessage id="PregRes.hasAccount" />
                <span>
                  {" "}
                  <a href="#" onClick={toggleHasAccount}>
                    <FormattedMessage id="PregRes.signIn" />
                  </a>
                </span>
              </p>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!hasAccount ? (
            <Button
              onClick={handleLogin}
              className="btn btn-primary border-white mt-auto"
              variant="primary"
            >
              <FormattedMessage id="PregRes.signIn" />
            </Button>
          ) : (
            <Button
              onClick={handleSignUp}
              className="btn btn-primary border-white mt-auto"
              variant="primary"
            >
              <FormattedMessage id="PregRes.signUp" />
            </Button>
          )}
            <Button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
