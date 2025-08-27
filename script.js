const ROW = 3

const COLUMN = ROW
const WIN_CONDITION = 3

function ButtonFunction(){
    let button = document.querySelector(".button")
    button.onclick(() => {})
}

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

function GameController(currentplayer){

    this.mainboard = document.querySelector(".mainboard")
    this.currentPlayer = currentplayer
    this.lastPlayedBoard = document.querySelector("button")
    this.move = 0
    function initiate(){
        generateBoards()
        document.querySelectorAll(".gameboard").forEach(element => {
            let canvas = document.getElementById(`${element.id}`)
            gameStart(canvas)
        });
    }
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
        canvas.style.color = "rgba(255, 255, 255, 1)"
        const gameboard = Gameboard()

        DisplayController(canvas, gameboard.board, 'player1')


        canvas.addEventListener("click", (e) => {
            // if not first move
            if (this.move!=0 && !(e.target.parentElement.classList.contains("focus"))) {return}
            this.move+=1
            if (gameboard.board[e.target.id].getValue() == "player1" || gameboard.board[e.target.id].getValue() == "player2") {return} 
            gameboard.board[e.target.id].changeValue(this.currentPlayer)            
            this.currentPlayer = this.currentPlayer == "player1" ? "player2" : "player1"
            

            // next board highlight
            this.lastPlayedBoard.classList.toggle("focus")
            if (gameboard.board.some(e => e.content() == "")){
                console.log("jaber")
            }
            else{
                this.mainboard.dispatchEvent(new CustomEvent('gameResult:draw',{detail:{who:checkWin(gameboard).who,where:e.target.parentElement}}))
            }
            this.lastPlayedBoard = document.querySelector("#board"+e.target.id)
            this.lastPlayedBoard.classList.toggle("focus")


            console.log(checkWin(gameboard))
            if (checkWin(gameboard).result == "win") {
                this.lastPlayedBoard.classList.toggle("focus")
                this.mainboard.dispatchEvent(new CustomEvent('gameResult:won',{detail:{who:checkWin(gameboard).who,where:e.target.parentElement}}))
            }
            if (checkWin(gameboard).result == "draw") {
                this.lastPlayedBoard.classList.toggle("focus")
                this.mainboard.dispatchEvent(new CustomEvent('gameResult:draw',{detail:{who:checkWin(gameboard).who,where:e.target.parentElement}}))
            }
        })
        canvas.addEventListener("click", () => { DisplayController(canvas, gameboard.board) })
    }
    function generateBoards() {
        this.mainboard = document.querySelector(".mainboard")
        const divsToRemove = document.querySelectorAll('div.gameboard');
            divsToRemove.forEach(div => {
            div.remove();
            });
        this.mainboard.style.gridTemplate = `repeat(${ROW},1fr)/repeat(${ROW},1fr)`
        this.overlay = document.querySelector('.overlay-grid')
        this.overlay.style.gridTemplate = `repeat(${ROW*ROW},1fr)/repeat(${ROW*ROW},1fr)`
        this.menu = document.querySelector(".overlay-text")

        
        for(let i = 0; i < ROW*COLUMN; i++) {
            let boarddiv = document.createElement("div")
            boarddiv.classList.add("gameboard")
            boarddiv.id = `board${i}`
            this.mainboard.append(boarddiv)
        }
    }
    return {initiate,checkWin, gameStart}
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
function OverlayController(overlay){
    let menu = document.querySelector(".overlay-text")
    const createOverlay = (overlay = this.overlay) => {
        overlay.dataset.condition = "on"
        for (let index = 0; index < ROW*COLUMN*ROW*COLUMN; index++) {
                console.log(index)
                let cell = document.createElement("div")
                cell.classList.add("overlay-cell")
                cell.id = `${index}`
                cell.style.opacity = '1'
                cell.onclick = e => switchView(index,overlay,e.target);
                overlay.append(cell)
        }
    }
     
    const switchView = (index,parent,target) => {
        anime({
            targets: ".overlay-cell",
            opacity: this.overlay.dataset.condition=="on" ? 0:1,
            delay: anime.stagger(100, {
                grid: [ROW*ROW,ROW*ROW],
                from: index
            })
        })
        anime({
            targets: ".overlay-text",
            opacity: this.overlay.dataset.condition=="on" ? 0:1,
            delay: anime.stagger(100, {
                grid: [ROW*ROW,ROW*ROW],
                from: 50
            })
        })

    
        console.log(this.overlay.dataset.condition)
        if (this.overlay.dataset.condition == "off"){this.overlay.dataset.condition = "on"}
        else{this.overlay.dataset.condition = "off"}
        }
    const switchClickable = () => {
        document.querySelector(".overlay-grid").style.pointerEvents = "auto"
    }
    return {createOverlay, switchView,switchClickable}
}
function Gamelogic(){

    game = GameController('player1')
    
    mainboard = document.querySelector(".mainboard")
    overlayClick = document.querySelector("#overlay")
    menu = document.querySelector(".overlay-text")
    menuheading = document.querySelector("#menuheading")
    menusubheading = document.querySelector("#menusubheading")
    button1 = document.querySelector("#button1")
    button2 = document.querySelector("#button2")
 
    this.overlayController = OverlayController(game.overlay)
    this.overlayController.createOverlay()
    menuState("start")
    document.querySelector(".start").onclick = e => {
        game.initiate();
        menuState("start");
        if (overlayClick.dataset.condition=="on"){}
        else{this.overlayController.switchView((ROW*ROW*ROW*ROW)/2)}
    }
    
    game.initiate()
    mainboard.addEventListener('gameResult:won', (e) => {
        menuState("won",who=e.detail.who,where=e.detail.where)
    })
    mainboard.addEventListener('gameResult:draw', (e) => {
        menuState("draw",who=e.detail.who,where=e.detail.where)
    })
    function menuState(current_state,who,where){
            document.querySelector(".start").style.visibility
            if(where)where.style.backgroundColor = ''
            if(where)where.style.color = ""
            menuheading.textContent = `Click anywhere to start the game...`
            menusubheading.textContent = "Who goes first?"
            button1.style.visibility='visible'
            button2.style.visibility='visible'
        switch (current_state){
            case "start":
                document.querySelector(".start").style.visibility='hidden'
                menu.style.pointerEvents='all'              
                menusubheading.textContent="Who goes first?"
                button1.onclick = (() => {GameController('player1'); menusubheading.textContent='player 1 goes first';menu.style.pointerEvents='none';menuheading.style.opacity="1"})
                button2.onclick = (() => {GameController('player2'); menusubheading.textContent='player 2 goes first';menu.style.pointerEvents='none';menuheading.style.opacity="1"})
                overlayClick.onclick = (() => {overlayClick.style.pointerEvents='none';overlayClick.onclick=''})
                break
            case "won":
                document.querySelector(".start").style.visibility='visible'
                document.querySelector(".start").textContent = "New Game"
                overlayClick.style.pointerEvents = "all"
                menu.style.pointerEvents='none'
                where.style.backgroundColor = "white"
                where.style.color = "red"
                menuheading.textContent = `${who} has won the game`
                menusubheading.textContent = "congratulations"
                button1.style.visibility='hidden'
                button2.style.visibility='hidden'
                break
            case "draw":
                document.querySelector(".start").style.visibility='visible'
                document.querySelector(".start").textContent = "Start New Game"
                overlayClick.style.pointerEvents = "all"
                menu.style.pointerEvents='none'
                where.style.backgroundColor = "yellow"
                where.style.color = "white"
                menuheading.textContent = `The game has been drawn...`
                menusubheading.textContent = "play again?"
                button1.style.visibility='hidden'
                button2.style.visibility='hidden'

                break

        }

    }

}


Gamelogic()


const turb = document.getElementById('turb')
const disp = document.getElementById('disp')


anime({
  duration: 3600,
  easing: 'easeInOutSine',
  direction: 'alternate',
  loop: true,
  update: (anim) => {
    const t = 0.012 + 0.028 * Math.sin((anim.currentTime / anim.duration) * Math.PI * 2)
    turb.setAttribute('baseFrequency', `${t.toFixed(4)} ${ (t*1.8).toFixed(4) }`)

    const s = 6 + 16 * (0.5 + 0.5 * Math.sin((anim.currentTime / anim.duration) * Math.PI * 2))
    disp.setAttribute('scale', s.toFixed(1))
  }
})