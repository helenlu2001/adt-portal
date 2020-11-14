import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Notes from "./pages/Notes.js";
import Nav from "../components/modules/Nav";
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
      kerb: 'helen_lu'
    };
  }

  componentDidMount() {
    get("/api/userID", {kerb: this.state.kerb}).then((id) => this.setState({userId: id}));
  }


  render() {
    return (
      <>
        <Nav/>
        <Router>
          <Notes
            path="/"
            userId={this.state.userId}
          />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
