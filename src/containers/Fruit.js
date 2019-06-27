import React from "react";

import Apple from "../components/fruits/Apple";
import Orange from "../components/fruits/Orange";
import Watermelon from "../components/fruits/Watermelon";

class Fruit extends React.Component {
  render() {

    let page = null;
    switch(this.props.location.pathname) {
      case "/fruits/A":
        page = <Apple />; break;
      case "/fruits/B":
        page = <Orange />; break;
      case "/fruits/E":
        page = <Watermelon />; break;
      default: break;
    }
    return(
      <div>
        {
          page
        }
      </div>
    );
  }
}

export default Fruit;