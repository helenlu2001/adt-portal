import React, { Component } from "react";
import { navigate, Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Notes from "./pages/Notes.js";
import Nav from "../components/modules/Nav";
import Login from "./pages/Login.js";
import Choreog from "./pages/Choreog.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      kerb: '',
      video_id: '',
      dance: "god's menu",
      choreogs: ['yinj', 'helen_lu'],
      kerbs: [],
      code: 'snacctime',
      choreogCode: 'snaccybois'
    };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    get("/api/users").then((res) => this.setState({kerbs: res}));
  }

  login(k, c) {
    if(this.state.choreogs.includes(k) && c == this.state.choreogCode) {
      navigate("/choreog/" + k);
    } else if(this.state.kerbs.includes(k) && c === this.state.code) {
      get("/api/video", {kerb: k}).then((res) => this.setState({video_id: res.video_id}));
      navigate("/godsmenu/" + k);
      this.setState({kerb: k});
    }
    
  }

  render() {
    return (
      <>
        <Nav/>
        <Router>
          <Login 
            path="/"
            login={this.login}
          />
          <Choreog
            path="/choreog/:choreog"
          />
          <Notes
            path="/godsmenu/:dancer"
            kerb={this.state.kerb}
            choreog={false}
          />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
