import React from 'react';
import SynthEdit from './SynthEdit';
import SynthSeq from './SynthSeq';
import DrumEdit from './DrumEdit';
import DrumSeq from './DrumSeq';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="synth_section">
          <div className="synth_editor">
            {/* <SynthEdit /> */}
          </div>
          <div className="sequencer">
            <SynthSeq />
          </div>
        </div>

        <div className="drum_section">
          <div className="drum_editor">
            {/* <DrumEdit /> */}
          </div>
          <div className="sequencer">
            <DrumSeq />
          </div>
        </div>
      </div>
    )
  }
}

export default App;