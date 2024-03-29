// Importing the 'useState' hook from React
import { useState } from 'react';

// Square component representing an individual square in the game
function Square({ value, onSquareClick }) {
  return (
    // Button jsx element representing the square (<button>), with a CSS class(className="square") 
    //and an onClick event handler(onClick={onSquareClick})
    <button className="square" onClick={onSquareClick}>
      {value} {/* Displaying the value ('X', 'O', or null) inside the button */}
    </button>
  );
}

function calculateWinner(squares) {
  //An array lines containing arrays, where each inner array represents the indices of three squares
  //that form a winning line on the Tic Tac Toe board.
  const lines = [
    //Horizontal wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Vertical wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonal wins
    [0, 4, 8],
    [2, 4, 6],
  ];
  //A loop that iterates through each winning line in the lines array.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  //Returns null when no winning combination is found
  return null;
}


// Board component representing the game board
//xIsNext: a boolean value that represents whether it is the X player's turn
//squares: array of square values on the game board ('X','O', or 'null')
//onPlay: function called when a player makes a move
function Board({ xIsNext, squares, onPlay }) {
  // Function to handle a click on a square, updating the board's state
  function handleClick(i) {
    // Check if there is a winner or if the square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Create a copy of the current squares array using a built-in JS array method 'slice()'
    //This way we ensure that the modification made to 'next squares do not affect the original 'squares'
    const nextSquares = squares.slice();

    // Set the value of the clicked square based on whose turn it is
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    // Call the onPlay function with the updated squares array
    onPlay(nextSquares);
  }

  // Determine the winner based on the current squares array
  const winner = calculateWinner(squares);
  let status;

  // Set the game status message based on the presence of a winner or the next player
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Render the game board with Squares components
  //Squares are grouped into rows, for each square 'value' prop is passed which represents the value displayed in it
  //'onSquareclick' is also being passed to 'square'. This funtion is called when the square is clicked
  //'handelClick': It is triggered with the index of the square when the square is clicked
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

// Game component representing the overall game
export default function Game() {
  // State variables using the 'useState' hook
  //'history' is initialized with an array containing a single element:
  // an array of 9 null values, representing the initial state of the game board
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //'currentMove' is initialized with the value 0 and represents the index of the current move in the game history
  const [currentMove, setCurrentMove] = useState(0);
  //Calculates the value of 'xIsNext' based on whether the 'currentMove' is an even number, which determines whether it is X player's turn
  const xIsNext = currentMove % 2 === 0;
  //Creates a variable 'currentSquares' that represents the state of the game board at the current move
  //Retrieves the array of squares from the 'history' array based on the 'currentMove' index
  const currentSquares = history[currentMove];
   // Function to handle a play (updating the game state)
   function handlePlay(nextSquares) {
    // Create a new history array with the updated squares
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    
    // Update state variables with the new history and current move
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
// This function calls the 'setCurrentMove' function to update the currentMove state 
//variable with the provided nextMove.
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
//A constant variable 'moves' is declared. It uses the map function to iterate over
// each element (represented by squares) in the history array.
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );

 
}