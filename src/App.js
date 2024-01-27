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