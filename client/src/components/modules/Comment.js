import React, { Component } from "react";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.goToVideo = this.goToVideo.bind(this);
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  goToVideo(event) {
    window['player-dancer'].seekTo(this.props.refTime);
    window['player-reference'].seekTo(this.props.refTime);
  }

  render() {

    return (
      <>  
        <div className='Comments-container' onClick={this.goToVideo}>
          <div > {this.props.comment} </div>
        </div>
      </>
    );
  }
}

export default Notes;
