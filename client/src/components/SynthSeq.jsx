import React from 'react';
import * as Tone from 'tone';

class SynthSeq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.stepSwitch = this.stepSwitch.bind(this);
  }

  stepSwitch(col, row) {
    let sequence = this.props.synthSeq;
    sequence[col][row] = !sequence[col][row];
    console.log(sequence[col][row]);
    this.props.setStep(sequence);
  }

  render() {
    return (
      this.props.synthSeq.map((division, x) => (
        <div className="synth_row">
          {division.map((state, y) => (
            <button className={state ? `step_on` : `step_off`} key={x,y} name={`${x}${y}`} onClick={() => this.stepSwitch(x, y)}></button>
          ))}
        </div>
      ))
    )
  }
}

export default SynthSeq;