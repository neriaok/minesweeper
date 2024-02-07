'use strict'

const WALL = 'WALL'
const FLOOR = 'FLOOR'

// Model:
var gBoard = {
    minesAroundCount: 4,
     isShown: false,
      isMine: false, 
      isMarked: true }

var gLevel = { SIZE: 4, MINES: 2 }
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }

var gNums
var gNextNum
var gTimerInterval


function onInitGame() {
    gBoard = buildBoard()
    resetNums()
    renderBoard(gBoard)
    gNextNum = 1

}

function buildBoard() {
    // DONE: Create the Matrix 10 * 12 
    // DONE: Put FLOOR everywhere and WALL at edges
 
    const board = []
    const rowsCount = 10
    const colsCount = 10
    for (var i = 0; i < rowsCount; i++) {
        board.push([])
        for (var j = 0; j < colsCount; j++) {
            board[i][j] = { type: FLOOR, gameElement: null }
            if (i === 0 || i === rowsCount - 1 ||
                j === 0 || j === colsCount - 1) {
                board[i][j].type = WALL
            }
        }
    }

    return board
}

function setMinesNegsCount(board){

}

function renderBoard(board) {

    const elBoard = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            var cellClass = getClassName({ i, j })
            // console.log('cellClass:', cellClass)

            if (currCell.type === FLOOR) cellClass += ' floor'
            else if (currCell.type === WALL) cellClass += ' wall'

            strHTML += `\t<td class="cell ${cellClass}" onclick="moveTo(${i},${j})" >\n`
        }
    }
    // console.log(strHTML)
    elBoard.innerHTML = strHTML
}

function onCellClicked(elCell, num) {
    if (num === gNextNum) {
        if (num === 1) startTimer()
        gNextNum++
        elCell.style.backgroundColor = 'lightblue'
        if (gNextNum > gLevel ** 2) clearInterval(gTimerInterval)
    }
}

 function onCellMarked(elCell) {

 }

function checkGameOver(){

}

function expandShown(board, elCell, i, j) {

}

function onHandleKey(event) {
  //WHAT HAPPEND WHEN MOVE/CLICK MOUSE
}
function onSetLevel(level) {
    gLevel = level
    onInitGame()
}

function startTimer() {

    if (gTimerInterval) clearInterval(gTimerInterval)

    gTimerInterval = setInterval(() => {
        const timeDiff = Date.now() - startTime

        const seconds = getFormatSeconds(timeDiff)
        const milliSeconds = getFormatMilliSeconds(timeDiff)

        document.querySelector('span.seconds').innerText =  seconds
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

function drawNum() {
    var randIdx = getRandomInt(0, gNums.length)
    var num = gNums[randIdx]
    gNums.splice(randIdx, 1)
    return num
}

function resetNums() {
    gNums = []
    for (var i = 1; i <= gLevel ** 2; i++) {
        gNums.push(i)
    }
    return gNums
}

