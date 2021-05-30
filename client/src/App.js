import "bootstrap/dist/css/bootstrap.min.css";
import "./custom_theme.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ViewQuestion from "./components/Question/ViewQuestion.js";
import Main from "./components/Main/Main.js";
import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import localeData from "./locales/languages.json";
import Header from "./components/Header/Header";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AuthProvider } from "./components/Auth/Auth";
import Notification from "./components/Notification/Notification";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  //Make default language English, unless otherwise specified by the user.
  const [locale, setLocale] = useState("en");

  // Split locales with a region code
  const languageWithoutRegionCode = locale.toLowerCase().split(/[_-]+/)[0];

  // Try full locale, try locale without region code, fallback to 'en'
  const messages =
    localeData[languageWithoutRegionCode] ||
    localeData[locale] ||
    localeData.en;

  return (
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages}>
        <AuthProvider>
          <React.Fragment>
            <Header setLocaleChild={setLocale} />
            <Notification />
            <section
              style={{ paddingTop: "10px !important" }}
              className="jumbotron text-center"
            >
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
        </AuthProvider>
      </IntlProvider>
    </Provider>
  );
}

export default App;
