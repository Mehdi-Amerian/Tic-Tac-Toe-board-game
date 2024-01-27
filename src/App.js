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
