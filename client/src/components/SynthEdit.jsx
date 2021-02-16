import React from 'react';

class SynthEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waveform: 'sawtooth',
      attack : 0.005,
      decay : 0.1,
      sustain : 0.3,
      release : 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    this.setState({ [param]: value });
    this.props.setSynthParams(param, value)
  }

  render() {
    return (
      <div className="params">
        <form className="sliders">
          <select name="waveform" value={this.state.waveform} onChange={this.handleChange}>
            <option value="sawtooth">Sawtooth</option>
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
          </select>
          {/* <input type="range" name="attack" min="0.001" max="0.5" value={this.state.attack} step="0.001" onChange={this.handleChange}></input>
          <input type="range" name="decay" min="0.001" max="1" value={this.state.decay} step="0.001" onChange={this.handleChange}></input>
          <input type="range" name="sustain" min="0.001" max="1" value={this.state.sustain} step="0.001" onChange={this.handleChange}></input> */}
          <input type="range" name="release" min="0.001" max="1" value={this.state.release} step="0.001" onChange={this.handleChange}></input>
        </form>
      </div>
    )
  }
}

export default SynthEdit;