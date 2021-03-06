const square1 = document.getElementById('1');
const square2 = document.getElementById('2');
const square3 = document.getElementById('3');
const square4 = document.getElementById('4');
const square5 = document.getElementById('5');
const square6 = document.getElementById('6');
const square7 = document.getElementById('7');
const square8 = document.getElementById('8');
const square9 = document.getElementById('9');
const square10 = document.getElementById('10');
const square11 = document.getElementById('11');
const square12 = document.getElementById('12');
const square13 = document.getElementById('13');
const square14 = document.getElementById('14');
const square15 = document.getElementById('15');
const square16 = document.getElementById('16');
const piece1 = document.getElementById('piece1');
const piece2 = document.getElementById('piece2');
const skipbutton = document.getElementById('skip');
const table = document.querySelector('.game');
const blueturn = document.getElementById('leftbegin')
const redturn = document.getElementById('rightbegin')
const turntracker = document.getElementById('turntracker')
const movecounter = document.getElementById('movecounter')

const squares = [square1, square2, square3, square4, square5, square6, square7, square8, square9, square10, square11, square12, square13, square14, square15, square16];
const pieces = [piece1, piece2];
let piece = piece1
let red_squares = [square2, square3, square7, square11];
let blue_squares = [square6, square10, square14, square15];

//true is blue turn, false is red turn
let turn = false;
let click = false;

const callmeblue = function(parameter){
    parameter.target.style.backgroundColor = "blue"
}

const callmered = function(parameter){
    parameter.target.style.backgroundColor = "red"
}

const movecalculation = function(){
    let square_indexes = [];
    if (!turn){
        squares.forEach(function(square){
            const style = getComputedStyle(square);
            const color = style.backgroundColor;
            if (color === "rgb(255, 0, 0)"){
                square_indexes.push(squares.indexOf(square));
            };
        });
        let test = [];
        square_indexes.forEach(function(index){
            test.push(squares[index])
        });
        let counter = 0;
        test.forEach(function(square){
            if (red_squares.includes(square)){
                counter++;
            }
        });
        if (counter === 4){
            return false;
        }
    } else if (turn){
        squares.forEach(function(square){
            const style = getComputedStyle(square);
            const color = style.backgroundColor;
            if (color === "rgb(0, 0, 255)"){
                square_indexes.push(squares.indexOf(square));
            };
        });
        let test = [];
        square_indexes.forEach(function(index){
            test.push(squares[index]);
        });
        let counter = 0;
        test.forEach(function(square){
            if (blue_squares.includes(square)){
                counter++;
            }
        })
        if (counter === 4){
            return false
        }
    };
    if (square_indexes.length !== 4){return false};
    let longer_line = [];
    const range = square_indexes[3] - square_indexes[0];
    if (range === 8 || range === 9){
        square_indexes.forEach(function(square){
            const negfour = square - 4;
            const posfour = square + 4;
            if (square_indexes.includes(negfour) || square_indexes.includes(posfour) || longer_line.includes(negfour) || longer_line.includes(posfour)){
                longer_line.push(square)
            }
        });
        if (longer_line.length !== 3){return false};
        square_indexes.forEach(function(square){
            if (!longer_line.includes(square)){
                square_indexes.unshift(square)
            }
        })
        const max = Math.max(...longer_line);
        const min = Math.min(...longer_line);
        if (square_indexes[0] + 1 === max || square_indexes[0] - 1 === min || square_indexes[0] + 1 === min || square_indexes[0] - 1 === max){
            return true
        } else {
            return false
        }
    } else if (range === 4 || range === 6){
        square_indexes.forEach(function(square){
            const negfour = square - 1;
            const posfour = square + 1;
            if (square_indexes.includes(negfour) || square_indexes.includes(posfour) || longer_line.includes(negfour) || longer_line.includes(posfour)){
                longer_line.push(square)
            }
        });
        if (longer_line.length !== 3){return false};
        square_indexes.forEach(function(square){
            if (!longer_line.includes(square)){
                square_indexes.unshift(square)
            }
        });
        const max = Math.max(...longer_line);
        const min = Math.min(...longer_line);
        if (square_indexes[0] + 4 === max || square_indexes[0] - 4 === min || square_indexes[0] + 4 === min || square_indexes[0] - 4 === max){
            return true
        } else {
            return false
        };
    };
    return false;
};

const horizontalwincalculation = function(){
    const starters = [0, 1, 4, 5, 8, 9, 12, 13];
    let test = [];
    let possible = 0;
    let valind = [];
    if (!turn){
        squares.forEach(function(square){
            const style = getComputedStyle(square);
            const color = style.backgroundColor;
            if ((color === "rgb(255, 0, 0)" || color === "rgb(255, 255, 255)") && !square.firstChild){
                valind.push(squares.indexOf(square));
            };
        });
    } else if (turn){
        squares.forEach(function(square){
            const style = getComputedStyle(square);
            const color = style.backgroundColor;
            if ((color === "rgb(0, 0, 255)" || color === "rgb(255, 255, 255)") && !square.firstChild){
                valind.push(squares.indexOf(square));
            };
        });
    };
    starters.forEach(function(val){
        const plus1 = val + 1;
        const plus2 = val + 2;
        if (valind.includes(val) && valind.includes(plus1) && valind.includes(plus2)){
            test.push(val);
            test.push(plus1);
            test.push(plus2);
            const max = Math.max(...test);
            const min = Math.min(...test);
            const minminus = min - 4;
            const minplus = min + 4;
            const maxminus = max - 4;
            const maxplus = max + 4;
            const checkers = [minminus, minplus, maxminus, maxplus];
            checkers.forEach(function(thing){
                if (thing === minminus || thing === maxminus){
                    if ((val === 12 || val === 13 || val === 4 || val === 5 || val === 8 || val === 9) && (valind.includes(thing))){
                        possible++;
                    } else {
                        return;
                    };
                } else if (thing === minplus || thing === maxplus){
                    if ((val === 0 || val === 1 || val === 4 || val === 5 || val === 8 || val === 9) && (valind.includes(thing))){
                        possible++;
                    } else {
                        return;
                    }
                }
            });
            test.length = 0;
        } else {
            return;
        };
    });
    return possible;
};

const verticalwincalculation = function(){
    const starters = [0, 1, 2, 3, 4, 5, 6, 7];
    let test = [];
    let possible = 0;
    let valind = [];
    if (!turn){
        squares.forEach(function(square){
            const style = getComputedStyle(square);
            const color = style.backgroundColor;
            if ((color === "rgb(255, 0, 0)" || color === "rgb(255, 255, 255)") && !square.firstChild){
                valind.push(squares.indexOf(square));
            };
        });
    } else if (turn){
        squares.forEach(function(square){
            const style = getComputedStyle(square);
            const color = style.backgroundColor;
            if ((color === "rgb(0, 0, 255)" || color === "rgb(255, 255, 255)") && !square.firstChild){
                valind.push(squares.indexOf(square));
            };
        });
    };
    starters.forEach(function(num){
        const plus4 = num + 4;
        const plus8 = num + 8;
        if (valind.includes(num) && valind.includes(plus4) && valind.includes(plus8)){
            test.push(num);
            test.push(plus4);
            test.push(plus8);
            const min = Math.min(...test);
            const max = Math.max(...test);
            const minminus = min - 1;
            const minplus = min + 1;
            const maxminus = max - 1;
            const maxplus = max + 1;
            const checkers = [minminus, minplus, maxminus, maxplus];
            checkers.forEach(function(thing){
                if (thing === minminus || thing === maxminus){
                    if ((num === 3 || num === 7 || num === 1 || num === 2 || num === 5 || num === 6) && (valind.includes(thing))){
                        possible++;
                    } else {
                        return;
                    };
                } else if (thing === minplus || thing === maxplus){
                    if ((num === 0 || num === 4 || num === 1 || num === 2 || num === 5 || num === 6) && (valind.includes(thing))){
                        possible++;
                    } else {
                        return;
                    }
                }
            });
            test.length = 0;
        } else {
            return;
        };
    });
    return possible;
};

const wincalculation = function(){
    let final = (horizontalwincalculation() + verticalwincalculation())
    final--;
    return final
}

const clicked = function(event){
    if (!click){
        click = true
        const style = getComputedStyle(event.target)
        const color = style.backgroundColor
        if (turn && !event.target.firstChild && (color === "rgb(255, 255, 255)" || color === "rgb(0, 0, 255)")) {
            blue_squares.forEach(item => item.style.backgroundColor = "rgb(117, 192, 218)");
            event.target.style.backgroundColor = "blue";
            squares.forEach(function(square){
                square.style.cursor = 'grabbing'
                const style = getComputedStyle(square)
                const color = style.backgroundColor
                if ((color === "rgb(255, 255, 255)" || color === "rgb(117, 192, 218)") && !square.firstChild){
                    square.addEventListener('mouseover', callmeblue)
                }
            })
        } else if (!turn && !event.target.firstChild && (color === "rgb(255, 255, 255)" || color === "rgb(255, 0, 0)")){
            red_squares.forEach(item => item.style.backgroundColor = "lightcoral")
            event.target.style.backgroundColor = "red";
            squares.forEach(function(square){
                square.style.cursor = 'grabbing'
                const style = getComputedStyle(square)
                const color = style.backgroundColor
                if ((color === "rgb(255, 255, 255)" || color === "rgb(240, 128, 128)") && !square.firstChild){
                    square.addEventListener('mouseover', callmered);
                }
            })
        }
    } else {
        click = false
        if (!movecalculation()){
            squares.forEach(function(square){
                square.removeEventListener('mouseover', callmered)
                square.removeEventListener('mouseover', callmeblue)
                const style = getComputedStyle(square)
                const color = style.backgroundColor
                if ((color === "rgb(255, 0, 0)" && !red_squares.includes(square)) || (color === "rgb(0, 0, 255)" && !blue_squares.includes(square)) || (color === 'rgb(255, 255, 255)' && !square.firstChild)){
                    square.style.cursor = 'grab'
                    square.style.backgroundColor = "white"
                } else if (red_squares.includes(square)){
                    square.style.backgroundColor = "red"
                    if (!turn){
                        square.style.cursor = "grab"
                    } else {
                        square.style.cursor = 'default'
                    }
                } else if (blue_squares.includes(square)){
                    square.style.backgroundColor = "blue"
                    if (turn){
                        square.style.cursor = "grab"
                    } else {
                        square.style.cursor = 'default'
                    }
                } else if (square.firstChild){
                    square.style.cursor = 'default'
                } 
            })
        } else {
            if (turn){
                turn = false
                blue_squares.length = 0
                squares.forEach(function(square){
                    square.style.cursor = 'default'
                    square.removeEventListener('mouseover', callmeblue)
                    const style = getComputedStyle(square)
                    const color = style.backgroundColor
                    if (color === "rgb(0, 0, 255)"){
                        blue_squares.push(square)
                    } else if (color === "rgb(117, 192, 218)"){
                        square.style.backgroundColor = "white"
                    }
                })
            } else {
                turn = true
                red_squares.length = 0
                squares.forEach(function(square){
                    square.style.cursor = 'default'
                    square.removeEventListener('mouseover', callmered)
                    const style = getComputedStyle(square)
                    const color = style.backgroundColor
                    if (color === "rgb(255, 0, 0)"){
                        red_squares.push(square)
                    } else if (color === "rgb(240, 128, 128)"){
                        square.style.backgroundColor = "white"
                    }
                })
            }
            if (wincalculation() > 0){
                table.removeEventListener('click', clicked)
                piece1.addEventListener('click', blackpiececlick)
                piece2.addEventListener('click', blackpiececlick)
                skipbutton.addEventListener('click', continuegame)
                skipbutton.style.visibility = 'visible'
                piece1.style.cursor = 'pointer'
                piece2.style.cursor = 'pointer'
                turntracker.innerHTML = 'Move Piece'
            } else {
                table.removeEventListener('click', clicked)
                if (turn){
                    turntracker.innerHTML = 'Blue Wins!'
                } else {
                    turntracker.innerHTML = 'Red Wins!'
                }
                movecounter.innerHTML = 'Possible Moves: ' + String(wincalculation())
            }
        }
    }
}

const continuegame = function(){
    movecounter.innerHTML = "Possible Moves: " + String(wincalculation())
    table.addEventListener('click', clicked)
    skipbutton.style.visibility = 'hidden'
    piece1.removeEventListener('click', blackpiececlick)
    piece1.style.cursor = 'default'
    piece2.removeEventListener('click', blackpiececlick)
    piece2.style.cursor = 'default'
    squares.forEach(function(square){
        square.removeEventListener('click', squareclick)
        const style = getComputedStyle(square)
        const color = style.backgroundColor
        if (turn){
            if ((color === 'rgb(255, 255, 255)' || color === 'rgb(0, 0, 255)') && !square.firstChild){
                square.style.cursor = 'grab'
            }
        } else {
            if ((color === 'rgb(255, 255, 255)' || color === 'rgb(255, 0, 0)') && !square.firstChild){
                square.style.cursor = 'grab'
            }
        }
    })
    pieces.forEach(function(piece){
        piece.style.backgroundColor = "black"
    })
    if (turn){
        turntracker.innerHTML = "Blue's Turn"
    } else {
        turntracker.innerHTML = "Red's Turn"
    }
    if (wincalculation() === 0){
        table.removeEventListener('click', clicked)
        squares.forEach(function(square){
            square.style.cursor = 'default'
        })
        if (turn){
            turntracker.innerHTML = 'Red Won!'
        } else {
            turntracker.innerHTML = 'Blue Won!'
        }
        movecounter.innerHTML = "Possible Moves: " + String(wincalculation())
    }
}

const squareclick = function(event){
    pieces.forEach(function(piece){
        piece.removeEventListener('click', blackpiececlick)
    })
    piece.style.backgroundColor = 'black'
    squares.forEach(function(square){
        square.removeEventListener('click', squareclick)
    })
    piece.parentNode.removeChild(piece)
    event.target.appendChild(piece)
    if (wincalculation() > 0){
        continuegame()
    } else {
        turn = !turn
        table.removeEventListener('click', clicked)
        squares.forEach(function(square){
            square.style.cursor = 'default'
        })
        if (turn){
            turntracker.innerHTML = 'Red Won!'
        } else {
            turntracker.innerHTML = 'Blue Won!'
        }
        skipbutton.style.visibility = 'hidden'
        piece1.style.cursor = 'default'
        piece2.style.cursor = 'default'
        movecounter.innerHTML = "Possible Moves: " + String(wincalculation())
    }
}

const blackpiececlick = function(event){
    piece = event.target
    event.target.style.backgroundColor = "gray"
    pieces.forEach(function(test){
        if (test !== piece){
            test.style.backgroundColor = "black"
        }
    })
    squares.forEach(function(square){
        const style = getComputedStyle(square)
        const color = style.backgroundColor
        if (color === "rgb(255, 255, 255)" && !square.firstChild){
            square.addEventListener('click', squareclick)
            square.style.cursor = 'pointer'
        }
    })
}

blueturn.addEventListener('click', function(event){
    event.target.style.visibility = 'hidden'
    redturn.style.visibility = 'hidden'
    turn = true
    turntracker.style.visibility = 'visible'
    turntracker.innerHTML = "Blue's Turn"
    table.addEventListener('click', clicked)
    squares.forEach(function(square){
        const style = getComputedStyle(square)
        const color = style.backgroundColor
        if ((color === "rgb(0, 0, 255)" || color === "rgb(255, 255, 255)") && !square.firstChild){
            square.style.cursor = 'grab'
        } 
    })
    movecounter.innerHTML = 'Possible Moves: ' + String(wincalculation())
})

redturn.addEventListener('click', function(event){
    event.target.style.visibility = 'hidden'
    blueturn.style.visibility = 'hidden'
    turn = false
    turntracker.style.visibility = 'visible'
    turntracker.innerHTML = "Red's Turn"
    table.addEventListener('click', clicked)
    squares.forEach(function(square){
        const style = getComputedStyle(square)
        const color = style.backgroundColor
        if ((color === "rgb(255, 0, 0)" || color === "rgb(255, 255, 255)") && !square.firstChild){
            square.style.cursor = 'grab'
        } 
    })
    movecounter.innerHTML = 'Possible Moves: ' + String(wincalculation())
})
