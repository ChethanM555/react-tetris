export default function Grid({
  rows,
  columns,
  renderShape,
  shapeView = null,
  position = [2, 2],
  gridState = null,
}) {
  //create a style with grid display
  const style = {
    display: "inline-grid",
    gridTemplateColumns: `repeat(${columns}, 20px)`,
    gridTemplateRows: `repeat(${rows}, 20px)`,
    margin: "10px auto",
  };

  const cells = [];
  for (let i = 0; i < gridState.length; i++) {
    cells.push(
      <div
        key={i}
        className="cell"
        style={{ backgroundColor: gridState[i] }}
      ></div>
    );
  }

  return (
    <div className="grid" style={style}>
      {cells}
    </div>
  );
}
