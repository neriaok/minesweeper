'use strict'
// to fix : rendompos() in putmines() can return to places with the same values == one place on board with mine.
const FLAG = '🚩'
const MINE = '💣'

var gBoard
var gLevel = { SIZE: 4, MINES: 4 }
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0, lives: 3 }
var wasFirstClick
var gTimerInterval
var gEltimer = document.querySelector('.timer')
var [min, sec] = [0, 0]

function onInit() {
    [min, sec] = [0, 0]
    gGame = { isOn: true, shownCount: 0, markedCount: 0, secsPassed: 0, lives: 3 }
    updateLives()
    clearInterval(gTimerInterval)
    document.querySelector('.smiley').innerHTML = '😁'
    document.querySelector('.timer').innerHTML = '00:00'
    wasFirstClick = false
    console.log('...');
    gBoard = buildBoard()
    renderBoard(gBoard)

}

function stopTimer() {
    sec++
    if (sec === 60) {
        sec = 0
        min++
        if (min === 60) {
            min = 0
        }
    }
    var s = (sec < 10) ? '0' + sec : sec
    var m = (min < 10) ? '0' + min : min

    gEltimer.innerHTML = m + ":" + s
}
function startTimer() {
    if (gTimerInterval) clearInterval(gTimerInterval)
    gTimerInterval = setInterval(stopTimer, 1000)

}

function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}
function calculateMinesAroundCount(board) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j].minesAroundCount = countMinesAround(board, i, j);
        }
    }
}
function putMines(board , firstClickI , firstClickJ) {
    var add = 0 
    for (var i = 0; i < gLevel.MINES + add; i++) {
        var pos = randomPos() // if return the same pos "add" will add another check for permanent num of mains!
        if(pos.i === firstClickI && pos.j === firstClickJ){ //make sure its will be clear from mine
            pos = randomPos()
        }
        if(board[pos.i][pos.j].isMine === false){
        board[pos.i][pos.j].isMine = true
        } else{
            add++
        }
    }
}

function randomPos() {
    return {
        i: getRandomInt(0, gLevel.SIZE),
        j: getRandomInt(0, gLevel.SIZE)
    }
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            var className = ''
            if (currCell.isShown) {
                if (currCell.isMine) {
                    className = `mine`
                } else {
                    className = `mark`
                }
            }
            strHTML += `<td class="${className}" onclick="onCellClicked(this,${i} , ${j})" oncontextmenu="onCellMarked(event , this , ${i},${j})">`
            if (currCell.isMarked) strHTML += FLAG
            if (currCell.isShown) {
                if (currCell.isMine === true) strHTML += MINE
                if (currCell.isMine === false) {
                    if (currCell.minesAroundCount === 0) {
                        strHTML += ' '
                    } else strHTML += currCell.minesAroundCount
                }
                else strHTML += ''
            }
            strHTML += '</td>'
        }

        strHTML += '</tr>'
    }

    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function onCellMarked(ev, elCell, i, j) {
    ev.preventDefault() // makes the menu dont show up
    var cell = gBoard[i][j]
    if (gGame.isOn === false) return
    if (cell.isShown) return
    if (cell.isMarked) {
        elCell.innerText = '';
        cell.isMarked = false;
        gGame.markedCount--;
    } else {
        elCell.innerText = FLAG;
        cell.isMarked = true;
        gGame.markedCount++;
    }

}

function onCellClicked(elCell, i, j) {
    if(!wasFirstClick){
    putMines(gBoard , i , j) /// we get the first click and make sure its will be clear from mine.
    calculateMinesAroundCount(gBoard)
    wasFirstClick = true
    }

    if (gGame.isOn === false) return
    var cell = gBoard[i][j]
    if (cell.isMarked) return // if the cell marked is protected.
    if (cell.isShown) return // now we can't click shown cell/same cell twice.
    if (cell.isMine === true) {
        if (gGame.lives === 1) {
            cell.isShown === true
            renderBoard(gBoard)
            gameOver(cell)
            return
        } else {
            gGame.lives--
            updateLives()

        }


    }
    if (cell.minesAroundCount === 0 && !cell.isMine) {
        shownCells(i, j)
    }
    startTimer()
    cell.isShown = true
    console.log(elCell);
    checkShownCount()
    checkVictory()
    renderBoard(gBoard)
}



function shownCells(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            const currCell = gBoard[i][j];
            if (!currCell.isMine && !currCell.isShown && !currCell.isMarked) {
                currCell.isShown = true;
                // If the neighboring cell has no mines around it, recursively reveal its neighbors
                if (currCell.minesAroundCount === 0) {
                    shownCells(i, j);
                }
            }
        }
    }
}



function countMinesAround(board, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            const currCell = board[i][j]
            if (currCell.isMine === true) count++
        }
    }
    // if(count === 0) return ' ' // cell shown empty
    return count
}

function gameOver(cell) {
    console.log('game over!');
    reveledMines()
    gGame.isOn = false
    gGame.lives--
    updateLives()
    cell.isShown = true
    checkShownCount()
    document.querySelector('.smiley').innerHTML = '🤯'
    renderBoard(gBoard)
    clearInterval(gTimerInterval)
}
function reveledMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if (cell.isMine) { // we asking what cell.is mine *now* true or false so we done need "=== true"
                cell.isShown = true // here, we are getting a new value to cell.is shown so we need "= true"
            }
        }
    }
}

function chooseLevel(size, mines) {
    gLevel.SIZE = size
    gLevel.MINES = mines
    onInit()
}
function checkShownCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if (cell.isShown) gGame.shownCount++
        }
    }
}
function updateLives() {
    var lives = document.querySelector('.lives span')
    if (gGame.lives === 3) lives.innerText = '💙💙💙'
    if (gGame.lives === 2) lives.innerText = '💙💙'
    if (gGame.lives === 1) lives.innerText = '💙'
    if (gGame.lives === 0){
    lives.innerText = '☠'
    lives.style.color = 'red'     
    } 


}
function checkVictory() { //// not complited!
    var countMarkedMines = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if (cell.isMine && cell.isMarked) countMarkedMines++
            if (countMarkedMines >= 2 && gGame.shownCount >= (gLevel.SIZE**2) - 2) return isVictory()
        }
    }
    console.log(countMarkedMines);
}

function isVictory() {
    console.log('victory');
    document.querySelector('.smiley').innerHTML = '🤩'
    document.querySelector('.lives span').innerText = 'victory!🎉'
    renderBoard(gBoard)
    clearInterval(gTimerInterval)
    gGame.isOn = false
}