import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  floodFillRecursive(i, j) {
    const oldColor = this.props.squares[i][j].color;
    const newColor = this.getUniqueRandomColor(oldColor);
    const squares = this.props.squares.slice();

    this.floodFillHelper(squares, i, j, oldColor, newColor);
    this.clearVisisted(squares);
    this.setState({ squares: squares });
  }

  floodFillRecursiveHelper(squares, i, j, oldColor, newColor) {
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
    this.floodFillRecursiveHelper(squares, i + 1, j, oldColor, newColor);
    this.floodFillRecursiveHelper(squares, i - 1, j, oldColor, newColor);
    this.floodFillRecursiveHelper(squares, i, j + 1, oldColor, newColor);
    this.floodFillRecursiveHelper(squares, i, j - 1, oldColor, newColor);

    if (this.props.includeDiagonals) {
      this.floodFillRecursiveHelper(squares, i + 1, j + 1, oldColor, newColor);
      this.floodFillRecursiveHelper(squares, i - 1, j + 1, oldColor, newColor);
      this.floodFillRecursiveHelper(squares, i + 1, j + 1, oldColor, newColor);
      this.floodFillRecursiveHelper(squares, i - 1, j - 1, oldColor, newColor);
    }
  }

  floodFillIterative(i, j) {
    const oldColor = this.props.squares[i][j].color;
    const newColor = this.getUniqueRandomColor(oldColor);
    const squares = this.props.squares.slice();

    const stack = [
      [i, j]
    ];
    while (stack.length) {
      const squareCoordinates = stack.pop();
      let newI = squareCoordinates[0];
      let newJ = squareCoordinates[1];

      if (newI < 0 || newI >= this.props.squaresPerRow) continue;
      if (newJ < 0 || newJ >= this.props.squaresPerRow) continue;
      let nextSquare = squares[newI][newJ];

      if (nextSquare.color !== oldColor) continue;
      if (nextSquare.visited) continue;

      Array.prototype.push.apply(stack, [
        [newI - 1, newJ],
        [newI + 1, newJ],
        [newI, newJ - 1],
        [newI, newJ + 1],
      ]);

      if (this.props.includeDiagonals) {
        Array.prototype.push.apply(stack, [
          [newI - 1, newJ - 1],
          [newI + 1, newJ - 1],
          [newI - 1, newJ + 1],
          [newI + 1, newJ + 1],
        ]);
      }

      nextSquare.visited = true;
      nextSquare.color = newColor;
    }
    this.setState({ squares });
    this.clearVisisted(squares);
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

  renderSquare(i, j) {
    return <Square
      color={this.props.squares[i][j].color}
      onClick={() => this.floodFillIterative(i, j)}
      widthOfSquare={this.props.widthOfSquare}
      key={i + "," + j}
    />;
  }

  createTable() {
    let table = []
    
    for (let i = 0; i < this.props.squaresPerRow; i++) {
      let children = []
      // Inner loop to create children
      for (let j = 0; j < this.props.squaresPerRow; j++) {
        children.push(this.renderSquare(i, j))
      }
      // Create the parent and add the children
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