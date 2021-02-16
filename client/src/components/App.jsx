import React from 'react';
import SynthEdit from './SynthEdit';
import SynthSeq from './SynthSeq';
import DrumEdit from './DrumEdit';
import DrumSeq from './DrumSeq';
import Transport from './Transport';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {
        synthSeq: [
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
        drumSeq: [
          [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
          [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
          [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
          [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
        ],
        synthParams: {
          waveform: 'sawtooth',
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        },
        drumParams: {
          hhOpenVol: 0.8,
          hhClosedVol: 1,
          snareVol: 8,
          kickVol: 8,
        }
      },
      patterns: [],
    };
    this.setStep = this.setStep.bind(this);
    this.setSynthParams = this.setSynthParams.bind(this);
    this.setDrumParams = this.setDrumParams.bind(this);
    this.savePattern = this.savePattern.bind(this);
    this.getPattern = this.getPattern.bind(this);
    this.getAllPatterns = this.getAllPatterns.bind(this);
  }

  componentDidMount() {
    this.getAllPatterns();
  }

  setStep(synthSeq, drumSeq) {
    const { current } = this.state;
    if (synthSeq) {
      current.synthSeq = synthSeq;
      this.setState({ current });
    } else {
      current.drumSeq = drumSeq;
      this.setState({ current });
    }
  }

  setSynthParams(param, value) {
    let { current } = this.state;
    current.synthParams[param] = value;
    this.setState({ current });
  }

  setDrumParams(param, value) {
    let { current } = this.state;
    current.drumParams[param] = value;
    this.setState({ current });
  }

  getPattern(name) {
    axios.get(`/api/patterns/${name}`)
      .then((res) => {
        const { synthSeq, drumSeq, synthParams, drumParams } = res.data[0];
        const current = { synthSeq, drumSeq, synthParams, drumParams }
        this.setState({ current });
      })
      .catch((err) => console.log(err));
  }

  savePattern(name) {
    const pattern = this.state.current;
    pattern.name = name;
    axios.post('/api/patterns', pattern)
      .then(this.getAllPatterns())
      .catch((err) => console.log(err));
  }

  getAllPatterns() {
    axios.get('/api/patterns')
      .then((res) => {
        this.setState({ patterns: res.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <div className="editor">
            <SynthEdit synthParams={this.state.current.synthParams} setSynthParams={this.setSynthParams}/>
          </div>
          <div className="sequencer">
            <SynthSeq synthSeq={this.state.current.synthSeq} setStep={this.setStep} />
          </div>
        </div>

        <div className="section">
          <div className="editor">
            <DrumEdit drumParams={this.state.current.drumParams} setDrumParams={this.setDrumParams} />
          </div>
          <div className="sequencer">
            <DrumSeq drumSeq={this.state.current.drumSeq} setStep={this.setStep} />
          </div>
        </div>
        <div className="transport">
          <Transport 
            drumParams={this.state.current.drumParams}
            synthParams={this.state.current.synthParams}
            synthSeq={this.state.current.synthSeq}
            drumSeq={this.state.current.drumSeq}
            save={this.savePattern}
            load={this.getPattern}
            patterns={this.state.patterns}
          />
        </div>
      </div>
    )
  }
}

export default App;