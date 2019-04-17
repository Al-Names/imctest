import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "../../context";
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Consumer>
    {({ isAuth }) => (
      <Route
        render={props =>
          isAuth ? <Component {...props} /> : <Redirect to="/" />
        }
        {...rest}
      />
    )}
  </Consumer>
);
export default ProtectedRoute;
