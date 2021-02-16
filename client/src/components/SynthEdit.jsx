import React from 'react';

class SynthEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeWaveform = this.changeWaveform.bind(this);
  }

  changeWaveform(e) {
    e.preventDefault();
    this.props.setParams({ waveform: e.target.value });
  }

  render() {
    return (
      <div>
        <form>
          <select onChange={this.changeWaveform}>
            <option value="sawtooth">Sawtooth</option>
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
          </select>
        </form>
      </div>
    )
  }
}

export default SynthEdit;