import React from "react";

import {
  Row,
  Col
} from "reactstrap";

class PageA extends React.Component {

  render() {
    return(
      <>
        <Row>
          <Col md="2" />
          <Col md="8">
            <h4>Analytics Prototype: Proof of concept</h4>
            <p>
              This page serves as a testbed for frontend analytics tracking functions.
            </p>
            <p>
              It uses a redux store as well as google analytics to track user search events and document user stories through a fake version 
              of the directory onboarding process.
            </p>
            <p>
              The application also utilizes dev.account.gccollab in order to prototype linking a user's salt to analytics data. 
            </p>
          </Col>
        </Row>
        <Row>
          <Col md="2" />
          <Col md="8">
            <h4> Motivation </h4>
            <ul>
              <li>Avoid double counting users who utilize multiple devices or browsers.</li>
              <li>Proactively gain insight on how users are using crucial features like onboarding and registration.</li>
              <li>Track search queries and their results to identify user trends while also proactively monitoring the quality of our search engines.</li>
              <li>Identify user usage patterns across time and microservices in order to better prioritize efforts.</li>
              <li>Improve the accuracy of our analytics data by explicitely calling upon events.</li>
            </ul>
          </Col>
        </Row>
      </>
    );
  }
}


export default PageA;