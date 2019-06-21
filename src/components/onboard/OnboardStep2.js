import React from "react";

import PropTypes from "prop-types";

import {
  Row,
  Col,
  Button
} from "reactstrap";

class OnboardStep2 extends React.Component {
  render() {
    return(
      <>
        <Row>
          <Col md="9" />
          <Col md="3">
            <div className="float-right">
              <Button onClick={() => this.props.backAction(2)}>Back</Button>
              <Button onClick={() => this.props.submitAction()}>Submit</Button>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

OnboardStep2.propTypes = {
  submitAction: PropTypes.func,
  backAction: PropTypes.func
}

export default OnboardStep2;