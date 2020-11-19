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
      kerb: 'helen_lu',
      dance: "god's menu",
      choreogs: ['yinj', 'helen_lu'],
      kerbs: ['ayue', 'andreayl', 'annlin', 'bensonc', 'mcarolyn', 'ccheng00', 'defiesta', 'emilyhan', 'jcheong', 'jeyoon',
              'jlmeng', 'jpark00', 'kxiong22', 'syoro', 'boomzaza', 'lucyrlee', 'yinm', 'sarahwei', 'saracola', 'sophiejg', 
              'vchau', 'vikt'],
      code: 'snacctime',
      choreogCode: 'snaccybois'
    };

    this.login = this.login.bind(this);
  }

  componentDidMount() {
    get("/api/userID", {kerb: this.state.kerb}).then((id) => this.setState({userId: id}));
  }

  login(k, c) {
    if(this.state.choreogs.includes(k) && c == this.state.choreogCode) {
      navigate("/choreog/" + k);
    } else if(this.state.kerbs.includes(k) && c === this.state.code) {
      navigate("/godsmenu/" + k);
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
            userId={this.state.userId}
          />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
