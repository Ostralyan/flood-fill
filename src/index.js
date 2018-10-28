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
        <button className="square" style={divStyle}>    
          {/* TODO */}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          squares: [
              [
                {
                    color: this.getColor()
                },
                {
                    color: this.getColor()
                },
                {
                    color: this.getColor()
                },
              ],
              [
                {
                    color: this.getColor()
                },
                {
                    color: this.getColor()
                },
                {
                    color: this.getColor()
                },
              ],
              [
                {
                    color: this.getColor()
                },
                {
                    color: this.getColor()
                },
                {
                    color: this.getColor()
                },
              ]
          ]
        };
    }

    getColor() {
        const numberBetweenZeroAndFour = Math.floor((Math.random() * 5));

        switch(numberBetweenZeroAndFour) {
            case 0: 
                return "#e4b8bc";
            case 1: 
                return "#6e4646";
            case 2: 
                return "#6ad720";
            case 3: 
                return "#655dc8";
            case 4: 
                return "#fd099d";
            default:
                throw new Error("No color to be found")
        }
    }

    renderSquare(i, j) {
      return <Square color={this.state.squares[i][j].color}/>;
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
  