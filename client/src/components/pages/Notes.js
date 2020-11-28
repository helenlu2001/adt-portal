import React, { Component } from "react";
import Youtube from "../modules/Youtube";
import Comment from "../modules/Comment";
import "../../utilities.css";
import "./Notes.css";
import Input from "../modules/Input";
import { get, post } from "../../utilities";

class Notes extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      diff: 0,
      comments: [],
      kerb: '',
      video_id: ''
    };

    this.submitComment = this.submitComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.synch = this.synch.bind(this);
  }

  componentDidMount() {
    let kerb;
    if(this.props.choreog) {
      kerb = this.props.kerb;
    } else {
      kerb = this.props.location.pathname.split("/")
      kerb = kerb[kerb.length -1];
      
    }
    this.setState({kerb: kerb});
    get("/api/video", {kerb: kerb}).then((res) => {
      this.setState({
        video_id: res.video_id,
        diff: res.synch
      });
      get("/api/comment", {video: this.state.video_id, kerb:kerb}).then((res) => {
        let comments = res.map((c) => {
          return {
            comment: c.comment,
            refTime: c.time
          };
        })
        comments.sort((c1, c2) => (c1['refTime'] > c2['refTime']) ? 1 : -1);
        this.setState({comments: comments});
      });
    });
  }

  submitComment(comment) {
    let time = window['player-dancer'].getCurrentTime();
    let comments = this.state.comments;
    comments.push({
      comment: comment,
      refTime: time 
    });
    comments.sort((c1, c2) => (c1['refTime'] > c2['refTime']) ? 1 : -1);
    this.setState({comments: comments});
    post("/api/comment", {
      video: this.state.video_id, 
      comment:comment, 
      kerb: this.state.kerb,
      time: time })
      .then(comment => console.log("we have submitted the comment" + comment));
  }

  removeComment(index) {
    let comments = this.state.comments;
    let toDelete = comments[index]['comment'];
    comments.splice(index, 1);
    this.setState({comments: comments})
    post("/api/removeComment", {
      video: this.state.video_id, 
      comment: toDelete, 
      kerb: this.state.kerb,
    });

  }

  synch() {
    console.log("hello");
    let diff = window['player-reference'].getCurrentTime()-window['player-dancer'].getCurrentTime();
    console.log(diff);
    this.setState({diff: diff})
    post("/api/synch", {
      synch: diff, 
      kerb: this.state.kerb,
    });

  }

  render() {
    if(this.props.kerb != this.state.kerb) {
      console.log(this.props.kerb);
      console.log(this.state.kerb);
      get("/api/video", {kerb: this.props.kerb}).then((res) => {
        this.setState({
          kerb: this.props.kerb,
          video_id: res.video_id,
          diff: res.synch
        });
        get("/api/comment", {video: this.state.video_id, kerb:this.props.kerb}).then((res) => {
          let comments = res.map((c) => {
            return {
              comment: c.comment,
              refTime: c.time
            };
          })
          comments.sort((c1, c2) => (c1['refTime'] > c2['refTime']) ? 1 : -1);
          this.setState({comments: comments});
        });
      }
      );  
    }

    let comments = [];
    for(let i = 0; i < this.state.comments.length; i+= 1) {
      let comment = this.state.comments[i];
      comments.push(<Comment comment={comment['comment']} refTime={comment['refTime']} diff={this.state.diff} index={i} removeComment={this.removeComment}/>);
    }


    return (
      <>  
        <div className='Notes-container'> 
          <div className='Notes-videoContainer'>
            {this.state.video_id != undefined && <Youtube type={'reference'} refId={'nkeh7Bx3GzY'} vidId={this.state.video_id} kerb={this.state.kerb} diff={this.state.diff}/>}
            {/* <Youtube type={'dancer'} videoId={'9zSrFPTwTN0'}/> */}
          </div>
          <div className='Notes-settings'>
            {this.props.choreog && <Input submitComment={this.submitComment}/>} 
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
