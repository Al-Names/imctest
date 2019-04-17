import React, { Component } from "react";
import axios from "axios";
export const Context = React.createContext();

export class Provider extends Component {
  state = {
    access_token: "",
    shipmentData: [],
    isAuth: false
  };

  logIn = async (email, password) => {
    const { data } = await axios.post(
      "https://imc-fe-challenge.herokuapp.com/oauth/token",
      {
        grant_type: "password",
        email: `${email}`,
        password: `${password}`
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    this.setState({
      access_token: data.access_token
    });
    localStorage.setItem("data", data);
    this.setState({ isAuth: true });
  };

  logOut = () => {
    this.setState({ isAuth: false });
  };
  getShipmentData = () => {
    console.log(this.state.access_token);
    const AuthStr = `Bearer ${this.state.access_token}`;
    axios
      .get(`https://imc-fe-challenge.herokuapp.com/shipments`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: AuthStr
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          shipmentData: res.data
        });
      });
  };

  render() {
    return (
      <Context.Provider
        value={{
          isAuth: this.state.isAuth,
          access_token: this.state.access_token,
          shipmentData: this.state.shipmentData,
          logIn: this.logIn,
          logOut: this.logOut,
          getShipmentData: this.getShipmentData
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
