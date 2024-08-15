import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Logs from "./components/Logs.jsx";
import GameOver from "./components/GameOver.jsx"
import { WINNING_COMBINATIONS } from "./winning-combinations.js"; 

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurn) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurn) {
    const { square, player } = turn; // this is the object destructuring so we can get the symbol of player and the coordinates of the player
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = derivedActivePlayer(gameTurn); //using the gameTurn state to derive the current active player which reducess the no. of state which is being managed.
  const gameBoard = deriveGameBoard(gameTurn);  
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurn((prevTurns) => { 
      // let currentPlayer = 'X';
      // if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
      //   currentPlayer = 'O';
      // }
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    }); 
  }

  function handleRestart() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            intitalName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            intitalName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Logs turns={gameTurn} />
    </main>
  );
}

export default App;
