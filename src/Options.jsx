import React from 'react';

export default class Options extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.state.widthOfSquare = 5;
    this.state.squaresPerRow = 20;
    this.state.numberOfColors = 3;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.onReset(
      this.state.widthOfSquare,
      this.state.squaresPerRow,
      this.state.numberOfColors
    );

    event.preventDefault();
  }
  
  render() {
    return (
      <div>
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
        <input type="submit" value="Reset" /> (Work In Progress)
      </form>
      <p>
        Instructions: Click on any square.<br></br>
        <a href="https://github.com/ostralyan/flood-fill" target="_blank" rel="noopener noreferrer">Written by Luke Xu.</a>
      </p>
    </div>
    );
  }
}

