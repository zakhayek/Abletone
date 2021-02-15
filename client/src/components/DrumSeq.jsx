import React from 'react';
import * as Tone from 'tone';

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
    this.start = this.start.bind(this);
  }

  stepSwitch(col, row) {
    let sequence = this.state.sequence;
    sequence[col][row] = !sequence[col][row];
    this.setState({ sequence });
  }

  start() {
    const notes = ['C5', 'C5', 'C5', 'C1'];
    const steps = [];
    const { sequence } = this.state;
    for (let kit = 0; kit < sequence.length; kit++) {
      let seq = [];
      for (let hit = 0; hit < sequence[kit].length; hit++) {
        if (sequence[kit][hit]) {
          seq.push(notes[kit]);
        } else {
          seq.push(null);
        }
      }
      steps.push(seq);
    }
    const hhOpen = new Tone.NoiseSynth().toDestination();
    const hhClosed = new Tone.NoiseSynth().toDestination();
    const snare = new Tone.NoiseSynth({
      volume: 5,
      noise: {
        type: 'white',
        playbackRate: 3,
      },
      envelope: {
        attack: 0.001,
        decay: 0.20,
        sustain: 0.15,
        release: 0.03,
      },
    }).toDestination();
    const kick = new Tone.MembraneSynth().toDestination();

    const hhOpenSeq = new Tone.Sequence(
      function(time) {
        hhOpen.triggerAttackRelease('4n', time);
      },
      steps[0],
      '16n'
    );
    const hhClosedSeq = new Tone.Sequence(
      function(time) {
        hhClosed.triggerAttackRelease('4n', time);
      },
      steps[1],
      '16n'
    );
    const snareSeq = new Tone.Sequence(
      function(time) {
        snare.triggerAttackRelease('4n', time);
      },
      steps[2],
      '16n'
    );
    const kickSeq = new Tone.Sequence(
      function(time, note) {
        kick.triggerAttackRelease(note, 0.1, time);
      },
      steps[3],
      '16n'
    );
    console.log(steps)
    hhOpenSeq.start();
    hhClosedSeq.start();
    snareSeq.start();
    kickSeq.start();
    Tone.Transport.start();
  }

  render() {
    return (
      this.state.sequence.map((division, x) => (
        <div className="drum_row">
          {division.map((state, y) => (
            <button className={state ? `step_on` : `step_off`} key={x,y} name={`${x}${y}`} onClick={() => this.stepSwitch(x, y)}></button>
          ))}
          <button onClick={this.start}>Test</button>
        </div>
      ))
    )
  }
}

export default DrumSeq;