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
        backgroundColor: this.props.color
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

        this.state.colors = [];
        // refactor this when there are forms
        for(let i = 0; i < 5; i++) {
            this.state.colors[i] = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        }
        this.state.squares = [
            [
              {
                  color: this.getColor(),
                  visited: false,
              },
              {
                  color: this.getColor(),
                  visited: false,
              },
              {
                  color: this.getColor(),
                  visited: false,
              },
            ],
            [
              {
                  color: this.getColor(),
                  visited: false,
              },
              {
                  color: this.getColor(),
                  visited: false,
              },
              {
                  color: this.getColor(),
                  visited: false,
              },
            ],
            [
              {
                  color: this.getColor(),
                  visited: false,
              },
              {
                  color: this.getColor(),
                  visited: false,
              },
              {
                  color: this.getColor(),
                  visited: false,
              },
            ]
        ]
    }

    floodFill(i, j) {
        const oldColor = this.state.squares[i][j].color;
        const newColor = this.getColor();
        const squares = this.state.squares.slice();

        this.getNextFloodFillState(squares, i, j, oldColor, newColor);
        this.clearVisisted(squares);
        this.setState({squares: squares});
    }

    clearVisisted(squares) {
        for(let i = 0; i < squares.length; i++) {
            for(let j = 0; j < squares[i].length; j++) {
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
        const numberBetweenZeroAndFour = Math.floor((Math.random() * 5));
        return this.state.colors[numberBetweenZeroAndFour];
    }

    renderSquare(i, j) {
      return <Square 
            color={this.state.squares[i][j].color}
            onClick={() => this.floodFill(i, j)}
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <p>
                Instructions: Click on any square.
            </p>
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  