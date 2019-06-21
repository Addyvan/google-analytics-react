import React from "react";

import {connect} from"react-redux";

import {
  Row,
  Col,
  Button
} from "reactstrap";

class PageA extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pageview_total: props.pageview_total
    };
  }

  render() {
    return(
      <>
        <Row>
          <Col md="12">
            Pageviews: {this.state.pageview_total}
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Button onClick={() => {console.log("clicked!!!!!");}}>Click me</Button>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStToProps = state => {
  return({ pageview_total: state.analytics.pageview_total})
};

export default connect(mapStToProps)(PageA);