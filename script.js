const ROW = 3
const COLUMN = 3

function Gameboard() {
    let board = []
    for (let row = 1; row <= ROW; row++) {
        for (let column = 1; column <= COLUMN; column++){
            board.push(Cell(0,row,column))
        }
    }

    return {board}
}

function Cell(valuee,row,column){
    let value = valuee
    getValue = () => value
    changeValue = (x) => {value = x}
    getRow = () => row
    getColumn = () => column
    return {getValue,changeValue,getRow,getColumn}
}
gameboard = Gameboard()

gameboard.board.forEach(element => {
    console.log(element.getRow(),element.getColumn())
});
