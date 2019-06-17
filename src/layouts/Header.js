import React from "react";

import {
  Row,
  Col,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class Header extends React.Component {
  render() {
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
                <NavItem>
                  <NavLink href="/PageC">Page C</NavLink>
                </NavItem>
              </Nav>

          </Navbar>
        </Col>
      </Row>
    );
  }
}

export default Header;