import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ViewQuestion from "./components/Question/ViewQuestion.js";
import Main from "./components/Main/Main.js";

function App() {
  return (
    <Router>
      <Container>
        <Row>
          <h1>Pregunta</h1>
        </Row>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/question" component={ViewQuestion} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
