import React from 'react';

class SynthEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    this.props.setSynthParams(param, value)
  }

  render() {
    return (
      <div className="params">
        <form className="sliders">
          <select name="waveform" value={this.props.synthParams.waveform} onChange={this.handleChange}>
            <option value="sawtooth">Sawtooth</option>
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
          </select>
          <input type="range" name="release" min="0.001" max="1" value={this.props.synthParams.release} step="0.001" onChange={this.handleChange}></input>
        </form>
      </div>
    )
  }
}

export default SynthEdit;