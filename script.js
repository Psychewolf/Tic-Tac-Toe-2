const ROW = 3
const COLUMN = ROW
const WIN_CONDITION = 3
function Gameboard() {
    let board = []
    for (let row = 1; row <= ROW; row++) {
        for (let column = 1; column <= COLUMN; column++){
            board.push(Cell(String(row)+column,row,column))
        }
    }

    const findCell = (row,column) => {
        return board[(row-1)*COLUMN + (column-1)]
    }



    return {board,findCell}
}

function Cell(valuee,row,column){
    let value = valuee
    const getValue = () => value
    const changeValue = (x) => {value = x}
    const getRow = () => row
    const getColumn = () => column
    const content = () => value == "player1" ? "X" : value == "player2" ? "O" : ""
    return {getValue,changeValue,getRow,getColumn,content}
}

function GameController(){
    this.currentPlayer = "player1"

    document.querySelectorAll(".gameboard").forEach(element => {
        let canvas = document.getElementById(`${element.id}`)
        gameStart(canvas)
    });

    const checkWin = (gameboard) => {
            let board = gameboard.board
            let result = 'noresult'
            let unfilled = false

            // row check
            for(let cell = 0; cell < ROW*COLUMN;cell++){
                let checkList = new Set
                let x = cell
                let col = -Infinity
                for(let i = 0; i < WIN_CONDITION;i++){

                    if(x >= ROW*COLUMN) {
                        checkList.add('-1')
                    }
                    else {
                        let newcol = ((x+1) % COLUMN) === 0 ? COLUMN : (x+1) % COLUMN;
                        if(newcol>col){
                            checkList.add(board[x].getValue())
                            x++
                        }
                        else{checkList.add('-1')}
                        col = newcol
                    }

                }
                if (checkList.size == 1){

                    result = 'win'
                    return {result:"win",who:checkList.values().next().value}
                    }
            }

            // column check
            for(let cell = 0; cell < ROW*COLUMN;cell++){
                let checkList = new Set
                let x = cell
                let col = ((x+1) % COLUMN) === 0 ? COLUMN : (x+1) % COLUMN;
                for(let i = 0; i < WIN_CONDITION;i++){

                    if(x >= ROW*COLUMN) {
                        checkList.add('-1')
                    }
                    else {
                        let newcol = ((x+1) % COLUMN) === 0 ? COLUMN : (x+1) % COLUMN;
                        if(newcol==col){
                            checkList.add(board[x].getValue())
                            x+=COLUMN
                        }
                        else{checkList.add('-1')}
                        col = newcol
                    }

                }
                if (checkList.size == 1){
                    result = 'win'
                    return {result:"win",who:checkList.values().next().value}
                    }
            }

            // diagonal check > r
            for(let cell = 0; cell < ROW*COLUMN;cell++){
                let checkList = new Set
                let x = cell
                let col = -Infinity
                for(let i = 0; i < WIN_CONDITION;i++){

                    if(x >= ROW*COLUMN) {
                        checkList.add('-1')
                    }
                    else {
                        let newcol = ((x+1) % COLUMN) === 0 ? COLUMN : (x+1) % COLUMN;
                        if(newcol>col){
                            checkList.add(board[x].getValue())
                            x+=COLUMN+1
                        }
                        else{checkList.add('-1')}
                        col = newcol
                    }

                }
                if (checkList.size == 1){
                    result = 'win'
                    return {result:"win",who:checkList.values().next().value}
                    }
            }
            // diagonal check > l
            for(let cell = 0; cell < ROW*COLUMN;cell++){
                let checkList = new Set
                let x = cell
                let col = Infinity
                for(let i = 0; i < WIN_CONDITION;i++){

                    if(x >= ROW*COLUMN) {checkList.add('-1')}
                    else {
                        let newcol = ((x+1) % COLUMN) === 0 ? COLUMN : (x+1) % COLUMN;
                        if(newcol<col){
                            checkList.add(board[x].getValue())
                            x+=COLUMN-1
                        }
                        else{checkList.add('-1')}
                        col = newcol

                    }

                }
                if (checkList.size == 1){
                    result = 'win'
                    return {result:"win",who:checkList.values().next().value}
                    }
            }

            for(let cell = 0; cell < ROW*COLUMN; cell++){
                if(typeof(board[cell].getValue()) == 'string') {unfilled = true}
            }

            // draw check
            if (unfilled == false){result = 'draw';return {result:"draw",who:"none"}}
            // no result
            return {result:"noresult",who:"none"}

    }
    function gameStart(canvas) {
        canvas.style.gridTemplate = `repeat(${ROW},1fr)/repeat(${ROW},1fr)`
        canvas.style.fontSize = `calc(${canvas.offsetWidth}px/${ROW}/2)`
        const gameboard = Gameboard()
        DisplayController(canvas, gameboard.board, 'player1')
        let lastPlayedBoard = document.querySelector("#board0")
        
        canvas.addEventListener("click", (e) => {
            if (gameboard.board[e.target.id].getValue() == "player1" || gameboard.board[e.target.id].getValue() == "player2") { return} 
            this.currentPlayer = this.currentPlayer == "player1" ? "player2" : "player1"
            gameboard.board[e.target.id].changeValue(this.currentPlayer)

            // next board highlight
            lastPlayedBoard.style.backgroundColor = "black"
            lastPlayedBoard = document.querySelector("#board"+e.target.id)
            lastPlayedBoard.style.backgroundColor = "red"


            if (checkWin(gameboard).result == "win") {
            if(checkWin(gameboard).who == "player1") canvas.style.backgroundColor = "red"    
            if(checkWin(gameboard).who == "player2") canvas.style.backgroundColor = "blue"   
            }
        })
        canvas.addEventListener("click", () => { DisplayController(canvas, gameboard.board) })
    }
    return {checkWin, gameStart}
}

function DisplayController(canvas,board,lastplayed){
    canvas.innerHTML = ''
    for (let index = 0; index < board.length; index++) {
            let cell = document.createElement("div")
            cell.classList.add("cell")
            cell.id = `${index}`
            cell.textContent = board[index].content()
            canvas.append(cell)
    }
    }
    
game = GameController()

