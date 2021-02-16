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
    };
    this.setStep = this.setStep.bind(this);
    this.setSynthParams = this.setSynthParams.bind(this);
    this.setDrumParams = this.setDrumParams.bind(this);
    this.savePattern = this.savePattern.bind(this);
    this.getPattern = this.getPattern.bind(this);
  }

  setStep(synthSeq, drumSeq) {
    if (synthSeq) {
      this.setState({ synthSeq });
    } else {
      this.setState({ drumSeq });
    }
  }

  setSynthParams(param, value) {
    let synthParams = this.state.synthParams;
    synthParams[param] = value;
    this.setState({ synthParams });
  }

  setDrumParams(param, value) {
    let drumParams = this.state.drumParams;
    drumParams[param] = value;
    this.setState({ drumParams });
  }

  getPattern(name) {
    axios.get(`/api/patterns/${name}`)
      .then((res) => {
        const { synthSeq, drumSeq, synthParams } = res.data[0];
        this.setState({ synthSeq, drumSeq, synthParams });
      })
      .catch((err) => console.log(err));
  }

  savePattern(name) {
    const pattern = this.state;
    pattern.name = name;
    axios.post('/api/patterns', pattern)
      .then(console.log('Posted.'))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <div className="editor">
            <SynthEdit setSynthParams={this.setSynthParams}/>
          </div>
          <div className="sequencer">
            <SynthSeq synthSeq={this.state.synthSeq} setStep={this.setStep} />
          </div>
        </div>

        <div className="section">
          <div className="editor">
            <DrumEdit setDrumParams={this.setDrumParams} />
          </div>
          <div className="sequencer">
            <DrumSeq drumSeq={this.state.drumSeq} setStep={this.setStep} />
          </div>
        </div>
        <div className="transport">
          <Transport 
            drumParams={this.state.drumParams}
            synthParams={this.state.synthParams}
            synthSeq={this.state.synthSeq}
            drumSeq={this.state.drumSeq}
            save={this.savePattern}
            load={this.getPattern}
          />
        </div>
      </div>
    )
  }
}

export default App;