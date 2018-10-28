import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const divStyle = {
      backgroundColor: this.props.color,
      height: this.props.widthOfSquare,
      width: this.props.widthOfSquare,
      lineHeight: this.props.widthOfSquare,
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

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.state.colors = this.generateColors();
    this.state.squares = this.generateSquares();
  }

  generateColors() {
    const colors = [];
    for (let i = 0; i < this.props.numberOfColors; i++) {
      colors[i] = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
    return colors;
  }

  generateSquares() {
    const squares = []
    for(let i = 0; i < this.props.squaresPerRow; i++) {
      squares[i] = [];
      for(let j = 0; j < this.props.squaresPerRow; j++) {
        squares[i][j] = {
          color: this.getColor(),
          visited: false
        }
      }
    }
    return squares;
  }

  floodFill(i, j) {
    const oldColor = this.state.squares[i][j].color;
    const newColor = this.getColor();
    const squares = this.state.squares.slice();

    this.getNextFloodFillState(squares, i, j, oldColor, newColor);
    this.clearVisisted(squares);
    this.setState({ squares: squares });
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
    if (i < 0 || i > 2) return;
    if (j < 0 || j > 2) return;
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

  getColor() {
    const numberBetweenZeroAndFour = Math.floor((Math.random() * this.props.numberOfColors));
    return this.state.colors[numberBetweenZeroAndFour];
  }

  renderSquare(i, j) {
    return <Square
      color={this.state.squares[i][j].color}
      onClick={() => this.floodFill(i, j)}
      widthOfSquare={this.props.widthOfSquare}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
        </div>
        <div className="board-row">
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.widthOfSquare = 50;
    this.state.squaresPerRow = 3;
    this.state.numberOfColors = 3;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.widthOfSquare);
    console.log(this.state.squaresPerRow);
    console.log(this.state.numberOfColors);
    event.preventDefault();
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
            <input type="submit" value="Reset" />
          </form>
          <p>
            Instructions: Click on any square.
          </p>
          <Board 
            widthOfSquare={this.state.widthOfSquare}
            squaresPerRow={this.state.squaresPerRow}
            numberOfColors={this.state.numberOfColors}
          />
        </div>
        <div className="game-info">
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
