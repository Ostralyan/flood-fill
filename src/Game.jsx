import React from 'react';
import Board from './Board';
import Options from './Options';
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.widthOfSquare = 5;
    this.state.squaresPerRow = 20;
    this.state.numberOfColors = 3;

    this.state.colors = this.generateColors(this.state.numberOfColors);
    this.state.squares = this.generateSquares(
      this.state.colors,
      this.state.squaresPerRow,
      this.state.numberOfColors
    );

    this.resetBoard = this.resetBoard.bind(this);

  }

  resetBoard(widthOfSquare, squaresPerRow, numberOfColors) {
    const colors = this.generateColors(numberOfColors);

    const state = {
      widthOfSquare,
      squaresPerRow,
      numberOfColors,
      colors: colors,
      squares: this.generateSquares(colors, squaresPerRow, numberOfColors)
    }
    
    this.setState(state);
  }

  generateColors(numberOfColors) {
    const colors = [];
    for (let i = 0; i < numberOfColors; i++) {
      colors[i] = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
    return colors;
  }

  generateSquares(colors, squaresPerRow, numberOfColors) {
    const squares = []
    for(let i = 0; i < squaresPerRow; i++) {
      squares[i] = [];
      for(let j = 0; j < squaresPerRow; j++) {
        squares[i][j] = {
          color: this.getColor(colors, numberOfColors),
          visited: false
        }
      }
    }
    return squares;
  }

  getColor(colors, numberOfColors) {
    const numberBetweenZeroAndFour = Math.floor((Math.random() * numberOfColors));
    return colors[numberBetweenZeroAndFour];
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Options
            onReset={this.resetBoard}
          />
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
