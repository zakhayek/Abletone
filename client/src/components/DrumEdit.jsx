import React from 'react';

class DrumEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hhOpenVol: 0.8,
      hhClosedVol: 1,
      snareVol: 8,
      kickVol: 8,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    this.setState({ [param]: value });
    this.props.setDrumParams(param, value)
  }

  render() {
    return (
      <div className="volume">
        <form className="sliders"> 
          <input type="range" name="hhOpenVol" min="-60" max="10" value={this.state.hhOpenVol} step="0.05" onChange={this.handleChange}></input>
          <input type="range" name="hhClosedVol" min="-60" max="10" value={this.state.hhClosedVol} step="0.05" onChange={this.handleChange}></input>
          <input type="range" name="snareVol" min="-60" max="10" value={this.state.snareVol} step="0.05" onChange={this.handleChange}></input>
          <input type="range" name="kickVol" min="-60" max="10" value={this.state.kickVol} step="0.05" onChange={this.handleChange}></input>
        </form>
      </div>
    )
  }
}

export default DrumEdit;