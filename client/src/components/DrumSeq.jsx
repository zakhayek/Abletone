import React from 'react';

class DrumSeq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.stepSwitch = this.stepSwitch.bind(this);
  }

  stepSwitch(col, row) {
    let sequence = this.props.drumSeq;
    sequence[col][row] = !sequence[col][row];
    this.props.setStep(null, sequence);
  }

  render() {
    return (
      this.props.drumSeq.map((division, x) => (
        <div>
          {division.map((state, y) => (
            <button className={state ? `step_on` : `step_off`} key={x,y} name={`${x}${y}`} onClick={() => this.stepSwitch(x, y)}></button>
          ))}
        </div>
      ))
    )
  }
}

export default DrumSeq;