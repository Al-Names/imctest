import React, { Component } from "react";
import { Context, Consumer } from "../../context";
import Shipment from "./Shipment";
import "./styles.css";

class Dashboard extends Component {
  static contextType = Context;
  state = {
    showWeek: false,
    showMonth: false
  };

  componentDidMount = () => {
    this.context.getShipmentData();
  };

  showWeek = e => {
    this.setState({ showWeek: !this.state.showWeek });
  };

  showMonth = e => {
    this.setState({ showMonth: !this.state.showMonth });
  };

  render() {
    const { showWeek, showMonth } = this.state;
    return (
      <Consumer>
        {({ shipmentData, logOut }) => (
          <div>
            <div>
              <h1>Dashboard</h1>
            </div>
            <div>
              <div className="wrapper">
                <h3>Latest Shipments</h3>
                <div>
                  {shipmentData
                    .slice(0, 6)
                    .sort(
                      (a, b) =>
                        new Date(b.planned_etd) - new Date(a.planned_etd)
                    )
                    .map(shipment => (
                      <Shipment key={shipment.id} shipment={shipment} />
                    ))}
                </div>
              </div>
              <div className="wrapper">
                <h3>
                  Shipments in the last 7 days{" "}
                  <i
                    onClick={this.showWeek}
                    className="fas fa-sort-down"
                    style={{ cursor: "pointer" }}
                  />
                </h3>
                <hr />
                {showWeek ? (
                  <div>
                    {shipmentData
                      .filter(shipment => shipment.status === "confirmed")
                      .filter(
                        shipment =>
                          new Date(shipment.planned_etd) <
                          new Date("2019-04-09")
                      )
                      .sort(
                        (a, b) =>
                          new Date(b.planned_etd) - new Date(a.planned_etd)
                      )
                      .map(shipment => (
                        <Shipment key={shipment.id} shipment={shipment} />
                      ))}
                  </div>
                ) : null}
              </div>
              <div className="wrapper">
                <h3>
                  Shipments in the last Month
                  <i
                    onClick={this.showMonth}
                    className="fas fa-sort-down"
                    style={{ cursor: "pointer" }}
                  />
                </h3>
                <hr />
                {showMonth ? (
                  <div>
                    {shipmentData
                      .filter(shipment => shipment.status === "confirmed")
                      .filter(
                        shipment =>
                          new Date(shipment.planned_etd) <
                          new Date("2019-03-09")
                      )
                      .sort(
                        (a, b) =>
                          new Date(b.planned_etd) - new Date(a.planned_etd)
                      )
                      .map(shipment => (
                        <Shipment key={shipment.id} shipment={shipment} />
                      ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </Consumer>
    );
  }
}
export default Dashboard;
