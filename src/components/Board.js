import React, { useState } from 'react'
import '../css/Board.css'

export const Board = () => {
  const [isEnded, setIsEnded] = useState([false, '']);
  const [count, setCount] = useState(0)
  const [turn, setTurn] = useState(true)
  const [playField, setPlayField] = useState([
    ['','',''],
    ['','',''],
    ['','',''],
  ]);

  const haveWon = (char, rowId, boxId, pl) => {
    // Check row
    let win = true;
    for (let i = 0; i < pl[rowId].length; i++) {
      if (pl[rowId][i] !== char) {
        win = false;
        break;
      }
    }
    if (win) return true;
  
    // Check column
    win = true;
    for (let j = 0; j < pl.length; j++) {
      if (pl[j][boxId] !== char) {
        win = false;
        break;
      }
    }
    if (win) return true;
  
    // Check diagonal (top-left to bottom-right)
    if (rowId === boxId) {
      win = true;
      for (let i = 0; i < pl.length; i++) {
        if (pl[i][i] !== char) {
          win = false;
          break;
        }
      }
      if (win) return true;
    }
  
    // Check diagonal (top-right to bottom-left)
    if (rowId + boxId === pl.length - 1) {
      win = true;
      for (let i = 0; i < pl.length; i++) {
        if (pl[i][pl.length - 1 - i] !== char) {
          win = false;
          break;
        }
      }
      if (win) return true;
    }
  
    return false;
  };
  

  const handleClick = (boxId, rowId) => {
    if (isEnded[0]) return;
    const char = turn ? 'X' : 'O';
    // if the box is already played, do nothing
    if (playField[rowId][boxId] === 'X' || playField[rowId][boxId] === 'O') return;

    // otherwise, create a deep copy of playField, and update the played box
    const newPlayField = playField.map(row => [...row])
    newPlayField[rowId][boxId] = char;
    // Check for win or tie before toggling turn and incrementing count
    if (haveWon(char, rowId, boxId, newPlayField)) {
      setIsEnded([true, `${char} wins`]);
    } else {
      setCount(prevCount => prevCount + 1);
      if (count === 8) { // Check for tie (8 because count hasn't been incremented yet)
        setIsEnded([true, 'Tie!']);
      }
    }
    setPlayField(newPlayField)

    // this step make sure we play X and O interchangeably
    setTurn(!turn)
  };

  const resetGame = () => {
    setIsEnded([false, '']);
    setCount(0);
    setTurn(true)
    setPlayField([
      ['','',''],
      ['','',''],
      ['','',''],
    ])
  }

  return (
    <div className="board-layout">
      <div>Let's play Tic-Tac-Toe</div>
      <div className='board'>
        {playField.map((row, rowIndex) => (
          row.map((box, boxIndex) => (
            <div 
              key={boxIndex} 
              className="box"
              onClick = {() => handleClick(boxIndex, rowIndex)}
            >
              {box}
            </div>
          ))
        ))}
      </div>
      {isEnded[0] && 
      <div className="end-game">
        <div>{isEnded[1]}</div>
        <button onClick={resetGame}>New Game</button>
      </div>}
    </div>
  )
}
