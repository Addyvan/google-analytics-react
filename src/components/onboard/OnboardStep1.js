import React from "react";

import PropTypes from "prop-types";

import {
  Row,
  Col,
  Button,
  Input,
  Label
} from "reactstrap";

import { editName, editPhone, editCountry } from '../../redux/actions/actions';
import { connect } from 'react-redux';

class OnboardStep1 extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      name: (props.name) ? props.name: null,
      country: (props.country) ? props.country: null,
      phone: (props.phone) ? props.phone: null
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(e, field) {
    let stateChange = {}
    stateChange[field] = e.target.value;

    switch(field) {
      case "name": this.props.editName(e.target.value); break;
      case "phone": this.props.editPhone(e.target.value); break;
      case "country": this.props.editCountry(e.target.value); break;
      default: break;
    }

    this.setState(stateChange);
  }

  render() {
    return(
      <>
        <Row>
          <Col>
            <h3>Contact Info</h3>
            <Label htmlFor="nameTest">
              <span className="font-weight-bold">Full Name</span>
              <Input
                required
                type="text"
                id="nameTest"
                className="form-control"
                value={this.state.name || ''}
                onChange={(e) => {this.onChange(e, "name")}}
              />
            </Label>
            <Label htmlFor="phoneTest">
              <span className="font-weight-bold">Phone Number</span>
              <Input
                required
                type="text"
                id="nameTest"
                className="form-control"
                value={this.state.phone || ''}
                onChange={(e) => {this.onChange(e, "phone")}}
              />
            </Label>
            <Label htmlFor="countryTest">
              <span className="font-weight-bold">Country</span>
              <Input
                required
                type="text"
                id="nameTest"
                className="form-control"
                value={this.state.country || ''}
                onChange={(e) => {this.onChange(e, "country")}}
              />
            </Label>
          </Col>
        </Row>
        <Row>
          <Col md="9" />
          <Col md="3">
            <div className="float-right">
              <Button onClick={() => this.props.backAction(1)}>Back</Button>
              <Button onClick={() => this.props.continueAction(1)}>Continue</Button>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

OnboardStep1.propTypes = {
  continueAction: PropTypes.func,
  backAction: PropTypes.func
}

const mapStToProps = (state) => (
  { 
    name: state.onboarding.name,
    phone: state.onboarding.phone,
    country: state.onboarding.country
  }
);

const mapDispToProps = dispatch => ({
  editName: name => dispatch(editName(name)),
  editPhone: phone => dispatch(editPhone(phone)),
  editCountry: country => dispatch(editCountry(country)),
});

export default connect(mapStToProps, mapDispToProps)(OnboardStep1);