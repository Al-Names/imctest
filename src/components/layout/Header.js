import React, { Component } from "react";
import { Context, Consumer } from "../../context";

class Header extends Component {
  static contextType = Context;
  render() {
    return (
      <Consumer>
        {({ isAuth, logOut }) => (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
              ItsMyCargo
            </a>

            {isAuth ? (
              <ul style={{ float: "right" }}>
                <button className="btn btn-outline-success" onClick={logOut}>
                  logout
                </button>
              </ul>
            ) : null}
          </nav>
        )}
      </Consumer>
    );
  }
}
export default Header;
