import { useState, useTransition } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [moveAdjacent, setMoveAdjacent] = useState(false);
  const [prevSquare, setPrevSquare] = useState(null);

  const xCount = squares.filter((i) => i == 'X').length;
  const oCount = squares.filter((i) => i == 'O').length;

  function handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }

    if (squares[i] && (xCount < 3 || oCount < 3)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      if (xCount < 3) {
        if (moveAdjacent) {
          if (checkValid(i, prevSquare)) {
            nextSquares[i] = 'X';
            if (squares[4] == 'X' && nextSquares[4] == 'X' && !calculateWinner(nextSquares)) {
              nextSquares[prevSquare] = 'X';
              nextSquares[i] = null;
              setSquares(nextSquares);
              return;
            }
            setXIsNext(!xIsNext);
          }
          else {
            return;
          }
        }
        else {
          nextSquares[i] = 'X';
          setXIsNext(!xIsNext);
        }
      }
      else if (nextSquares[i] == 'X') {
        nextSquares[i] = null;
        setMoveAdjacent(true);
        setPrevSquare(i);
      }

    }
    else {
      if (oCount < 3) {
        if (moveAdjacent) {
          if (checkValid(i, prevSquare)) {
            nextSquares[i] = 'O';
            if (squares[4] == 'O' && nextSquares[4] == 'O' && !calculateWinner(nextSquares)) {
              nextSquares[prevSquare] = 'O';
              nextSquares[i] = null;
              setSquares(nextSquares);
              return;
            }
            setXIsNext(!xIsNext);
          }
          else {
            return;
          }
        }
        else {
          nextSquares[i] = 'O';
          setXIsNext(!xIsNext);
        }
      }
      else if (nextSquares[i] == 'O') {
        nextSquares[i] = null;
        setMoveAdjacent(true);
        setPrevSquare(i);
      }
    }

    setSquares(nextSquares);
  }

  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  }
  else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function checkValid(index, previous) {
  if (index == previous) {
    return false;
  }
  if (index == 0 && (previous == 1 || previous == 3 || previous == 4)) {
    return true;
  }
  if (index == 1 && (previous == 0 || previous == 2 || previous == 3 || previous == 4 || previous == 5)) {
    return true;
  }
  if (index == 2 && (previous == 1 || previous == 4 || previous == 5)) {
    return true;
  }
  if (index == 3 && (previous == 0 || previous == 1 || previous == 4 || previous == 6 || previous == 7)) {
    return true;
  }
  if (index == 4 && (previous == 0 || previous == 1 || previous == 2 || previous == 3 || previous == 5 || previous == 6 || previous == 7 || previous == 8)) {
    return true;
  }
  if (index == 5 && (previous == 1 || previous == 2 || previous == 4 || previous == 7 || previous == 8)) {
    return true;
  }
  if (index == 6 && (previous == 3 || previous == 4 || previous == 7)) {
    return true;
  }
  if (index == 7 && (previous == 3 || previous == 4 || previous == 5 || previous == 6 || previous == 8)) {
    return true;
  }
  if (index == 8 && (previous == 4 || previous == 5 || previous == 7)) {
    return true;
  }

  return false;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}