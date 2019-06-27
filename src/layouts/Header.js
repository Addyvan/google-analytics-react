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

import { loginAction, logoutAction, clearErrorAction } from '../redux/actions/actions';
import { connect } from 'react-redux';
import Login from '@gctools-components/gc-login';
import Search from "../components/search/Search";


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

    var data = [
      {en: "Apple", fr: "Pomme", out: "A"},
      {en: "Orange", fr: "Orange", out: "B"},
      {en: "Potato", fr: "Pomme-de-terre", out: "C"},
      {en: "Cake", fr: "Gâteau", out: "D"},
      {en: "Watermelon", fr: "Melon d'eau", out: "E"},
    ];

    return(
      <Row style={{marginTop: "15px", marginBottom: "15px"}}>
        <Col>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Analytics demo</NavbarBrand>
            <NavbarToggler/>
            
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/PageA">Overview</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/onboard">onboard</NavLink>
                </NavItem>
                <NavItem style={{marginRight: "10px"}}>
                  <NavLink href="/PageC">story</NavLink>
                </NavItem>
                <Search
                    placeholder="Search..."
                    lang="en"
                    data={data}
                    englishKey="en"
                    frenchKey="fr"
                    outputKey="out"
                  />
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