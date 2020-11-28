import React, { Component } from "react";
import "../../utilities.css";
import "./Choreog.css";
import { get, post } from "../../utilities";
import DancersBar from '../modules/DancersBar.js';
import Notes from '../pages/Notes.js';

class Choreog extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      selectedIdx: 0,
      notes: []
    };

    this.select = this.select.bind(this);
    this.create = this.create.bind(this);

  }

  componentDidMount() {
    
  }

  select(idx) {
    this.setState({selectedIdx: idx});
  }

  create(kerbs) {
    let notes = [];
    for(let i = 0; i < kerbs.length; i++) {
      notes.push(<Notes kerb={kerbs[i]} choreog={true}/>)
    }
    this.setState({notes: notes});
  }

  render() {
    return (
      <>  
        <div className='Choreog-container'> 
          <DancersBar 
            select={this.select} 
            create={this.create} 
            createNotes={this.createNotes}
          />
          <div className='Choreog-notes'>
            {this.state.notes[this.state.selectedIdx]}
          </div>

        </div>
      </>
    );
  }
}

export default Choreog;
