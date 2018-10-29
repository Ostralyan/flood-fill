import React from 'react';

export class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const divStyle = {
      backgroundColor: this.props.color,
      height: this.props.widthOfSquare + "px",
      width: this.props.widthOfSquare + "px",
      lineHeight: this.props.widthOfSquare + "px",
    }
    return (
      <button
        className="square"
        style={divStyle}
        onClick={() => this.props.onClick()}>
      </button>
    );
  }
}