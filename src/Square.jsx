import React from 'react';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.color !== this.props.color) {
      return true;
    }

    return false;
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