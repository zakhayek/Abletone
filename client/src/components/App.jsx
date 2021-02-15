import React from 'react';
import SynthEdit from './SynthEdit';
import SynthSeq from './SynthSeq';
import DrumEdit from './DrumEdit';
import DrumSeq from './DrumSeq';
import Transport from './Transport';
import Controls from './Controls';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <div className="editor">
            <SynthEdit />
            {/* <Controls /> */}
          </div>
          <div className="sequencer">
            <SynthSeq />
          </div>
        </div>

        <div className="section">
          <div className="editor">
            <DrumEdit />
          </div>
          <div className="sequencer">
            <DrumSeq />
          </div>
        </div>
        <div className="transport">
          <Transport />
        </div>
      </div>
    )
  }
}

export default App;