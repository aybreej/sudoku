export function Board({gameState}) {

    let board = [];

    gameState.forEach((row, i) => {
        row.forEach((cell, j) => {
            let classes = "cell"
            if (cell !== 0) {
                classes += " initial"
            }
            // add border-bottom to every 3rd row except row 9
            if ((i + 1) % 3 === 0 && i + 1 !== 9) {
                classes += " border-bottom"
            }
            // border-top if the previous row index was a multiple of 3
            if (i % 3 === 0 && i !== 0) {
                classes += " border-top";
            }
            // add border-right to every 3rd column except column 9
            if ((j + 1) % 3 === 0 && j + 1 !== 9) {
                classes += " border-right"
            }
            // border-left if the previous column index was a multiple of 3
            if (j % 3 === 0 && j !== 0) {
                classes += " border-left"
            }
            board.push(<button className={classes} key={"Cell-"+i+"-"+j}></button>);
        });
    });

    return (<>{board}</>);
}