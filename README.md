# Flood fill in ReactJS

## To run locally
`cd .../flood-fill`

`npm run start`

go to `http://localhost:3000`

## Using a recursive algorithm
In this approach we mark all the squares that we've visited using depth first search so if we ever visit the square again we'll know to skip it.

```javascript
  floodFill(i, j) {
    const oldColor = this.props.squares[i][j].color;
    const newColor = this.getUniqueRandomColor(oldColor);
    const squares = this.props.squares.slice();

    this.floodFillHelper(squares, i, j, oldColor, newColor);
    this.clearVisisted(squares);
    this.setState({ squares: squares });
  }

  floodFillHelper(squares, i, j, oldColor, newColor) {
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
    this.floodFillHelper(squares, i + 1, j, oldColor, newColor);
    this.floodFillHelper(squares, i - 1, j, oldColor, newColor);
    this.floodFillHelper(squares, i, j + 1, oldColor, newColor);
    this.floodFillHelper(squares, i, j - 1, oldColor, newColor);
  }
```

## An iterative approach

```javascript
  floodFill(i, j) {
    const oldColor = this.props.squares[i][j].color;
    const newColor = this.getUniqueRandomColor(oldColor);
    const squares = this.props.squares.slice();

    const stack = [
      [i, j]
    ];
    while (stack.length) {
      const squareCoordinates = stack.pop();
      
      Array.prototype.push.apply(stack, this.floodFillHelper(squares, squareCoordinates[0], squareCoordinates[1], oldColor));
      squares[squareCoordinates[0]][squareCoordinates[1]].visited = true;
      squares[squareCoordinates[0]][squareCoordinates[1]].color = newColor;
    }
    this.clearVisisted(squares);
    this.setState({ squares });
  }

  floodFillHelper(squares, i, j, oldColor) {
    const viableSquares = []

    if (i - 1 >= 0 && squares[i - 1][j].color === oldColor && !squares[i - 1][j].visited) {
      viableSquares.push([i - 1, j]);
    }
    if (i + 1 < this.props.squaresPerRow && squares[i + 1][j].color === oldColor && !squares[i + 1][j].visited) {
      viableSquares.push([i + 1, j]);
    }
    if (j - 1 >= 0 && squares[i][j - 1].color === oldColor && !squares[i][j - 1].visited) {
      viableSquares.push([i, j - 1]);
    }
    if (j + 1 < this.props.squaresPerRow && squares[i][j + 1].color === oldColor && !squares[i][j + 1].visited) {
      viableSquares.push([i, j + 1]);
    }
    return viableSquares;
  }
```

## Additional Optimizations
Whenever we try to perform the flood fill algorithm on a given square. We only need to modify the color of the squares that are of same color as the original square.
Therefore, we do not need to rerender every square but only the squares that have been modified.

```javascript
  shouldComponentUpdate(nextProps) {
    if (nextProps.color !== this.props.color) {
      return true;
    }

    return false;
  }
```
