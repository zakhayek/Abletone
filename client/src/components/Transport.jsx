import React from 'react';
import * as Tone from 'tone';

class Transport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.synthEngine = this.synthEngine.bind(this);
    this.drumEngine = this.drumEngine.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  synthEngine() {
    const cMajPent = ['C5', 'A#4', 'G4', 'F4', 'D#4', 'C4', 'A#3', 'G3', 'F3', 'D#3', 'C3', 'A#2', 'G2', 'F2', 'D#2', 'C2'];
    const steps = [];
    const sequence = this.props.synthSeq;
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
    return synthSeq;
  }

  drumEngine() {
    const notes = ['C5', 'C5', 'C2', 'C1'];
    const steps = [];
    const sequence = this.props.drumSeq;
    console.log(sequence);
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
      noise : {
        type : 'white'
      },
      envelope : {
        attack : 0.005 ,
        decay : 0.2,
        sustain : 0
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
    const drums = [hhOpenSeq, hhClosedSeq, snareSeq, kickSeq];
    return drums;
  }
  
  start() {
    Tone.Transport.cancel();
    const synthSeq = this.synthEngine();
    const drumSeq = this.drumEngine();
    Tone.Transport.set(synthSeq.start());
    for (let i = 0; i < drumSeq.length; i++) {
      Tone.Transport.set(drumSeq[i].start());
    }
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }

  render() {
    return (
      <div>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
      </div>
    )
  }
}

export default Transport;