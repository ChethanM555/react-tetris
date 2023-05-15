import Score from "./Score";
import Grid from "./Grid";
import "./Tetris.css";
import { Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const shapes = ["I", "O", "T", "S", "Z", "J", "L"];
const colors = ["cyan", "yellow", "pink", "green", "red", "blue"];
const levels = [1, 2, 3, 4, 5];
const display_grid_dims = [6, 6];
const display_grid_rows = 6;
const display_grid_cols = 6;
const grid_dims = [25, 12];
const grid_rows = 25;
const grid_cols = 12;
const default_position = [-1, 5];

class ShapeView {
  constructor(shape, orientation, color, random = false) {
    this.shape = shape;
    this.orientation = orientation;
    this.color = color;
    if (random) {
      this.setRandomShape();
    }
  }

  setRandomShape() {
    this.shape = shapes[Math.floor(Math.random() * shapes.length)];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.orientation = Math.floor(Math.random() * 4);
  }
}

function getActivePositions(shapeView, position) {
  const active_positions = [];
  if (shapeView === null) return active_positions;
  switch (shapeView.shape) {
    case "I":
      switch (shapeView.orientation) {
        case 0:
        case 2:
          active_positions.push([position[0] - 1, position[1]]);
          active_positions.push(position);
          active_positions.push([position[0] + 1, position[1]]);
          active_positions.push([position[0] + 2, position[1]]);
          break;
        case 1:
        case 3:
          active_positions.push([position[0], position[1] - 1]);
          active_positions.push(position);
          active_positions.push([position[0], position[1] + 1]);
          active_positions.push([position[0], position[1] + 2]);
          break;
        default:
          break;
      }
      break;
    case "O":
      active_positions.push(position);
      active_positions.push([position[0], position[1] + 1]);
      active_positions.push([position[0] + 1, position[1]]);
      active_positions.push([position[0] + 1, position[1] + 1]);
      break;
    case "T":
      switch (shapeView.orientation) {
        case 0:
          active_positions.push(position);
          active_positions.push([position[0], position[1] + 1]);
          active_positions.push([position[0], position[1] + 2]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          break;
        case 1:
          active_positions.push([position[0] + 1, position[1]]);
          active_positions.push([position[0], position[1] + 1]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 2, position[1] + 1]);
          break;
        case 2:
          active_positions.push([position[0], position[1] + 1]);
          active_positions.push([position[0] + 1, position[1]]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 1, position[1] + 2]);
          break;
        case 3:
          active_positions.push(position);
          active_positions.push([position[0] + 1, position[1]]);
          active_positions.push([position[0] + 2, position[1]]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          break;
        default:
          break;
      }
      break;
    case "S":
      switch (shapeView.orientation) {
        case 0:
        case 2:
          active_positions.push(position);
          active_positions.push([position[0], position[1] + 1]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 2, position[1] + 1]);
          active_positions.push([position[0] + 2, position[1] + 2]);
          break;
        case 1:
        case 3:
          active_positions.push([position[0], position[1] + 2]);
          active_positions.push([position[0] + 1, position[1]]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 1, position[1] + 2]);
          active_positions.push([position[0] + 2, position[1]]);
          break;
        default:
          break;
      }
      break;
    case "Z":
      switch (shapeView.orientation) {
        case 0:
        case 2:
          active_positions.push(position);
          active_positions.push([position[0] + 1, position[1]]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 1, position[1] + 2]);
          active_positions.push([position[0] + 2, position[1] + 2]);
          break;
        case 1:
        case 3:
          active_positions.push([position[0], position[1] + 1]);
          active_positions.push([position[0], position[1] + 2]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 2, position[1]]);
          active_positions.push([position[0] + 2, position[1] + 1]);
          break;
        default:
          break;
      }
      break;
    case "J":
      switch (shapeView.orientation) {
        case 0:
          active_positions.push([position[0], position[1] + 1]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 2, position[1] + 1]);
          active_positions.push([position[0] + 2, position[1]]);
          break;
        case 1:
          active_positions.push(position);
          active_positions.push([position[0] + 1, position[1]]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 1, position[1] + 2]);
          break;
        case 2:
          active_positions.push([position[0], position[1] + 1]);
          active_positions.push([position[0], position[1] + 2]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 2, position[1] + 1]);
          break;
        case 3:
          active_positions.push([position[0] + 1, position[1]]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 1, position[1] + 2]);
          active_positions.push([position[0] + 2, position[1] + 2]);
          break;
        default:
          break;
      }
      break;
    case "L":
      switch (shapeView.orientation) {
        case 0:
          active_positions.push([position[0], position[1] + 1]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 2, position[1] + 1]);
          active_positions.push([position[0] + 2, position[1] + 2]);
          break;
        case 1:
          active_positions.push([position[0] + 1, position[1]]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 1, position[1] + 2]);
          active_positions.push([position[0] + 2, position[1]]);
          break;
        case 2:
          active_positions.push(position);
          active_positions.push([position[0], position[1] + 1]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 2, position[1] + 1]);
          break;
        case 3:
          active_positions.push([position[0], position[1] + 2]);
          active_positions.push([position[0] + 1, position[1]]);
          active_positions.push([position[0] + 1, position[1] + 1]);
          active_positions.push([position[0] + 1, position[1] + 2]);
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  return active_positions;
}

function canShapeBePlacedAtPosition(
  shapeView,
  position,
  prev_active_positions,
  grid_dims,
  grid
) {
  if (shapeView === null) return false;
  const active_positions = getActivePositions(shapeView, position);
  for (let i = 0; i < active_positions.length; i++) {
    if (
      active_positions[i][0] >= grid_dims[0] ||
      active_positions[i][1] >= grid_dims[1] ||
      active_positions[i][0] < 0 ||
      active_positions[i][1] < 0 ||
      grid[active_positions[i][0] * grid_dims[1] + active_positions[i][1]] !==
        "grey"
    ) {
      if (
        prev_active_positions.findIndex(
          (item) =>
            item[0] === active_positions[i][0] &&
            item[1] === active_positions[i][1]
        ) > -1
      ) {
        continue;
      }
      return false;
    }
  }
  return true;
}

function getLowestPosition(shapeView, position, grid_dims, grid) {
  let lowest_position = [grid_dims[0] - 1, position[1]];
  while (
    !canShapeBePlacedAtPosition(shapeView, lowest_position, [], grid_dims, grid)
  ) {
    lowest_position = [lowest_position[0] - 1, lowest_position[1]];
  }
  return lowest_position;
}

export default function Tetris() {
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(levels[0]);
  const [gameOver, setGameOver] = useState(false);
  const lines = (score) => Math.floor(score / 100);

  const [grid, setGrid] = useState(
    new Array(grid_rows * grid_cols).fill("grey")
  );
  const [position, setPosition] = useState(default_position);

  const [shape, setShape] = useState(null);
  const [nextShape, setNextShape] = useState(null);
  const [holdShape, setHoldShape] = useState(null);

  const toggleLevel = () => {
    const index = levels.indexOf(level);
    if (index === levels.length - 1) {
      setLevel(levels[0]);
    } else {
      setLevel(levels[index + 1]);
    }
  };

  function renderShape(
    shapeView,
    grid_dims,
    position,
    prev_active_positions = [],
    gridState = new Array(grid_dims[0] * grid_dims[1]).fill("grey"),
    setGridState = null
  ) {
    if (shapeView === null) {
      return gridState;
    } else {
      const newGridState = [...gridState];
      const active_positions = getActivePositions(shapeView, position);
      for (let i = 0; i < gridState.length; i++) {
        if (
          prev_active_positions.findIndex(
            (item) =>
              item[0] === Math.floor(i / grid_dims[1]) &&
              item[1] === i % grid_dims[1]
          ) > -1
        ) {
          newGridState[i] = "grey";
        }

        if (
          active_positions.findIndex(
            (item) =>
              item[0] === Math.floor(i / grid_dims[1]) &&
              item[1] === i % grid_dims[1]
          ) > -1
        ) {
          newGridState[i] = shapeView.color;
        }
      }
      if (setGridState != null) {
        setGridState(newGridState);
      }
      return newGridState;
    }
  }

  function clearLines(gridState) {
    const newGridState = [...gridState];
    let scoreIncrease = 0;
    for (let i = 0; i < grid_rows; i++) {
      let line = true;
      for (let j = 0; j < grid_cols; j++) {
        if (newGridState[i * grid_cols + j] === "grey") {
          line = false;
          break;
        }
      }
      if (line) {
        scoreIncrease += 100;
        for (let j = 0; j < grid_cols; j++) {
          newGridState[i * grid_cols + j] = "grey";
        }
        for (let k = i - 1; k >= 0; k--) {
          for (let j = 0; j < grid_cols; j++) {
            newGridState[(k + 1) * grid_cols + j] =
              newGridState[k * grid_cols + j];
          }
        }
      }
    }
    return { scoreIncrease, newGrid: newGridState };
  }

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        if (
          canShapeBePlacedAtPosition(
            shape,
            [position[0] + 1, position[1]],
            getActivePositions(shape, position),
            grid_dims,
            grid
          )
        ) {
          const renderedGrid = renderShape(
            shape,
            grid_dims,
            [position[0] + 1, position[1]],
            getActivePositions(shape, position),
            grid,
            setGrid
          );
          setPosition((prevPosition) => [prevPosition[0] + 1, prevPosition[1]]);
          const lowestPosition = getLowestPosition(
            shape,
            position,
            grid_dims,
            grid
          );
          if (
            lowestPosition[0] === position[0] &&
            lowestPosition[1] === position[1]
          ) {
            const { scoreIncrease, newGrid } = clearLines(renderedGrid);
            if (scoreIncrease > 0) {
              setScore((prevScore) => prevScore + scoreIncrease);
              setGrid(newGrid);
              setLevel((prevLevel) => prevLevel + 1);
            }
          }
        } else {
          if (
            position[0] === default_position[0] &&
            position[1] === default_position[1] &&
            shape != null
          ) {
            setGameOver(true);
            return;
          }

          if (nextShape === null) {
            setShape(new ShapeView(null, null, null, true));
          } else {
            setShape(nextShape);
          }
          setPosition(default_position);
          setNextShape(new ShapeView(null, null, null, true));
        }
      }, 500 / level);
      return () => clearInterval(interval);
    }
  }, [started, level, position, nextShape]);

  useEffect(() => {
    const keyListener = (event) => {
      let newShape = null;
      let newPosition = null;
      let lowestPosition = null;
      if (event.key === "ArrowRight") {
        newShape = new ShapeView(shape.shape, shape.orientation, shape.color);
        newPosition = [position[0], position[1] + 1];
      } else if (event.key === "ArrowLeft") {
        newShape = new ShapeView(shape.shape, shape.orientation, shape.color);
        newPosition = [position[0], position[1] - 1];
      } else if (event.key === "ArrowDown") {
        newShape = new ShapeView(shape.shape, shape.orientation, shape.color);
        newPosition = getLowestPosition(shape, position, grid_dims, grid);
        lowestPosition = newPosition;
      } else if (event.key === "a") {
        newShape = new ShapeView(
          shape.shape,
          (shape.orientation + 1) % 4,
          shape.color
        );
        newPosition = [...position];
      } else if (event.key === "d") {
        newShape = new ShapeView(
          shape.shape,
          (4 + shape.orientation - 1) % 4,
          shape.color
        );
        newPosition = [...position];
      } else if (event.key === "s") {
        if (holdShape === null) {
          newShape = nextShape;
          newPosition = [default_position[0] + 2, default_position[1]];
          setNextShape(new ShapeView(null, null, null, true));
          setHoldShape(shape);
        } else if (
          canShapeBePlacedAtPosition(
            holdShape,
            position,
            getActivePositions(shape, position),
            grid_dims,
            grid
          )
        ) {
          newShape = holdShape;
          newPosition = [...position];
          setHoldShape(shape);
        }
      } else {
        newShape = new ShapeView(shape.shape, shape.orientation, shape.color);
        newPosition = position;
      }

      if (
        (event.key === "ArrowRight" ||
          event.key === "ArrowLeft" ||
          event.key === "ArrowDown" ||
          event.key === "a" ||
          event.key === "d" ||
          event.key === "s") &&
        canShapeBePlacedAtPosition(
          newShape,
          newPosition,
          getActivePositions(shape, position),
          grid_dims,
          grid
        )
      ) {
        const renderedGrid = renderShape(
          newShape,
          grid_dims,
          newPosition,
          getActivePositions(shape, position),
          grid,
          setGrid
        );
        setShape(newShape);
        setPosition(newPosition);
        if (lowestPosition !== null) {
          const { scoreIncrease, newGrid } = clearLines(renderedGrid);
          if (scoreIncrease > 0) {
            setScore((prevScore) => prevScore + scoreIncrease);
            setGrid(newGrid);
          }
        }
      }
    };
    // add listners to keyboard keys
    if (started) {
      document.addEventListener("keyup", keyListener);
    }
    return () => {
      document.removeEventListener("keyup", keyListener);
    };
  }, [started, shape, position, grid]);

  const resetGame = () => {
    setGrid(new Array(grid_rows * grid_cols).fill("grey"));
    setShape(null);
    setPosition(default_position);
    setNextShape(null);
    setHoldShape(null);
    setScore(0);
    setLevel(1);
    setStarted(false);
    setGameOver(false);
  };

  return (
    <>
      <Container className="grid-container">
        <div className="grid-item">
          <h3>Hold</h3>
          <Grid
            rows={display_grid_rows}
            columns={display_grid_cols}
            gridState={renderShape(holdShape, display_grid_dims, [2, 2])}
          />
        </div>
        <div className="grid-item">
          {gameOver ? (
            <div className="menu">
              <h2>Game Over</h2>
              <Button variant="primary" onClick={resetGame}>
                Restart
              </Button>
            </div>
          ) : started ? (
            <Grid rows={grid_rows} columns={grid_cols} gridState={grid} />
          ) : (
            <div className="menu">
              <h2>Tetris</h2>
              <Button variant="primary" onClick={() => setStarted(true)}>
                Start
              </Button>
              <Button variant="primary" onClick={toggleLevel}>
                Level: {level}
              </Button>
            </div>
          )}
        </div>
        <div className="grid-item">
          <h3>Next</h3>
          <Grid
            rows={display_grid_rows}
            columns={display_grid_cols}
            gridState={renderShape(nextShape, display_grid_dims, [2, 2])}
          />
        </div>
        <Score score={score} lines={lines} level={level} />
      </Container>
    </>
  );
}
