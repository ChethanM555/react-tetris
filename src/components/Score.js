export default function Score({ score, level, lines }) {
  return (
    <>
      <div className="score grid-item">
        <h3>Score</h3>
        <p>{score}</p>
        <h3>Level</h3>
        <p>{level}</p>
        <h3>Lines</h3>
        <p>{lines(score)}</p>
      </div>
    </>
  );
}
