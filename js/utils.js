'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

// function countFoodAround(board, rowIdx, colIdx) {
// var foodCount = 0
// for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
// if (i < 0 || i >= board.length) continue
// for (var j = colIdx - 1; j <= colIdx + 1; j++) {
// if (i === rowIdx && j === colIdx) continue
// if (j < 0 || j >= board[0].length) continue
// var currCell = board[i][j]
// if (currCell === FOOD) foodCount++
// }
// }
// return foodCount
// }

function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function getEmptyCell(board){
    const emptyCells = []
    for (var i = 0 ; i < board.length ; i++){
        for (var j = 0 ; j < board[i].length ; i++){
            if(currCell.type === FLOOR && currCell.gameElement === null)
            emptyCells.push({i,j})
        }
    }
    if (!emptyCells.length) return null

    const randomIdx = getRandomInt(0, emptyCells.length - 1)
    return emptyCells[randomIdx]

}
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location)
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}
// Returns the class name for a specific cell
function getClassName(location) {
    return `cell-${location.i}-${location.j}`
}
// Returns the class name for a specific cell
function getClassName(location) {
    return `cell-${location.i}-${location.j}`
}