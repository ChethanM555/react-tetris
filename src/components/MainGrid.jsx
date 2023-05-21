export default function MainGrid({ grid_dims, grid_state }) {
  var rows = grid_dims[0];
  var cols = grid_dims[1];

  var style = {
    display: "grid",
    gridTemplate: `repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`,
    height: rows * 1.5 + "rem",
    width: cols * 1.5 + "rem",
    padding: "10px",
  };
  var cells = [];
  for (var i = 0; i < rows * cols; i++) {
    //get random number between 0 and 1
    if (grid_state[i] !== "grey") {
      cells.push(
        <div
          className="rounded-sm cell cell-border"
          style={{ background: grid_state[i] }}
          key={i}
        ></div>
      );
    } else {
      cells.push(
        <div
          className="rounded-sm cell d-flex justify-content-center align-items-center"
          key={i}
        >
          <div
            style={{ height: "3px", width: "3px", background: "grey" }}
          ></div>
        </div>
      );
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center p-2">
      <div style={style}>{cells}</div>
    </div>
  );
}
