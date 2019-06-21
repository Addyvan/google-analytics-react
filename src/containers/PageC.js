import React from "react";

import { connect } from 'react-redux';

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
        <h4>Check console for more detail</h4>
      {
        this.props.story.map((event) => {
          return(
            <p>
              {event.time} --- {event.action.type} --- STEP: {event.action.step} --- {event.stateSnapshot.name}
            </p>
          );
        })
      }
      </div>
    );
  }
}

const mapStToProps = (state) => (
  { 
    story: state.onboarding.story
  }
);

export default connect(mapStToProps)(PageC);
