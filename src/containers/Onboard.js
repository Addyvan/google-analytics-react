import React from "react";
import { Redirect } from 'react-router-dom';

import OnboardStep0 from "../components/onboard/OnboardStep0";
import OnboardStep1 from "../components/onboard/OnboardStep1";
import OnboardStep2 from "../components/onboard/OnboardStep2";

import {
  Row,
  Col
} from "reactstrap";

import { addStory } from '../redux/actions/actions';
import { connect } from 'react-redux';

class Onboard extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0
    };

    this.continue = this.continue.bind(this);
    this.back = this.back.bind(this);
    this.submit = this.submit.bind(this);
    this.renderStep = this.renderStep.bind(this);
  }

  continue(currentStep) {
    this.props.addStory("CONTINUE", this.state.activeStep);
    this.setState({
      activeStep: currentStep + 1
    });
  }

  back(currentStep) {
    this.props.addStory("BACK", this.state.activeStep);
    this.setState({
      activeStep: currentStep - 1
    });
  }

  submit() {
    this.props.addStory("SUBMIT", this.state.activeStep);
    return(<Redirect to="/PageC" />);
  }

  renderStep() {
    switch(this.state.activeStep) {
      case 0:
        return <OnboardStep0 continueAction={this.continue} />;
      case 1:
        return <OnboardStep1 backAction={this.back} continueAction={this.continue} />;
      case 2:
        return <OnboardStep2 backAction={this.back} submitAction={this.submit} />;
      default: break;
    }
  }

  render() {
    return(
      <>
        <Row style={{marginBottom: "20px"}} className="text-center">
          <Col>
            <div className="float-center">
              <div aria-label="progress" className="step-indicator" style={{marginLeft: "175px"}}>
                <ul className="steps">
                  <li
                    key={`step-0`}
                    className={`${(this.state.activeStep === 0) ? 'active' : ''}`}
                  >
                    Introduction
                  </li>
                  <li
                    key={`step-1`}
                    className={`${(this.state.activeStep === 1) ? 'active' : ''}`}
                  >
                    Contact Info
                  </li>
                  <li
                    key={`step-2`}
                    className={`${(this.state.activeStep === 2) ? 'active' : ''}`}
                  >
                    Team
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        {this.renderStep()}
      </>
    );
  }
}

const mapStToProps = ({ name, phone, country }) => (
  { 
    name: name,
    phone: phone,
    country: country
  }
);

const mapDispToProps = dispatch => ({
  addStory: (story_type, step) => dispatch(addStory(story_type, step)),
});

export default connect(mapStToProps, mapDispToProps)(Onboard);