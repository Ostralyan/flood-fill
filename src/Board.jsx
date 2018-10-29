import React from 'react';
import { Square } from './Square.jsx';

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  floodFill(i, j) {
    const oldColor = this.props.squares[i][j].color;
    const newColor = this.getUniqueRandomColor(oldColor);
    const squares = this.props.squares.slice();

    this.getNextFloodFillState(squares, i, j, oldColor, newColor);
    this.clearVisisted(squares);
    this.setState({ squares: squares });
  }

  getUniqueRandomColor(color) {
    const numberBetweenZeroAndFour = Math.floor((Math.random() * this.props.numberOfColors));
    if (color === this.props.colors[numberBetweenZeroAndFour]) {
      return this.getUniqueRandomColor(color);
    } else {
      return this.props.colors[numberBetweenZeroAndFour];
    }
  }

  clearVisisted(squares) {
    for (let i = 0; i < squares.length; i++) {
      for (let j = 0; j < squares[i].length; j++) {
        squares[i][j].visited = false;
      }
    }
  }

  getNextFloodFillState(squares, i, j, oldColor, newColor) {
    // check out of bounds
    if (i < 0 || i > this.props.squaresPerRow - 1) return;
    if (j < 0 || j > this.props.squaresPerRow - 1) return;
    // check if it's visited
    if (squares[i][j].visited) return;
    // Indicate node has been visited
    squares[i][j].visited = true;
    // check if it's same color
    if (squares[i][j].color !== oldColor) return;
    // set the current color to the new color and mark node as visited.
    squares[i][j].color = newColor;
    // recurse through up, down, left, right boxes.
    this.getNextFloodFillState(squares, i + 1, j, oldColor, newColor);
    this.getNextFloodFillState(squares, i - 1, j, oldColor, newColor);
    this.getNextFloodFillState(squares, i, j + 1, oldColor, newColor);
    this.getNextFloodFillState(squares, i, j - 1, oldColor, newColor);
  }

  renderSquare(i, j) {
    return <Square
      color={this.props.squares[i][j].color}
      onClick={() => this.floodFill(i, j)}
      widthOfSquare={this.props.widthOfSquare}
      key={i + "," + j}
    />;
  }

  createTable() {
    let table = []
    
    for (let i = 0; i < this.props.squaresPerRow; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < this.props.squaresPerRow; j++) {
        children.push(this.renderSquare(i, j))
      }
      //Create the parent and add the children
      table.push(<div className="board-row" key={i}>{children}</div>)
    }
    return table
  }

  render() {
    return (
      <div>
        {this.createTable()}
      </div>
    );
  }
}