import { Board } from "./Board";
import { useState } from "react";

export default function Sudoku() {
  const sampleGame = [[{}, { "value": 1, "immutable": true }, { "value": 2, "immutable": true }, {}, { "value": 5, "immutable": true }, {}, {}, {}, {}],
  [{ "value": 9, "immutable": true }, {}, {}, {}, {}, { "value": 3, "immutable": true }, {}, { "value": 1, "immutable": true }, { "value": 4, "immutable": true }],
  [{}, {}, {}, {}, {}, { "value": 8, "immutable": true }, { "value": 2, "immutable": true }, { "value": 3, "immutable": true }, {}],
  [{}, {}, { "value": 1, "immutable": true }, {}, {}, {}, {}, { "value": 2, "immutable": true }, { "value": 6, "immutable": true }],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{ "value": 6, "immutable": true }, { "value": 5, "immutable": true }, {}, {}, {}, {}, { "value": 7, "immutable": true }, {}, {}],
  [{}, { "value": 9, "immutable": true }, { "value": 7, "immutable": true }, { "value": 6, "immutable": true }, {}, {}, {}, {}, {}],
  [{ "value": 5, "immutable": true }, { "value": 4, "immutable": true }, {}, { "value": 2, "immutable": true }, {}, {}, {}, {}, { "value": 1, "immutable": true }],
  [{}, {}, {}, {}, { "value": 7, "immutable": true }, {}, { "value": 9, "immutable": true }, { "value": 5, "immutable": true }, {}]];

  // const [gameState, setGameState] = useState(Array(9).fill(Array(9).fill(null)));
  const [gameState, setGameState] = useState(sampleGame);
  const [selection, setSelection] = useState({});
  const [pencilMarks, setPencilMarks] = useState(false);
  const [inEdit, setInEdit] = useState(false);
  const [gameMessage, setGameMessage] = useState("");

  function handleClick(i, j) {
    setSelection({ row: i, col: j });
  }

  function handleNumber(number) {
    if ("row" in selection && "col" in selection) {

      if (inEdit) {
        processEdit(number);
      } else {
        processNormalGame(number);
      }
    }
  }

  function processEdit(number) {
    let newGameState = gameState.map(row => row.slice());
    newGameState[selection.row][selection.col] = {value: number, immutable: true};
    setGameState(newGameState);
  }

  function processNormalGame(number) {

    let newGameState = gameState.map(row => row.slice());
    let cell = gameState[selection.row][selection.col];

    if (pencilMarks) {
      if ("value" in cell) {
        return;
      }
      
      let marks = [];
      if ("pencil" in cell) {
        marks = [...cell.pencil];
      }

      const index = marks.indexOf(number);
      if (index > -1) {
        marks.splice(index, 1);
      } else {
        marks.push(number);
      }
      
      const uniqueMarks = [...new Set(marks)].sort();
      newGameState[selection.row][selection.col] = {pencil: uniqueMarks};

    } else {

      if ("value" in cell && cell.immutable) {
          return;
      }
      newGameState[selection.row][selection.col] = {value: number, immutable: false};
    }
    setGameState(newGameState);
  }

  function handlePencilMarks() {
    if (!inEdit) {
      if (!pencilMarks) {
        setGameMessage("Pencil marking selected.");
      } else {
        setGameMessage("");
      }  
      setPencilMarks(!pencilMarks);
    }
  }

  function handleInEdit() {
    if (!inEdit) {
      setGameMessage("In editor mode.")
    } else {
      setGameMessage("");
    }
    setInEdit(!inEdit);   // Toggle it
  }

  function handleErase() {
    if ("row" in selection && "col" in selection) {
      let cell = gameState[selection.row][selection.col];
      
      if (!inEdit && "value" in cell && cell.immutable) {
        return;
      }

      let newGameState = gameState.map(row => row.slice());
      newGameState[selection.row][selection.col] = {};
      setGameState(newGameState);
    }
  }

  function handleResetGame() {

    let resetState = [];
    gameState.forEach((row, i) => {
      let newRow = [];
      row.forEach((cell, j) => {
        if ("value" in cell && cell.immutable) {
          newRow.push(cell);
        } else {
          newRow.push ({});
        }
      });
      resetState.push(newRow);
    });
    setGameState(resetState);
  }

  return (
    <>
      <div className="card flex column">
        <h1>Graeme's Sudoku</h1>
        <button id="reset-game-button" onClick={() => handleResetGame()}>RESET GAME</button>
        <div id="puzzle-container">
          <Board gameState={gameState} selection={selection} onCellClick={handleClick} />
        </div>
        <div id="num-buttons" className="flex justify-center">
          <button onClick={() => handleNumber(1)}>1</button>
          <button onClick={() => handleNumber(2)}>2</button>
          <button onClick={() => handleNumber(3)}>3</button>
          <button onClick={() => handleNumber(4)}>4</button>
          <button onClick={() => handleNumber(5)}>5</button>
          <button onClick={() => handleNumber(6)}>6</button>
          <button onClick={() => handleNumber(7)}>7</button>
          <button onClick={() => handleNumber(8)}>8</button>
          <button onClick={() => handleNumber(9)}>9</button>
        </div>
        <div className="controls flex justify-center">
          <button className="action pseudo undo"></button>
          <button className="action pseudo eraser" onClick={() => handleErase()}></button>
          <button className="action pseudo hint"></button>
          <button className="action pseudo edit" onClick={() => handleInEdit()}></button>
          <button className="action pseudo"></button>
          <button className="action pseudo pencilMarks" onClick={() => handlePencilMarks()}></button>
        </div>
        <div>{gameMessage}</div>
      </div>
    </>
  );
}