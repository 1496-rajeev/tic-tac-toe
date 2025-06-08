import { useState } from "react";
import "./App.css";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 5, 6], // diagonals
  ];

  const winner = calculateWinner(squares);

  function calculateWinner(squares: (string | null)[]) {
    for (const [a, b, c] of winningCombinations) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(index: number) {
    if (squares[index] || winner) return; // if already filled or game over

    const newSquares = [...squares];
    newSquares[index] = xIsNext ? "X" : "O";

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "It's a Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div>
      <div className="status">{status}</div>
      <button onClick={resetGame}>Restart</button>
      <div className="board">
        {squares.map((value, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
