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
The recursive solution is a much cleaner approach but it is limited by stack space. After about ~10,000 squares, we start to run into stack overflow problems. To solve that issue we can write an iterative solution so that we are no longer dependent on stack space.
```javascript
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
      nextSquare.visited = true;
      nextSquare.color = newColor;
    }
    this.setState({ squares });
    this.clearVisisted(squares);
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
