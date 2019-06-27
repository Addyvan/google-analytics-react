import React from "react";

import {
  Row,
  Col
} from "reactstrap";

import apple from "../../assets/apple.jpg"

class Apple extends React.Component {
  render() {
    return(
      <div>
        <Row>
          <Col md="12">
            <h1 className="text-center">An apple</h1>
            <img src={apple} alt="apple" />
          </Col>
        </Row>
        Apple
      </div>
    );
  }
}

export default Apple;