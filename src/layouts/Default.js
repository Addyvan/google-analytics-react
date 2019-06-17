import React from "react";
import { Container } from "reactstrap";

import Header from "./Header";

const DefaultLayout = ({ children }) => (
  <Container id="main" >
    <Header />
    {children}
  </Container>
);

export default DefaultLayout;