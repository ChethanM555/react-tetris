import "./Tetris.css";
import { Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import DisplayGrid from "./DisplayGrid";
import MainGrid from "./MainGrid";

const shapes = ["I", "O", "T", "S", "Z", "J", "L"];
const grid_dims = [14, 10];
const grid_rows = 14;
const grid_cols = 10;
const default_position = [-1, 4];

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
          active_positions.push([position[0] + 1, position[1] + 2]);
          break;
        case 1:
        case 3:
          active_positions.push([position[0], position[1] + 1]);
          active_positions.push([position[0] + 1, position[1]]);
          active_positions.push([position[0] + 1, position[1] + 1]);
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
          active_positions.push([position[0] + 2, position[1] + 1]);
          break;
        case 1:
        case 3:
          active_positions.push([position[0], position[1] + 1]);
          active_positions.push([position[0], position[1] + 2]);
          active_positions.push([position[0] + 1, position[1]]);
          active_positions.push([position[0] + 1, position[1] + 1]);
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
  let lowest_position = [position[0] + 1, position[1]];
  while (
    canShapeBePlacedAtPosition(
      shapeView,
      lowest_position,
      getActivePositions(shapeView, position),
      grid_dims,
      grid
    )
  ) {
    lowest_position = [lowest_position[0] + 1, lowest_position[1]];
  }
  return [lowest_position[0] - 1, lowest_position[1]];
}

export default function Tetris({ theme }) {
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
      this.orientation = 0;
    }
  }

  var cell_color = theme === "light" ? "#1E2428" : "#EDEAE9";
  const colors = [
    "#FBCE05",
    "#43D462",
    "#3D76B5",
    "#FF0128",
    "#52B0FD",
    "#A369B8",
    cell_color,
  ];

  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [grid, setGrid] = useState(
    new Array(grid_rows * grid_cols).fill("grey")
  );
  const [position, setPosition] = useState(default_position);

  const [shape, setShape] = useState(null);
  const [nextShape, setNextShape] = useState(null);
  const [holdShape, setHoldShape] = useState(null);

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
      }, 500 / parseInt((score + 500) / 500));
      return () => clearInterval(interval);
    }
  }, [started, position, nextShape]);

  const keyListener = (event) => {
    if (!started) return;
    let newShape = null;
    let newPosition = null;
    let lowestPosition = null;
    if (event.key === "ArrowRight" || event.currentTarget.id === "right") {
      newShape = new ShapeView(shape.shape, shape.orientation, shape.color);
      newPosition = [position[0], position[1] + 1];
      document.getElementById("right").classList.add("pressed");
    } else if (event.key === "ArrowLeft" || event.currentTarget.id === "left") {
      newShape = new ShapeView(shape.shape, shape.orientation, shape.color);
      newPosition = [position[0], position[1] - 1];
      document.getElementById("left").classList.add("pressed");
    } else if (event.key === "ArrowDown" || event.currentTarget.id === "down") {
      newShape = new ShapeView(shape.shape, shape.orientation, shape.color);
      newPosition = getLowestPosition(shape, position, grid_dims, grid);
      lowestPosition = newPosition;
      document.getElementById("down").classList.add("pressed");
    } else if (event.key === "ArrowUp" || event.currentTarget.id === "up") {
      document.getElementById("up").classList.add("pressed");
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
    } else if (event.key === " " || event.currentTarget.id === "space") {
      event.preventDefault();
      document.getElementById("space").classList.add("pressed");
      newShape = new ShapeView(
        shape.shape,
        (4 + shape.orientation - 1) % 4,
        shape.color
      );
      newPosition = [...position];
    } else {
      newShape = new ShapeView(shape.shape, shape.orientation, shape.color);
      newPosition = position;
    }

    if (
      (event.key === "ArrowRight" ||
        event.currentTarget.id === "right" ||
        event.key === "ArrowLeft" ||
        event.currentTarget.id === "left" ||
        event.key === "ArrowDown" ||
        event.currentTarget.id === "down" ||
        event.key === "ArrowUp" ||
        event.currentTarget.id === "up" ||
        event.key === " " ||
        event.currentTarget.id === "space") &&
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

  useEffect(() => {
    // add listners to keyboard keys
    document.addEventListener("keydown", keyListener);
    return () => {
      document.removeEventListener("keydown", keyListener);
    };
  }, [started, shape, position, grid]);

  useEffect(() => {
    document.addEventListener("keyup", (event) => {
      if (event.key === "ArrowRight") {
        document.getElementById("right").classList.remove("pressed");
      } else if (event.key === "ArrowLeft") {
        document.getElementById("left").classList.remove("pressed");
      } else if (event.key === "ArrowDown") {
        document.getElementById("down").classList.remove("pressed");
      } else if (event.key === "ArrowUp") {
        document.getElementById("up").classList.remove("pressed");
      } else if (event.key === " ") {
        document.getElementById("space").classList.remove("pressed");
      }
    });
  });

  const resetGame = () => {
    setGrid(new Array(grid_rows * grid_cols).fill("grey"));
    setShape(null);
    setPosition(default_position);
    setNextShape(null);
    setHoldShape(null);
    setScore(0);
    setStarted(true);
    setGameOver(false);
  };

  const handleMouseUp = (event) => {
    document.getElementById(event.currentTarget.id).classList.remove("pressed");
  };

  const buttonStyleClass = `rounded-circle p-3 action-btn arrow-btn ${
    theme === "light" ? "" : "dark"
  }`;

  return (
    <>
      <Container id="tetris" className={theme === "light" ? "" : "dark"}>
        <div
          className={
            theme === "light" ? "grid-container" : "grid-container dark"
          }
        >
          <div>NEXT</div>
          <div>HOLD</div>
          <div>SCORE</div>
          <div className="d-flex justify-content-around align-items-center">
            <DisplayGrid shapeView={holdShape} theme={theme} />
            <DisplayGrid shapeView={nextShape} theme={theme} />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            {score}
          </div>
          <div>
            {gameOver ? (
              <div className="menu">
                <h2>Game Over</h2>
                <Button
                  variant={theme === "light" ? "outline-dark" : "outline-light"}
                  onClick={resetGame}
                >
                  RESTART
                </Button>
              </div>
            ) : started ? (
              <MainGrid grid_dims={grid_dims} grid_state={grid} theme={theme} />
            ) : (
              <div className="menu">
                <h2>Tetris</h2>
                <Button
                  variant={theme === "light" ? "outline-dark" : "outline-light"}
                  onClick={() => setStarted(true)}
                >
                  START
                </Button>
              </div>
            )}
          </div>
          <div className="btn-grp">
            <button
              className={buttonStyleClass}
              id="up"
              onMouseDown={keyListener}
              onMouseUp={handleMouseUp}
            >
              <img
                src="https://img.icons8.com/ios-filled/50/chevron-left.png"
                alt="up"
              />
            </button>
            <button
              className={buttonStyleClass}
              id="left"
              onMouseDown={keyListener}
              onMouseUp={handleMouseUp}
            >
              <img
                src="https://img.icons8.com/ios-filled/50/chevron-left.png"
                alt="left"
              />
            </button>
            <button
              className={buttonStyleClass}
              id="right"
              onMouseDown={keyListener}
              onMouseUp={handleMouseUp}
            >
              <img
                src="https://img.icons8.com/ios-filled/50/chevron-left.png"
                alt="right"
              />
            </button>
            <button
              className={buttonStyleClass}
              id="down"
              onMouseDown={keyListener}
              onMouseUp={handleMouseUp}
            >
              <img
                src="https://img.icons8.com/ios-filled/50/chevron-left.png"
                alt="down"
              />
            </button>
          </div>
          <div>
            <button
              className={`rounded-circle p-3 mt-3 action-btn rotate-btn ${
                theme === "light" ? "" : "dark"
              }`}
              id="space"
              onMouseDown={keyListener}
              onMouseUp={handleMouseUp}
            >
              <img
                height={30}
                width={30}
                src="https://img.icons8.com/tiny-glyph/64/rotate.png"
                alt="rotate"
              />
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}
