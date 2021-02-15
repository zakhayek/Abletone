import React from 'react';

class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: [
        [
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
        ],
      ],
      
    };
    this.stepSwitch = this.stepSwitch.bind(this);
  }

  stepSwitch(e) {
    e.preventDefault();
    const x = parseInt(e.target.name.slice(0, 1));
    const y = parseInt(e.target.name.slice(1));
    let sequence = this.state.sequence;
    sequence[x][y] = !sequence[x][y];
    this.setState({ sequence });
  }

  render() {
    return (
      this.state.sequence.map((division, x) => (
        division.map((state, y) => (
          <button className={state ? `s${x}_on` : `s${x}_off`} key={x,y} name={`${x}${y}`} onClick={this.stepSwitch}>|</button>
        ))
      ))
    )
  }
}

export default Sequencer;