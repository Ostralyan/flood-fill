# Flood fill in ReactJS

## To run locally
`cd .../flood-fill`

`npm run start`

## Using a recursive algorithm
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
