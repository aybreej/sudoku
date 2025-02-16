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
  const [history, setHistory] = useState([sampleGame]);
  const [gameState, setGameState] = useState(sampleGame);
  const [selection, setSelection] = useState({});
  const [pencilMarks, setPencilMarks] = useState(false);
  const [inEdit, setInEdit] = useState(false);
  const [gameMessage, setGameMessage] = useState("");
  const [showResetPopup, setShowResetPopup] = useState(false);

  function processEdit(number) {
    let newGameState = gameState.map(row => row.slice());
    newGameState[selection.row][selection.col] = { value: number, immutable: true };
    setGameState(newGameState);
    addToHistory(newGameState);
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
      newGameState[selection.row][selection.col] = { pencil: uniqueMarks };

    } else {

      if ("value" in cell && cell.immutable) {
        return;
      }
      newGameState[selection.row][selection.col] = { value: number, immutable: false };
    }
    setGameState(newGameState);
    addToHistory(newGameState);
  }

  function addToHistory(newGameState) {
    // return;
    let newHistory = history.map(state => state.map(row => row.slice()));
    let copyOfNewGameState = newGameState.map(row => row.slice());
    newHistory.push(copyOfNewGameState);
    setHistory(newHistory);
  }

  function gameComplete() {

    for (let row of gameState) {
      for (let cell of row) {
        if (!("value" in cell)) {
          return false;
        }
      }
    }
    return true;
  }

  // ***************************************************************************************
  //    Start of handlers
  // ***************************************************************************************
  function handleClick(i, j) {
    if (gameComplete()) {
      return;
    }

    setSelection({ row: i, col: j });
  }

  function handleNumber(number) {
    if (gameComplete()) {
      return;
    }

    if ("row" in selection && "col" in selection) {

      if (inEdit) {
        processEdit(number);
      } else {
        processNormalGame(number);
      }
    }
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

    if (pencilMarks) {
      setPencilMarks(!pencilMarks);
    }
  }

  function handleErase() {
    if (gameComplete()) {
      return;
    }

    if ("row" in selection && "col" in selection) {
      let cell = gameState[selection.row][selection.col];

      if (!inEdit && "value" in cell && cell.immutable) {
        return;
      }

      let newGameState = gameState.map(row => row.slice());
      newGameState[selection.row][selection.col] = {};
      setGameState(newGameState);
      addToHistory(newGameState);
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
          newRow.push({});
        }
      });
      resetState.push(newRow);
    });
    setGameState(resetState);
    setHistory([resetState]);
  }

  function handleUndo() {
    if (history.length > 1) {
      let newHistory = history.map(state => state.map(row => row.slice()));
      newHistory.pop();
      setHistory(newHistory);

      let undoGameState = newHistory[newHistory.length - 1].map(row => row.slice());
      setGameState(undoGameState);
    }
  }

  return (
    <>
      <div className="card flex column align-center">
        <h1>Graeme's Sudoku</h1>
        <button id="reset-game-button" onClick={() => { setShowResetPopup(true) }}>Reset game</button>
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
          <button className="action pseudo undo" onClick={() => handleUndo()}></button>
          <button className="action pseudo eraser" onClick={() => handleErase()}></button>
          <button className="action pseudo edit" data-instate={inEdit} onClick={() => handleInEdit()}></button>
          <button className="action pseudo pencilMarks" data-instate={pencilMarks} onClick={() => handlePencilMarks()}></button>
        </div>
        <div>{gameMessage}</div>
      </div>
      {showResetPopup && (
        <div id="reset-game-popup" className="popup flex column align-center justify-center">
          <div className="card flex column">
            <h4>Confirm?</h4>
            <p>Are you sure you want to reset the game?</p>
            <div className="flex space-between">
            <button onClick={() => { handleResetGame(); setShowResetPopup(false) }}>Yes</button>
            <button onClick={() => { setShowResetPopup(false) }}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}