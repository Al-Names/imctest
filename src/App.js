import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import { Provider } from "./context";

import Header from "../src/components/layout/Header";

import AuthPage from "../src/components/auth/AuthPage";
import Dashboard from "../src/components/dashboard";
import ProtectedRoute from "../src/components/protectedRoute/ProtectedRoute";
class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <Fragment>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={AuthPage} />
                <ProtectedRoute path="/dashboard" component={Dashboard} />
                {/* <Route component={PageNotFound} /> */}
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
