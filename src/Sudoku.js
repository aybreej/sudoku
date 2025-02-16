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
  [{ "pencil": [1, 2, 5, 9] }, {}, { "pencil": [2, 3] }, {}, { "value": 7, "immutable": true }, {}, { "value": 9, "immutable": true }, { "value": 5, "immutable": true }, { "pencil": [2] }]];

  // const [gameState, setGameState] = useState(Array(9).fill(Array(9).fill(null)));
  const [gameState, setGameState] = useState(sampleGame);
  const [selection, setSelection] = useState({});

  function handleClick(i, j) {
    setSelection({ row: i, col: j });
  }

  function handleNumber(number) {
    if ("row" in selection && "col" in selection) {

      let cell = gameState[selection.row][selection.col];
      if ("value" in cell && cell.immutable) {
        return;
      }
      let newGameState = gameState.map(row => row.slice());
      newGameState[selection.row][selection.col].value = number;
      setGameState(newGameState);
    }
  }

  return (
    <>
      <div className="card flex column">
        <h1>Graeme's Sudoku</h1>
        <button id="reset-game-button">RESET GAME</button>
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
          <button className="action pseudo eraser"></button>
          <button className="action pseudo hint"></button>
          <button className="action pseudo edit"></button>
          <button className="action pseudo ext-hilight"></button>
          <button className="action pseudo"></button>
        </div>
      </div>
    </>
  );
}