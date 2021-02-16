import React from 'react';
import * as Tone from 'tone';

class Transport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadName: '',
      saveName: '',
    };
    this.synthEngine = this.synthEngine.bind(this);
    this.drumEngine = this.drumEngine.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
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
      } 
      else {
        steps.push(null);
      }
    }
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: this.props.synthParams.waveform,
      },
      envelope: {
        attack: this.props.synthParams.attack,
        decay: this.props.synthParams.decay,
        sustain: this.props.synthParams.sustain,
        release: this.props.synthParams.release,
        attackCurve: 'exponential',
        decayCurve: 'exponential',
        releaseCurve: 'exponential'
      }
    }).toDestination();
    const synthSeq = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, .01, time);
      },
      steps,
      "16n"
    );
    return synthSeq;
  }

  drumEngine() {
    const lowPass = new Tone.Filter({
      frequency: 5000,
    }).toDestination();
    const notes = ['C5', 'C5', 'C2', 'C1'];
    const steps = [];
    const sequence = this.props.drumSeq;
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
    const hhOpen = new Tone.NoiseSynth({
      volume: this.props.drumParams.hhOpenVol,
      noise : {
        type : 'white'
      },
      envelope : {
        attack : 0.005 ,
        decay : 0.3,
        sustain : 0
      },
    }).toDestination();
    const hhClosed = new Tone.NoiseSynth({
      volume: this.props.drumParams.hhClosedVol,
      noise : {
        type : 'white'
      },
      envelope : {
        attack : 0.005 ,
        decay : 0.05,
        sustain : 0
      },
    }).toDestination();
    const snare = new Tone.NoiseSynth({
      volume: this.props.drumParams.snareVol,
      noise : {
        type : 'white'
      },
      envelope : {
        attack : 0.005 ,
        decay : 0.2,
        sustain : 0
      },
    }).connect(lowPass);
    const kick = new Tone.MembraneSynth({
      volume: this.props.drumParams.kickVol,
    }).toDestination();

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
    synthSeq.start(0);
    for (let i = 0; i < drumSeq.length; i++) {
      drumSeq[i].start(0);
    }
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  save(e) {
    e.preventDefault();
    this.props.save(this.state.saveName)
  }

  load(e) {
    e.preventDefault();
    this.props.load(this.state.loadName);
  }

  render() {
    return (
      <div>
      <div>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
        {/* <button>Save</button>
        <button onClick={this.props.load}>Load</button> */}
      </div>
      <div>
        <form>
          <label>
            Save Pattern: 
            <input type="text" name="saveName" value={this.state.saveName} onChange={this.handleChange} />
          </label>
          <input type="submit" onClick={this.save} />
        </form>
      </div>
      <div>
        <form>
          <label>
            Load Pattern: 
            <input type="text" name="loadName" value={this.state.loadName} onChange={this.handleChange} />
          </label>
          <input type="submit" onClick={this.load} />
        </form>
      </div>
      </div>
    )
  }
}

export default Transport;