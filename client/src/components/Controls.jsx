import React from 'react';
import { Transport } from 'tone';
import * as Tone from 'tone';

class Controls extends React.Component {
  constructor(props) {
    super(props);
    // create a new synth
    
  }

  start() {
    const lowPass = new Tone.Filter({
      frequency: 8000,
    }).toDestination();
    const bass = new Tone.MonoSynth({
      oscillator: { type: "sawtooth" },
      envelope: {
        attack: 0.1,
      }
    }).toDestination();
    const kick = new Tone.MembraneSynth().toDestination();
    const snareDrum = new Tone.NoiseSynth({
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
    }).connect(lowPass);
    const sexyBoy = [
      "D2",
      "D3",
      ["D2", "D2"],
      ["C3", "D3"],
      "D2",
      "D3",
      ["D2", "D2"],
      ["C3", "D3"],
      "C2",
      "D3",
      ["C2", "C2"],
      ["C3", "D3"],
      "C2",
      "D3",
      ["C2", "C2"],
      ["C3", "D3"],

      "D2",
      "D3",
      ["D2", "D2"],
      ["C3", "D3"],
      "D2",
      "D3",
      ["D2", "D2"],
      ["C3", "D3"],

      "F2",
      "F3",
      ["F2", "F2"],
      ["E3", "F3"],
      "F2",
      "F3",
      ["F2", "F2"],
      ["E3", "F3"],
    ];
    const kickNotes = [
      "C1",
      "C1",
      "C1",
      "C1",
      "C1",
      "C1",
      "C1",
      "C1",
    ];
    const snares = [
      null,
      null,
      "C5",
      null,
    ];
    Tone.Transport.bpm.value = 115;
    const bassPart = new Tone.Sequence(
      function(time, note) {
        bass.triggerAttackRelease(note, 0.1, time);
      },
      sexyBoy,
      "4n"
    );
    const kickPart = new Tone.Sequence(
      function(time, note) {
        kick.triggerAttackRelease(note, 0.1, time);
      },
      kickNotes,
      "4n"
    );
    const snarePart = new Tone.Sequence(
      function(time) {
        snareDrum.triggerAttackRelease('4n', time)
      }, 
      snares
    );
    kickPart.start();
    bassPart.start();
    snarePart.start();
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }


  render() {
    return (
      <div>
        <button onClick={this.start}>
          Start
        </button>
        <button onClick={this.stop}>
          Stop
        </button>
      </div>
    )
  }
}

export default Controls;