import React from 'react';

// starter code for YT player is from: 
// https://stackoverflow.com/questions/54017100/how-to-integrate-youtube-iframe-api-in-reactjs-solution

class Youtube extends React.Component {
  constructor(props) {
      super(props);
      this.loadVideo = this.loadVideo.bind(this);
    }


  componentDidMount() {

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
    window['player-' + this.props.type] = new window.YT.Player('player-reference-' + this.props.kerb, {
      width: '500',
      videoId: this.props.refId,
      events: {
        onReady: this.onPlayerReady,
      },
    });
    window['player-' + this.props.type] = new window.YT.Player('player-dancer-' + this.props.kerb, {
      width: '500',
      videoId: this.props.vidId,
      events: {
        onReady: this.onPlayerReady,
      },
    });
  };

  onPlayerReady = event => {
    event.target.playVideo();
  };

  render = () => {
    return (
      <>
        <div id={'player-reference-' + this.props.kerb} />
        <div id={'player-dancer-' + this.props.kerb} />
      </>
    );
  };
}


export default Youtube;