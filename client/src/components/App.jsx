import React from 'react';
import SynthEdit from './SynthEdit';
import SynthSeq from './SynthSeq';
import DrumEdit from './DrumEdit';
import DrumSeq from './DrumSeq';
import Transport from './Transport';

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
      }
    };
    this.setStep = this.setStep.bind(this);
    this.setParams = this.setParams.bind(this);
  }

  setStep(synthSeq, drumSeq) {
    if (synthSeq) {
      this.setState({ synthSeq });
    } else {
      this.setState({ drumSeq });
    }
  }

  setParams(param) {
    this.setState({ synthParams: param });
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <div className="editor">
            <SynthEdit setParams={this.setParams}/>
          </div>
          <div className="sequencer">
            <SynthSeq synthSeq={this.state.synthSeq} setStep={this.setStep} />
          </div>
        </div>

        <div className="section">
          <div className="editor">
            <DrumEdit />
          </div>
          <div className="sequencer">
            <DrumSeq drumSeq={this.state.drumSeq} setStep={this.setStep} />
          </div>
        </div>
        <div className="transport">
          <Transport synthParams={this.state.synthParams} synthSeq={this.state.synthSeq} drumSeq={this.state.drumSeq} />
        </div>
      </div>
    )
  }
}

export default App;