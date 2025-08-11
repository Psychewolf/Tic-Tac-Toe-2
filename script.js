const ROW = 3
const COLUMN = 3

function Gameboard() {
    let board = []
    for (let row = 1; row <= ROW; row++) {
        for (let column = 1; column <= COLUMN; column++){
            board.push({row,column})
        }
    }

    return {board}
}

function Cell(value,row,column){
    let value = value
    getValue = () => value
    changeValue = (x) => {value = x}
    getRow = () => row
    getColumn = () => column
    return {getValue,changeValue,getRow,getColumn}
}
gameboard = Gameboard()

console.log(gameboard.board)
