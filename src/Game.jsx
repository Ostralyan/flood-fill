import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.widthOfSquare = 10;
    this.state.squaresPerRow = 100;
    this.state.numberOfColors = 2;

    this.state.colors = this.generateColors();
    this.state.squares = this.generateSquares();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const newState = {
      squares: this.generateSquares(),
      colors: this.generateColors()
    }
    this.setState(newState);
    event.preventDefault();
  }

  generateColors() {
    const colors = [];
    for (let i = 0; i < this.state.numberOfColors; i++) {
      colors[i] = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
    return colors;
  }

  generateSquares() {
    const squares = []
    for(let i = 0; i < this.state.squaresPerRow; i++) {
      squares[i] = [];
      for(let j = 0; j < this.state.squaresPerRow; j++) {
        squares[i][j] = {
          color: this.getColor(),
          visited: false
        }
      }
    }
    return squares;
  }

  getColor() {
    const numberBetweenZeroAndFour = Math.floor((Math.random() * this.state.numberOfColors));
    return this.state.colors[numberBetweenZeroAndFour];
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
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
          <Board 
            widthOfSquare={this.state.widthOfSquare}
            squaresPerRow={this.state.squaresPerRow}
            numberOfColors={this.state.numberOfColors}
            squares={this.state.squares}
            colors={this.state.colors}
          />
        </div>
      </div>
    );
  }
}
