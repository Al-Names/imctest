import React, { Component } from "react";
import { Context, Consumer } from "../../context";
import PropTypes from "prop-types";
import "./styles.css";

class Shipment extends Component {
  render() {
    const {
      id,
      reference,
      origin,
      planned_etd,
      planned_eta,
      destination,
      status
    } = this.props.shipment;
    return (
      <Consumer>
        {({ value }) => (
          <div>
            <div key={id} className="anaId col-md-6 thumbnail">
              <h2>{reference}</h2>
              <h4>Origin: {origin}</h4>
              <h4>Destination: {destination}</h4>
              <p className="lead">
                Status: <span className={`shipment-${status}`}>{status}</span>
              </p>
              <p className="lead">etd: {planned_etd}</p>
              <p className="lead">eta: {planned_eta}</p>
              <hr />
            </div>
          </div>
        )}
      </Consumer>
    );
  }
}
Shipment.propTypes = {
  shipment: PropTypes.object.isRequired
};
export default Shipment;
