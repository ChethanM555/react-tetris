export default function DisplayGrid({ shapeView }) {
  let shapes = ["I", "J", "L", "O", "T", "S", "Z"];
  // for each shape create grid dimensions
  let grid_dims = [
    [1, 4],
    [2, 3],
    [2, 3],
    [2, 2],
    [2, 3],
    [3, 3],
    [3, 3],
  ];
  let active_positions = [
    [[1, 1, 1, 1]],
    [
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
      [1, 0, 0],
    ],
  ];
  // for each shape create a grid
  let shape = null;
  let cells = [];
  let grid_dim = [0, 0];
  if (shapeView !== null) {
    for (var i = 0; i < shapes.length; i++) {
      if (shapes[i] === shapeView.shape) {
        grid_dim = grid_dims[i];
        cells = active_positions[i].map((row, row_index) => {
          return row.map((cell, col_index) => {
            if (cell === 1) {
              return (
                <div
                  className="rounded-sm cell-small cell-border"
                  style={{ background: shapeView.color }}
                  key={row_index * grid_dim[1] + col_index}
                ></div>
              );
            } else {
              return (
                <div
                  className="rounded-sm cell"
                  key={row_index * grid_dim[1] + col_index}
                ></div>
              );
            }
          });
        });
      }
    }
  }
  shape = (
    <div
      style={{
        display: "grid",
        gridTemplate: `repeat(${grid_dim[0]}, 1fr) / repeat(${grid_dim[1]}, 1fr)`,
        justifyItems: "center",
        alignItems: "center",
        gap: "2px",
      }}
    >
      {cells}
    </div>
  );

  return shape;
}
