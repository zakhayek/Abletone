import React from 'react';

class DrumEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    this.props.setDrumParams(param, value)
  }

  render() {
    return (
      <div className="volume">
        <form className="sliders"> 
          <input type="range" name="hhOpenVol" min="-60" max="10" value={this.props.drumParams.hhOpenVol} step="0.05" onChange={this.handleChange}></input>
          <input type="range" name="hhClosedVol" min="-60" max="10" value={this.props.drumParams.hhClosedVol} step="0.05" onChange={this.handleChange}></input>
          <input type="range" name="snareVol" min="-60" max="10" value={this.props.drumParams.snareVol} step="0.05" onChange={this.handleChange}></input>
          <input type="range" name="kickVol" min="-60" max="10" value={this.props.drumParams.kickVol} step="0.05" onChange={this.handleChange}></input>
        </form>
      </div>
    )
  }
}

export default DrumEdit;