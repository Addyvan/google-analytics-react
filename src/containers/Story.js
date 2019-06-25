import React from "react";

import { resetState } from "../redux/actions/actions";
import { connect } from 'react-redux';

import { Row, Col, Table, Button } from "reactstrap";

class PageC extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      story: null
    };
  }

  render() {
    console.log("ACTIONS LOG");
    console.log(this.props.story);
    return(
      <div>
        <Row>
          <Col>
            <Button onClick={()=>this.props.resetState()}>Reset State</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>TIME</th>
                  <th>ACTION</th>
                  <th>STEP</th>
                  <th>NAME</th>
                  <th>COUNTRY</th>
                  <th>PHONE</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.story.map((event) => {
                    return(
                      <tr key={event.time}>
                        <td>{event.time}</td>
                        <td>{event.action.type}</td>
                        <td>{event.action.step}</td>
                        <td>{event.stateSnapshot.name}</td>
                        <td>{event.stateSnapshot.country}</td>
                        <td>{event.stateSnapshot.phone}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStToProps = (state) => (
  { 
    story: state.onboarding.story
  }
);

const mapDispToProps = dispatch => ({
  resetState: () => dispatch(resetState()),
});

export default connect(mapStToProps, mapDispToProps)(PageC);
