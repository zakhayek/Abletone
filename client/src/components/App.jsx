import React from 'react';
import Channels from './Channels';
import Sequencer from './Sequencer';
import Editor from './Editor';
import Controls from './Controls';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="leftCol">
          <Channels />
        </div>
        <div className="rightCol">
          {/* <div className="step">
            <Sequencer />
          </div>
          <div className="editor">
            <Editor />
          </div> */}
          <div className="controls">
            <Controls />
          </div>
        </div>
      </div>
    )
  }
}

export default App;