import React from 'react';
import { get, post } from "../../utilities";

// starter code for YT player is from: 
// https://stackoverflow.com/questions/54017100/how-to-integrate-youtube-iframe-api-in-reactjs-solution

class Youtube extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        ref: undefined,
        dancer: undefined,
        kerb: ''
      }
      this.loadVideo = this.loadVideo.bind(this);
      this.onPlayerChange = this.onPlayerChange.bind(this);
      this.onPlayerReady = this.onPlayerReady.bind(this);
    }


  componentDidMount() {
    console.log(this.props.vidId)
    if (!window.YT) { 
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      window.onYouTubeIframeAPIReady = this.loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    } else { // If script is already there, load the video directly
      this.loadVideo();
    }
  };

  loadVideo() {
    get("/api/video", {kerb: this.props.kerb}).then((res) => {
      this.setState({ ref: new window.YT.Player('player-reference', {
          width: '500',
          videoId: 'nkeh7Bx3GzY',
          events: {
            onReady: this.onPlayerReady,
            
          },
        })
      });
      window['player-reference'] = this.state.ref; 

      this.setState({ dance: new window.YT.Player('player-dancer', {
          width: '500',
          videoId: res.video_id,
          events: {
            onReady: this.onPlayerReady,
            onStateChange: this.onPlayerChange
          },
        }),
        vidId: res.video_id

      });

      window['player-dancer'] = this.state.dance;
    });

  };

  onPlayerReady (event) {
    event.target.playVideo();
  };

  onPlayerChange(event) {
    if(window['player-dancer'].getPlayerState() == 2) {
        window['player-reference'].pauseVideo();
    } else if(window['player-dancer'].getPlayerState() == 1) {
        window['player-reference'].seekTo(window['player-dancer'].getCurrentTime()+this.props.diff);
        window['player-reference'].playVideo()      
    }
  }

  render() {
    if(this.props.vidId !== this.state.vidId && this.state.vidId !== undefined) {
      window['player-reference'].loadVideoById('nkeh7Bx3GzY');
      window['player-dancer'].loadVideoById(this.props.vidId);
      this.setState({vidId: this.props.vidId});
    }
    console.log(this.props.vidId)
    return (
      <>
        <div id={'player-reference'} />
        <div id={'player-dancer'} />
      </>
    );
  };
}


export default Youtube;