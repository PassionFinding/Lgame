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
const piece1 = document.getElementById('piece1')
const piece2 = document.getElementById('piece2')
const skipbutton = document.getElementById('skip')

const squares = [square1, square2, square3, square4, square5, square6, square7, square8, square9, square10, square11, square12, square13, square14, square15, square16]
const pieces = [piece1, piece2]
let red_squares = [square2, square3, square7, square11]
let blue_squares = [square6, square10, square14, square15]

//true is blue turn, false is red turn
let turn = true;

const movecalculation = function(){
    let square_indexes = []
    if (!turn){
        squares.forEach(function(square){
            const style = getComputedStyle(square)
            const color = style.backgroundColor
            if (color === "rgb(255, 0, 0)"){
                square_indexes.push(squares.indexOf(square))
            }
        })
    } else if (turn){
        squares.forEach(function(square){
            const style = getComputedStyle(square)
            const color = style.backgroundColor
            if (color === "rgb(0, 0, 255)"){
                square_indexes.push(squares.indexOf(square))
            }
        })
    }
}
square2.addEventListener('click', movecalculation)
