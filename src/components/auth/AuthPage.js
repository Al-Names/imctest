import React, { Component } from "react";
import { Context, Consumer } from "../../context";
import { withRouter } from "react-router-dom";

class AuthPage extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  logIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email !== "jane@itsmycargo.test" && email !== "john@itsmycargo.test") {
      this.setState({
        errors: { email: "Please use one of the test users provided." }
      });
      return;
    }
    if (password !== "hellocargo") {
      this.setState({
        errors: { password: "Please use one of the test users provided." }
      });
      return;
    }
    await this.context.logIn(email, password);
    this.props.history.push(`/dashboard`);
  };
  render() {
    return (
      <Consumer>
        {({ value }) => (
          <div>
            <h1 className="text-center">Log In</h1>
            <hr />
            <div className="mx-auto">
              <form className="" onSubmit={this.logIn}>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg mr-sm-2 credential"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={this.state.errors.email}
                  />
                  <input
                    className="form-control form-control-lg mr-sm-2 credential"
                    type="password"
                    placeholder="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={this.state.errors.password}
                  />

                  <button className="btn btn-outline-success my-2 my-sm-0 btn-block">
                    Log In
                  </button>
                </div>
              </form>
            </div>
            <div>
              <h2>Test Cases</h2>
              <ul>
                <li>Email: jane@itsmycargo.test Password: hellocargo</li>
                <li>Email: john@itsmycargo.test Password: hellocargo</li>
              </ul>
            </div>
          </div>
        )}
      </Consumer>
    );
  }
}

export default withRouter(AuthPage);
