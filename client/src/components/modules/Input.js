import React, { Component } from "react";
import "./Input.css";

/**
 * Define the "App" component as a class.
 */
class Input extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }


  onChange(e) {
    console.log(e.target.value);
    this.setState({value: e.target.value});
  }

  submit(e) {
      console.log('submitting' + this.state.value);
      this.props.submitComment(this.state.value);
      this.setState({value: ""});
  }

  render() {
    return (
      <>
        <div className='Input-container'>
          <textarea type="text" value={this.state.value} onChange={this.onChange}/>
          <div className='Input-button' onClick={this.submit}> Add Note! </div>
        </div> 
          
      </>
    );
  }
}

export default Input;
