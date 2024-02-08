'use strict'

const MINE = '💣'
// Model:

var gBoard 
var gLevel = { SIZE: 4, MINES: 2 }
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }

var gNums
var gNextNum
var gTimerInterval


function onInitGame() {
    gBoard = buildBoard()
    
    renderBoard(gBoard)
    gNextNum = 1
resetNums()
}

function buildBoard() {


    const size = gLevel.SIZE
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            var cell =  {
                minesAroundCount: 0, //setMinesNegsCount(),
                isShown: false,
                isMine: false,
                isMarked: true
            }
            board[i][j] = cell
            
            // board[i][j] = setMinesNegsCount(board, i, j)
        }

    }
    board[1][1] = MINE
    board[1][board.length - 2] = MINE
    board[board.length - 2][1] = MINE
    board[board.length - 2][board.length - 2] = MINE
    return board

}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var minesAroundCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[i].length) continue
            var currCell = board[i][j]
            if (currCell === MINE) minesAroundCount++
        }
        console.log(minesAroundCount);
    }
    return minesAroundCount

}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr class="board-row">'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const className ='cell'
            const title = `place: ${i}, ${j}`
            strHTML += `\t<td data-i="${i}" data-j="${j}" title="${title}" class="cell ${className}" 
                            onclick="onCellClicked(this, ${i}, ${j})" >
                         </td>\n`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function onCellClicked(elCell, i , j) {
    elCell = document.querySelector('.cell')
    // cell = gBoard[i][j]
    elCell.innerText = '?'
    // drawNumOnBoard({ i, j })


    // if (num === gNextNum) { 
    //     if (num === 1) startTimer()
    //     gNextNum++
    //     elCell.style.backgroundColor = 'lightblue'
    //     if (gNextNum > gLevel ** 2) clearInterval(gTimerInterval)
    // }
}

function onCellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}

function onHandleKey(event) {
    //WHAT HAPPEND WHEN MOVE/CLICK MOUSE
}
function onSetLevel(size) {
    gLevel.SIZE = size
    onInitGame()
}

function startTimer() {

    if (gTimerInterval) clearInterval(gTimerInterval)

    gTimerInterval = setInterval(() => {
        const timeDiff = Date.now() - startTime

        const seconds = getFormatSeconds(timeDiff)
        const milliSeconds = getFormatMilliSeconds(timeDiff)

        document.querySelector('span.seconds').innerText = seconds
        document.querySelector('span.milli-seconds').innerText = milliSeconds

    }, 10)
}

function getFormatSeconds(timeDiff) {
    const seconds = Math.floor(timeDiff / 1000)
    return (seconds + '').padStart(2, '0')
}

function getFormatMilliSeconds(timeDiff) {
    const milliSeconds = new Date(timeDiff).getMilliseconds()
    return (milliSeconds + '').padStart(3, '0')
}

function drawNum(pos) {
    console.log(setMinesNegsCount(gBoard, pos.i , pos.j))

    // var randIdx = getRandomInt(0, gNums.length)
    // var num = gNums[randIdx]
    // gNums.splice(randIdx, 1)
    // return num
}

function resetNums() {
    gNums = []
    for (var i = 1; i <= gLevel ** 2; i++) {
        gNums.push(i)
    }
    return gNums
}

