const ROW = 3
const COLUMN = ROW

function Gameboard() {
    let board = []
    for (let row = 1; row <= ROW; row++) {
        for (let column = 1; column <= COLUMN; column++){
            board.push(Cell(String(row)+column,row,column))
        }
    }

    findCell = (row,column) => {
        return board[(row-1)*COLUMN + (column-1)]
    }

    checkWin = () => {
        let result = 'lose'
        // row check
        for(let cell = 0; cell < ROW*COLUMN;cell++){
            let checkList = new Set
            let x = cell
            let col = -9999999
            for(let i = 0; i < 3;i++){

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
                console.log(checkList)
                result = 'win'
                }
        }

        // column check
        for(let cell = 0; cell < ROW*COLUMN;cell++){
            let checkList = new Set
            let x = cell
            let col = ((x+1) % COLUMN) === 0 ? COLUMN : (x+1) % COLUMN;
            for(let i = 0; i < 3;i++){

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
                console.log(checkList)
                result = 'win'
                }
        }

        // diagonal check > r
        for(let cell = 0; cell < ROW*COLUMN;cell++){
            let checkList = new Set
            let x = cell
            let col = -9999999
            for(let i = 0; i < 3;i++){

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
                console.log(checkList)
                result = 'win'
                }
        }
        console.log('-------------')
        // diagonal check > l
        for(let cell = 0; cell < ROW*COLUMN;cell++){
            let checkList = new Set
            let x = cell
            let col = 9999999
            for(let i = 0; i < 3;i++){

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
                console.log(checkList)
                result = 'win'
                }
        }
            



}

    return {board,findCell,checkWin}
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
gameboard.checkWin()