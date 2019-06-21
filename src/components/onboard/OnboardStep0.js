import React from "react";

import PropTypes from "prop-types";

import {
  Row,
  Col,
  Button
} from "reactstrap";

class OnboardStep0 extends React.Component {
  render() {
    return(
      <>
        <Row>
          <Col md="9" />
          <Col md="3">
            <div className="float-right">
              <Button onClick={() => this.props.continueAction(0) }>Continue</Button>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

OnboardStep0.propTypes = {
  continueAction: PropTypes.func
}

export default OnboardStep0;