import React from "react";

import {
  Row,
  Col
} from "reactstrap";

import orange from "../../assets/orange.jpg"

class Orange extends React.Component {
  render() {
    return(
      <div>
        <Row>
          <Col md="6">
            <img src={orange} alt="apple"/>
          </Col>
          <Col md="6">
            <p>
              A fun loving fruit with a great taste for adventure.
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Orange;