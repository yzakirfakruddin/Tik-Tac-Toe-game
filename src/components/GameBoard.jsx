// const initialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];

export default function GameBoard({ onSelectSquare, board }) {
  // let gameBoard = initialGameBoard;

  // for (const turn of turns) {
  //   const { square, player } = turn; // this is the object destructuring so we can get the symbol of player and the coordinates of the player
  //   const { row, col } = square;

  //   gameBoard[row][col] = player;
  // }

//the below code is the older code where we reqired to use "useState" in this component too, but now we can manage with a state which is used in the parent folder.
  // const [gameBoard, setGameBorad] = useState(initialGameBoard);
  // function handleSelectSquare(rowIndex, colIndex) {
  //   setGameBorad((prevGameBoard) => {
  //     const updatedGameBoard = [
  //       ...prevGameBoard.map((initialArray) => [...initialArray]),
  //     ];
  //     updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedGameBoard;
  //   });
  //   onSelectSquare();
  // }

  return (
    <>
      <ol id="game-board">
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button
                    onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={ playerSymbol === null ? false : true}>
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}