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
    };
    this.setStep = this.setStep.bind(this);
  }

  setStep(synthSeq, drumSeq) {
    if (synthSeq) {
      this.setState({ synthSeq });
    } else {
      this.setState({ drumSeq });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <div className="editor">
            <SynthEdit />
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
          <Transport synthSeq={this.state.synthSeq} drumSeq={this.state.drumSeq} />
        </div>
      </div>
    )
  }
}

export default App;