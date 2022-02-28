const square1 = document.getElementById('1')
const square2 = document.getElementById('2')
const square3 = document.getElementById('3')
const square4 = document.getElementById('4')
const square5 = document.getElementById('5')
const square6 = document.getElementById('6')
const square7 = document.getElementById('7')
const square8 = document.getElementById('8')
const square9 = document.getElementById('9')
const square10 = document.getElementById('10')
const square11 = document.getElementById('11')
const square12 = document.getElementById('12')
const square13 = document.getElementById('13')
const square14 = document.getElementById('14')
const square15 = document.getElementById('15')
const square16 = document.getElementById('16')
const table = document.querySelector('table')

const squares = [square1, square2, square3, square4, square5, square6, square7, square8, square9, square10, square11, square12, square13, square14, square15, square16]
const red_squares = [square2, square3, square7, square11]
const blue_squares = [square6, square10, square14, square15]

//true is blue turn, false is red turn
let turn = false;

// square1.onclick = function() {
//     if (square1.firstChild) {
//         square1.style.backgroundColor = 'black';
//     }
// }

// square2.onclick = function() {
//     if (square2.firstChild) {
//         square2.style.backgroundColor = 'black';
//     }
// }

// squares.forEach(function(square) {
//     const style = getComputedStyle(square)
//     const color = style.backgroundColor
//     if (turn === true && !square.firstChild) {
//         square.addEventListener('click', function(event) {
//             event.target.style.backgroundColor = 'blue';
//         })
//     } else if (turn === false) {
//         square.addEventListener ('click', function(event) {
//             event.target.innerHTML = event.target.style.backgroundColor
//         })
//     }
// })

const movement = function(event){
    if (turn === false) {
        red_squares.forEach(item => item.style.backgroundColor = 'lightcoral')
        event.target.style.backgroundColor = 'red'
        squares.forEach(function(square){
            const style = getComputedStyle(square)
            const color = style.backgroundColor
            if ((color === "rgb(255, 255, 255)" || color === "rgb(240, 128, 128)") && !square.firstChild) {
                square.addEventListener('mouseover', function(event){
                    event.target.style.backgroundColor = 'red'
                })
            }
        })
    }
}

const unmovement = function(event){
    if (turn === false) {
        squares.forEach(function(square){
            const style = getComputedStyle(square)
            const color = style.backgroundColor
            if (color === "rgb(255, 0, 0)") {
                square.style.backgroundColor = 'white'
                square.removeEventListener('mouseover', function(event){
                    event.target.style.backgroundColor = 'red'
                })
            }
        })
        red_squares.forEach(item => item.style.backgroundColor = 'red')
    }
}

table.addEventListener('mousedown', movement)
table.addEventListener('mouseup', unmovement)