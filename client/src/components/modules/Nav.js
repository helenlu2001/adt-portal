import React, { Component } from "react";
import './Nav.css';


class Nav extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  render() {
    return (
      <>
        <div className='Nav-container'>
            <div className='Nav-logo'> </div>
            <div className='Nav-title'> SNACC PORTAL </div>
        </div>
      </>
    );
  }

}

export default Nav;
