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
      comments: [],
    };

    this.submitComment = this.submitComment.bind(this);
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  submitComment(comment) {
    let comments = this.state.comments;
    comments.push(<Comment comment={comment} refTime={window['player-dancer'].getCurrentTime()}/>);
    this.setState({comments: comments});
  }

  render() {
    let comments = [];
    for(let i = 0; i < this.state.comments.length; i+= 1) {
      comments.push(this.state.comments[i]);
    }
    return (
      <>  
        <div className='Notes-container'> 
          <div className='Notes-videoContainer'>
            <Youtube type={'reference'}/>
            <Youtube type={'dancer'}/>
          </div>
          <Input submitComment={this.submitComment}/>
          <div>
            <hr/>
            {comments}
          </div>
        </div>
      </>
    );
  }
}

export default Notes;
