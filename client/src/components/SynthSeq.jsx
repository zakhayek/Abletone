import React from 'react';
import * as Tone from 'tone';

class SynthSeq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: [
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
      ],
      
    };
    this.stepSwitch = this.stepSwitch.bind(this);
    this.start = this.start.bind(this);
  }

  stepSwitch(col, row) {
    let sequence = this.state.sequence;
    sequence[col][row] = !sequence[col][row];
    this.setState({ sequence });
  }

  start() {
    const cMajPent = ['C5', 'A#4', 'G4', 'F4', 'D#4', 'C4', 'A#3', 'G3', 'F3', 'D#3', 'C3', 'A#2', 'G2', 'F2', 'D#2', 'C2'];
    const steps = [];
    const { sequence } = this.state;
    for (let note = 0; note < sequence.length; note++) {
      const chord = [];
      for (let step = 0; step < sequence.length; step++) {
        if (sequence[step][note]) {
          chord.push(cMajPent[step]);
        }
      }
      if (chord.length > 0) {
        steps.push(chord);
      } else {
        steps.push(null);
      }
    }
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "sine",
      },
    }).toDestination();
    const synthSeq = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, .1, time);
      },
      steps,
      "16n"
    );
    synthSeq.start();
    Tone.Transport.start();
  }

  render() {
    return (
      this.state.sequence.map((division, x) => (
        <div className="synth_row">
          {division.map((state, y) => (
            <button className={state ? `step_on` : `step_off`} key={x,y} name={`${x}${y}`} onClick={() => this.stepSwitch(x, y)}></button>
          ))}
          <button onClick={this.start}>Test</button>
        </div>
      ))
    )
  }
}

export default SynthSeq;