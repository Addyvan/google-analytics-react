import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';

import oidcConfig from "../oidcConfig.dev";

import { loginAction, logoutAction, clearErrorAction } from '../redux/store';
import { connect } from 'react-redux';
import Login from '@gctools-components/gc-login';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { name: false };
  }

  render() {
    const {
      onLogin,
      onLogout,
    } = this.props;

    const doLogin = (user) => {
      this.setState({ name: user.profile.name });
      onLogin(user);
    };

    const doLogout = () => {
      this.setState({ name: false });
      onLogout();
    };
    return(
      <Row style={{marginTop: "15px", marginBottom: "15px"}}>
        <Col>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Google Analytics demo</NavbarBrand>
            <NavbarToggler/>
            
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/PageA">Page A</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/PageB">Page B</NavLink>
                </NavItem>
                <NavItem style={{marginRight: "10px"}}>
                  <NavLink href="/PageC">Page C</NavLink>
                </NavItem>
                <NavItem>
                  <Login
                    oidcConfig={oidcConfig}
                    onUserLoaded={doLogin}
                    onUserFetched={doLogin}
                    onLogoutClick={(e, oidc) => {
                      oidc.logout();
                      doLogout();
                    }}
                  >
                    {({ onClick }) => (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClick(e);
                        }}
                      > 
                        {
                          (this.state.name) ?
                          this.state.name :
                            "Login"
                        }
                      </Button>
                    )}
                  </Login>
                </NavItem>
              </Nav>

          </Navbar>
        </Col>
      </Row>
    );
  }
}

Header.defaultProps = {
  onLogin: () => {},
  onLogout: () => {},
};

Header.propTypes = {
  /** Login event callback  */
  onLogin: PropTypes.func,
  /** Logout event callback */
  onLogout: PropTypes.func,
};

const mapStToProps = ({ showError }) => ({ showError: showError || [] });

const mapDispToProps = dispatch => ({
  onLogin: profile => dispatch(loginAction(profile)),
  onLogout: () => dispatch(logoutAction()),
  onErrorClose: () => dispatch(clearErrorAction()),
});

export default connect(mapStToProps, mapDispToProps)(Header);