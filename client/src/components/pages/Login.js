import React, { Component } from "react";
import { navigate, Router } from "@reach/router";

import './Login.css';

class Login extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
        kerbs: ['helen_lu'],
        password: 'snacctime',
        kerb: '',
        code: '',

    };
    this.auth = this.auth.bind(this);
  }

  componentDidMount() {

  }

  auth(e) {
    this.props.login(this.state.kerb, this.state.code);
    this.setState({
        kerb: '',
        code: ''
    });
  }


  render() {
    return (
      <>
        <div className='Login-container'>
            <div className='Login-title'> COMMENT PORTAL FOR SNACCS </div>
            <div className='Login-body' > Enter your kerb and the secret code </div>
            <input type='text' value={this.state.kerb} onChange={(e) => this.setState({kerb: e.target.value})}/> 
            <div/>
            <input type='text' value={this.state.code} onChange={(e) => this.setState({code: e.target.value})}/> 
            <div className='Login-button' onClick={this.auth}> Login </div>
        </div>

      </>
    );
  }
}

export default Login;
