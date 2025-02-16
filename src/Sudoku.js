import { Board } from "./Board";
import {useState} from "react";

export default function Sudoku() {
  const sampleGame = [[{}, {"value": 1,"immutable": true},{"value": 2,"immutable": true}, {},{"value": 5,"immutable": true},{}, {},{},{}],
                      [{"value": 9,"immutable": true},{},{}, {},{},{"value": 3,"immutable": true}, {},{"value": 1,"immutable": true},{"value": 4,"immutable": true}],
                      [{},{},{}, {},{},{"value": 8,"immutable": true}, {"value": 2,"immutable": true},{"value": 3,"immutable": true},{}],
                      [{},{},{"value": 1,"immutable": true}, {},{},{}, {},{"value": 2,"immutable": true},{"value": 6,"immutable": true}],
                      [{},{},{}, {},{},{}, {},{},{}],
                      [{"value": 6,"immutable": true},{"value": 5,"immutable": true},{}, {},{},{}, {"value": 7,"immutable": true},{},{}],
                      [{},{"value": 9,"immutable": true},{"value": 7,"immutable": true}, {"value": 6,"immutable": true},{},{}, {},{},{}],
                      [{"value": 5,"immutable": true},{"value": 4,"immutable": true},{}, {"value": 2,"immutable": true},{},{}, {},{},{"value": 1,"immutable": true}],
                      [{"pencil": [1,2,5,9]},{},{"pencil": [2,3]}, {},{"value": 7,"immutable": true},{}, {"value": 9,"immutable": true},{"value": 5,"immutable": true},{"pencil": [2]}]];
  
  // const [gameState, setGameState] = useState(Array(9).fill(Array(9).fill(null)));
  const [gameState, setGameState] = useState(sampleGame);
  const [selection, setSelection] = useState([]);

  function handleClick(i, j) {
    setSelection([i,j]);
  }

  return (
      <>
        <div className="card flex column">
          <h1>Graeme's Sudoku</h1>
          <button id="reset-game-button">RESET GAME</button>
          <div id="puzzle-container">
            <Board gameState={gameState} selection={selection} onCellClick={handleClick}/>
          </div>
          <div id="num-buttons" className="flex justify-center">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
          </div>
          <div className="controls flex justify-center">
            <button className="action pseudo undo"></button>
            <button className="action pseudo eraser"></button>
            <button className="action pseudo hint"></button>
            <button className="action pseudo"></button>
            <button className="action pseudo"></button>
            <button className="action pseudo"></button>
          </div>
        </div>
      </>
  );
}