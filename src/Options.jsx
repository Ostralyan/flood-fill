import React from 'react';

export default class Options extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.state.widthOfSquare = this.props.widthOfSquare
    this.state.squaresPerRow = this.props.squaresPerRow
    this.state.numberOfColors = this.props.numberOfColors
    this.state.includeDiagonals = this.props.includeDiagonals

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.props.onReset(
      this.state.widthOfSquare,
      this.state.squaresPerRow,
      this.state.numberOfColors,
      this.state.includeDiagonals,
    );

    event.preventDefault();
  }
  
  render() {
    return (
      <div>
        <p>
          Instructions: Click on any square.<br></br>
          <a href="https://github.com/ostralyan/flood-fill" target="_blank" rel="noopener noreferrer">Written by Luke Xu.</a>
        </p>
        <form onSubmit={this.handleSubmit}>
        <label>
          Width of square:
          <input type="number" name="widthOfSquare" value={this.state.widthOfSquare} onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Squares per row:
          <input type="number" name="squaresPerRow" value={this.state.squaresPerRow} onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Number of colors:
          <input type="number" name="numberOfColors" value={this.state.numberOfColors} onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Include diagonals:
          <input
            name="includeDiagonals"
            type="checkbox"
            checked={this.state.includeDiagonals}
            onChange={this.handleChange} />
        </label>
        <br></br>
        <input type="submit" value="Reset" />
      </form>
      <br></br>
    </div>
    );
  }
}

