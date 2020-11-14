import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Youtube from "../modules/Youtube";
import Comment from "../modules/Comment";
import "../../utilities.css";
import "./Notes.css";
import Input from "../modules/Input";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Notes extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      diff: 0,
      comments: [],
    };

    this.submitComment = this.submitComment.bind(this);
    this.synch = this.synch.bind(this);
  }

  componentDidMount() {

  }

  submitComment(comment) {
    let comments = this.state.comments;
    comments.push({
      comment: comment,
      refTime: window['player-dancer'].getCurrentTime()
    });
    comments.sort((c1, c2) => (c1['refTime'] > c2['refTime']) ? 1 : -1);
    this.setState({comments: comments});
  }

  synch() {
    this.setState({diff: window['player-reference'].getCurrentTime()-window['player-dancer'].getCurrentTime()})
  }

  render() {
    let comments = [];
    for(let i = 0; i < this.state.comments.length; i+= 1) {
      let comment = this.state.comments[i];
      comments.push(<Comment comment={comment['comment']} refTime={comment['refTime']} diff={this.state.diff}/>);
    }

    return (
      <>  
        <div className='Notes-container'> 
          <div className='Notes-videoContainer'>
            <Youtube type={'reference'} videoId={'nkeh7Bx3GzY'}/>
            <Youtube type={'dancer'} videoId={'TQTlCHxyuu8'}/>
          </div>
          <div className='Notes-settings'>
            <Input submitComment={this.submitComment}/>
            <div> drag both the reference and dancer video to the same parts in the music and press sync! </div>
            <div className='Notes-button' onClick={this.synch}> SYNCH </div>
          </div>
          <hr />
          <div className='Notes-header'> COMMENTS <span style={{color: "black"}}> | timestamps from dancer video</span></div>
          <hr />

          <div className='Notes-commentContainer'>
            {comments}
          </div>
        </div>
      </>
    );
  }
}

export default Notes;
