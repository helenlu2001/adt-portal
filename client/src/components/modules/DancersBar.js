import React, { Component } from "react";
import './DancersBar.css';
import { get, post } from "../../utilities";


class DancersBar extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
        dancers: [],
        dancer: []
    };
    this.hello = this.hello.bind(this);
  }

  componentDidMount() {
    get("/api/dancers").then((res) => {
      res = res.sort((d1, d2) => (d1['first_name'] > d2['first_name']) ? 1 : -1);
      this.setState({
        dancers: res,
        selectedKerb: res[0].kerb
      });
      this.props.select(res[0].kerb);

      let dancers = []
      let kerbs = []
      for(let i = 0; i < this.state.dancers.length; i++) {
        let dancer = <Dancer 
            name={this.state.dancers[i].first_name + " " + this.state.dancers[i].last_name} 
            idx={i} 
            clicked={i == 0}
            hello={this.hello}
          />
        dancers.push(dancer);
        kerbs.push(this.state.dancers[i].kerb);
      }
      this.setState({dancerJS: dancers});
      this.props.create(kerbs);

    });

  }

  hello(idx) {
    let dancers = []
    for(let i = 0; i < this.state.dancers.length; i++) {
      let dancer = <Dancer 
                    name={this.state.dancers[i].first_name + " " + this.state.dancers[i].last_name} 
                    idx={i} 
                    clicked={idx == i}
                    hello={this.hello}
                  />
      dancers.push(dancer);
    }

    this.setState({dancerJS: dancers});
    this.props.select(idx);

  }

  render() {
    return (
      <>
        <div className='DancersBar-container'>
          {this.state.dancerJS}
        </div>
      </>
    );
  }

}

class Dancer extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {

    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.hello(0);
  }

  onClick(e) {
    this.props.hello(this.props.idx);
  }

  render() {
    let style = this.props.clicked ? {color: "var(--med-red)"} : {color: "black"};
    return (
      <>
        <div className='DancersBar-dancer' style={style} onClick={this.onClick}> {this.props.name} </div>
      </>
    );
  }

}





export default DancersBar;
