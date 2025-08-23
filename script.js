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
    let currentPlayer = "player1"
    let canvas = document.querySelector(".gameboard")
    canvas.style.gridTemplate = `repeat(${ROW},1fr)/repeat(${ROW},1fr)`;
    canvas.style.fontSize = `calc(${canvas.offsetWidth}px/${ROW}/2)`
    const gameboard = Gameboard()
    DisplayController(canvas,gameboard.board,'player1')


    canvas.addEventListener("click",(e)=>{
        if(gameboard.board[e.target.id].getValue() == "player1" || gameboard.board[e.target.id].getValue() == "player2"){return}
        currentPlayer = currentPlayer=="player1" ? "player2":"player1"
        gameboard.board[e.target.id].changeValue(currentPlayer)
        if (checkWin()=="win"){
            canvas.style.backgroundColor = "red"    
        }
    })
    canvas.addEventListener("click", () => {DisplayController(canvas,gameboard.board)})
    
    const checkWin = () => {
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
                    return result
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
                    return result
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
                    return result
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
                    return result
                    }
            }

            for(let cell = 0; cell < ROW*COLUMN; cell++){
                if(typeof(board[cell].getValue()) == 'string') {unfilled = true}
            }

            // draw check
            if (unfilled == false){result = 'draw';return result}
            // no result
            return result

    }

    return {checkWin}
}

function DisplayController(canvas,board){
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

