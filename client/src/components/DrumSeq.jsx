import React from 'react';

class DrumSeq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: [
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
      ],
      
    };
    this.stepSwitch = this.stepSwitch.bind(this);
  }

  stepSwitch(col, row) {
    let sequence = this.state.sequence;
    sequence[col][row] = !sequence[col][row];
    this.setState({ sequence });
  }

  render() {
    return (
      this.state.sequence.map((division, x) => (
        <div className="drum_row">
          {division.map((state, y) => (
            <button className={state ? `step_on` : `step_off`} key={x,y} name={`${x}${y}`} onClick={() => this.stepSwitch(x, y)}></button>
          ))}
        </div>
      ))
    )
  }
}

export default DrumSeq;