export default function Logs({ turns }) {
  return (
    <>
      <ol id="log">
        <h2>Player Logs</h2>
        {turns.map((turn) => (
          <li key={`${turn.square.row}${turn.square.col}`}>
            {turn.player} selected {turn.square.row},{turn.square.col}
          </li>
        ))}
      </ol>
    </>
  );
}