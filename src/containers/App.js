import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from "../redux/store";
import routes from "../routes";
import "../styles/aurora.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../layouts/Header";

import {Container} from "reactstrap";


class App extends React.Component {
  render() {
    return (
      <Router>
        <Container>
          <Header />
          <ConnectedRouter history={history}>
            <div className="flex-grow-1" style={{height:"100%"}}>
              {
                routes.map((route, index) => {
                  return(
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={props => {
                        return (
                          <route.layout {...props}>
                            <route.component {...props} />
                          </route.layout>
                        );
                      }}
                    />
                  );
                })
              }
            </div>
          </ConnectedRouter>
        </Container>
      </Router>
    );
  }
}

export default App;