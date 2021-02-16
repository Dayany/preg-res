import "bootstrap/dist/css/bootstrap.min.css";
import "./custom_theme.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ViewQuestion from "./components/Question/ViewQuestion.js";
import Main from "./components/Main/Main.js";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <section class="jumbotron text-center">
        <Container>
          <Router>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/question" component={ViewQuestion} />
            </Switch>
          </Router>
        </Container>
      </section>
    </React.Fragment>
  );
}

export default App;
