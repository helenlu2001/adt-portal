import React, { Component } from "react";
import "./Comment.css";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.goToVideo = this.goToVideo.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  goToVideo(event) {
    window['player-dancer'].seekTo(this.props.refTime);
    window['player-dancer'].playVideo()
    window['player-reference'].seekTo(this.props.refTime+this.props.diff);
    window['player-reference'].playVideo();
  }

  remove(e) {
    console.log("hello");
    this.props.removeComment(this.props.index);
  }

  render() {

    return (
      <>  
        <div className='Comments-container' onClick={this.goToVideo}>
          <div className='Comments-time'> {Math.floor(this.props.refTime / 60)}m {Math.round(this.props.refTime % 60)}s </div>
          <div className='Comments-comment'> {this.props.comment} </div>
          <div className='Comments-showRemove'>
            <div className='Comments-remove' onClick={this.remove}> x </div>
          </div>
        </div>
      </>
    );
  }
}

export default Notes;
