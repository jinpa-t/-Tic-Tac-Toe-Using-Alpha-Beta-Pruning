/*
* file: script.js
* author: Jinpa Tsering
* date: 6/17/2022
* description: Computer vs. player tic-tac-toe game using aplpha-beta
*              pruning in plain javascript.
*              Each player takes a turn selecting a spot, then their selection
*              is stored inside the states array and checked after each turn.
*              If the game is over, notify the user.
*/

const one = document.getElementById("one")
const two = document.getElementById("two")
const three = document.getElementById("three")
const four = document.getElementById("four")
const five = document.getElementById("five")
const six = document.getElementById("six")
const seven = document.getElementById("seven")
const eight = document.getElementById("eight")
const nine = document.getElementById("nine")
const winDisp = document.getElementById("winner")
const notice = document.getElementById("notice")
const reset = document.getElementById("reset")

let states = {
    1: "", 2: "", 3: "",
    4: "", 5: "", 6: "",
    7: "", 8: "", 9: ""
}
let real_board = [[ '_', '_', '_' ],
                   [ '_', '_', '_' ],
                   [ '_', '_', '_' ]];

let gameOver = false;
// if current is set to 0 computer will go first
// current can be 0 or 1
var current = 1;
var count = 9; // count down to zero
if (current == 0) {
    notice.innerHTML = "Computer goes first";
    setTimeout(computerTurn,1000);
} else {
    notice.innerHTML = "Player goes first";
}

// set player names
let comp = "x", player = "o";
if(current == 1){
    comp = "o";
    player = "x";
}

function isMoveLeft(board){
    for(var i = 0 ; i < 3; i++){
        for(var j = 0 ; j < 3; j++){
            if(board[i][j] == '_') 
                return true;
        }
    }
    return false;
}


function evaluate(board){
    // check row
    for(var i = 0 ; i < 3; i++){
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2] ) {
            if(board[i][0] == comp){
                return +10;
            } else if(board[i][0] == player) {
                return -10;
            }
        }
    }
    // check columns
    for(var j = 0 ; j < 3; j++){
        if(board[0][j] == board[1][j] && board[1][j] == board[2][j] ) {
            if(board[0][j] == comp){
                return +10;
            } else if(board[0][j] == player) {
                return -10;
            }
        }
    }
    // check diagonals
    if(board[0][0] == board[1][1] && board[1][1] == board[2][2] ) {
            if(board[0][0] == comp){
                return +10;
            } else if(board[0][0] == player) {
                return -10;
            }
    }
    // check diagonals
    if(board[2][0] == board[1][1] && board[1][1] == board[0][2] ) {
            if(board[2][0] == comp){
                return +10;
            } else if(board[2][0] == player) {
                return -10;
            }
    }
    return 0;
}

function minimax(board,depth,isMax, alpha, beta) {
    let score = evaluate(board);
    if(score == 10){
        return score;
    }
    if(score == -10){
        return score;
    }
    if(!isMoveLeft(board)){
        return 0;
    }
    if(isMax)
    {
        let best = -Infinity; // worst score for maximizer
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++){
                if (board[i][j]=='_')
                {
                    board[i][j] = comp;
                    best = Math.max(best, minimax(board,depth+1,!isMax,alpha,beta));
                    board[i][j] = '_';                    
                    alpha = Math.max(alpha,best);
                }
                if(beta <= alpha){
                    break;    
                }
            }
        }
        return best - depth;
    } else {
        let best = Infinity; // worst score for minimizer
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {                 
                if (board[i][j] == '_')
                {
                    board[i][j] = player;
                    best = Math.min(best, minimax(board,depth+1,!isMax, alpha, beta));   
                    board[i][j] = '_';
                    beta = Math.min(beta,best);
                }
                if(beta <= alpha){
                    break;
                }
            }
        }
        return best + depth;
    }
}

function findBestMove(board) {
    let best = -Infinity;
    let move = [-1,-1];
    for(var i = 0 ; i < 3; i++) {
        for(var j = 0 ; j < 3; j++) {
            if(board[i][j] == '_') {
                board[i][j] = comp;
                var maximize = false;
                //if(comp == 'o') maximize = true;
                let moveVal = minimax(board, 0, maximize,-Infinity,+Infinity);
                board[i][j] = '_';
                if(moveVal > best) {
                    move[0] = i;
                    move[1] = j;
                    best = moveVal;
                }
            }
        }
    }
    return move;
}

// Just testing to see if the algorithm works
// if(isMoveLeft(real_board)){
// let best_mov = findBestMove(real_board);
// console.log("Best: ",best_mov);
// } else {
//     console.log("no moves left")
// }

function computerTurn() {
    let best_mov = findBestMove(real_board);
    //console.log(best_mov[0],best_mov[1])
    if(best_mov[0] == -1 && best_mov[1] == -1) {
        return;
    }
    if (best_mov[0] == 0 && best_mov[1] == 0 && !one.disabled) {        
        one.click();
    }
    else if (best_mov[0] == 0 && best_mov[1] == 1 && !two.disabled) {
        two.click();
    }
    else if (best_mov[0] == 0 && best_mov[1] == 2 && !three.disabled) {
        three.click();
    }
    else if (best_mov[0] == 1 && best_mov[1] == 0 && !four.disabled) {
        four.click();
    }
    else if (best_mov[0] == 1 && best_mov[1] == 1 && !five.disabled) {
        five.click();
    }
    else if (best_mov[0] == 1 && best_mov[1] == 2 && !six.disabled) {
        six.click();
    }
    else if (best_mov[0] == 2 && best_mov[1] == 0 && !seven.disabled) {
        seven.click();
    }
    else if (best_mov[0] == 2 && best_mov[1] == 1 && !eight.disabled) {
        eight.click();
    }
    else if (best_mov[0] == 2 && best_mov[1] == 2 && !nine.disabled) {
        nine.click();
    }
    
    real_board[best_mov[0]][best_mov[1]] = comp;
        
}

function notifyPlayerTurn() {
    if (current) {
        notice.innerHTML = "Player: "+player+"'s turn";
    } else {
        notice.innerHTML = "Computer: "+comp+"'s turn";
        computerTurn();
    }
}

function setBtnDisabledState(val) {
    one.disabled = val;
    two.disabled = val;
    three.disabled = val;
    four.disabled = val;
    five.disabled = val;
    six.disabled = val;
    seven.disabled = val;
    eight.disabled = val;
    nine.disabled = val;
}

function notifyWinner(plr) {
    gameOver = true;
    if (plr == "Draw") {
        winDisp.innerHTML = "Draw";
        notice.innerHTML = "Game over";
    } else {
        winDisp.innerHTML = (plr == player)? "You win!":"Computer wins!";
        notice.innerHTML = "Game over";
    }
}

function checkIfGameIsOver() {
    if (states[1] == 'x' && states[2] == 'x' && states[3] == 'x') {
        notifyWinner("x");
        setBtnDisabledState(true);
    }
    else if (states[1] == 'x' && states[4] == 'x' && states[7] == 'x') {
        notifyWinner("x");
        setBtnDisabledState(true);
    }
    else if (states[4] == 'x' && states[5] == 'x' && states[6] == 'x') {
        notifyWinner("x");
        setBtnDisabledState(true);
    }
    else if (states[7] == 'x' && states[8] == 'x' && states[9] == 'x') {
        notifyWinner("x");
        setBtnDisabledState(true);
    }
    else if (states[3] == 'x' && states[6] == 'x' && states[9] == 'x') {
        notifyWinner("x");
        setBtnDisabledState(true);
    }
    else if (states[1] == 'x' && states[5] == 'x' && states[9] == 'x') {
        notifyWinner("x");
        setBtnDisabledState(true);
    }
    else if (states[7] == 'x' && states[5] == 'x' && states[3] == 'x') {
        notifyWinner("x");
        setBtnDisabledState(true);
    }
    else if (states[2] == 'x' && states[5] == 'x' && states[8] == 'x') {
        notifyWinner("x");
        setBtnDisabledState(true);
    } //check for o
    else if (states[1] == 'o' && states[2] == 'o' && states[3] == 'o') {
        notifyWinner("o");
        setBtnDisabledState(true);
    }
    else if (states[1] == 'o' && states[4] == 'o' && states[7] == 'o') {
        notifyWinner("o");
        setBtnDisabledState(true);
    }
    else if (states[4] == 'o' && states[5] == 'o' && states[6] == 'o') {
        notifyWinner("o");
        setBtnDisabledState(true);
    }
    else if (states[7] == 'o' && states[8] == 'o' && states[9] == 'o') {
        notifyWinner("o");
        setBtnDisabledState(true);
    }
    else if (states[3] == 'o' && states[6] == 'o' && states[9] == 'o') {
        notifyWinner("o");
        setBtnDisabledState(true);
    }
    else if (states[1] == 'o' && states[5] == 'o' && states[9] == 'o') {
        notifyWinner("o")
        setBtnDisabledState(true);
    }
    else if (states[7] == 'o' && states[5] == 'o' && states[3] == 'o') {
        notifyWinner("o");
        setBtnDisabledState(true);
    }
    else if (states[2] == 'o' && states[5] == 'o' && states[8] == 'o') {
        notifyWinner("o");
        setBtnDisabledState(true);
    } 
    else {
        // check for draw
        if (count == 0) {
            notifyWinner("Draw");
        }
    }
}

////////////////////////////////// 
// function description for 9 buttons:
//     checks which player clicked the button: o or x
//     set o or x in html button
//     set state for the button: o or x;
//     decrement count by 1
//     disable button
//     check if game is over by calling checkIfGameIsOver()
//     if the game is not call notifyPlayerTurn()
////////////////////////////////// 

function buttonClicked(btn,index,i,j) {
    if(current != 0){
        real_board[i][j] = player;
    }
    btn.value = (current) ? player : comp;
    states[index] = (current) ? player : comp;
    current = 1 - current;
    count--;
    btn.disabled = true;
    checkIfGameIsOver();
    if(!gameOver) notifyPlayerTurn()
}

one.onclick = function () {
    buttonClicked(one,1,0,0);
}

two.onclick = function () {
    buttonClicked(two,2,0,1);
}

three.onclick = function () {
    buttonClicked(three,3,0,2);
}

four.onclick = function () {
    buttonClicked(four,4,1,0);
}

five.onclick = function () {
    buttonClicked(five,5,1,1);
}

six.onclick = function () {
   buttonClicked(six,6,1,2); 
}

seven.onclick = function () {
    buttonClicked(seven,7,2,0);
}

eight.onclick = function () {
    buttonClicked(eight,8,2,1);
}

nine.onclick = function () {
    buttonClicked(nine,9,2,2);
}


// Reset the game and let the computer go first.
reset.onclick = function () {
    for (x in states) {
        states[x] = "";
    }
    setBtnDisabledState(false)
    real_board = [[ '_', '_', '_' ],
                   [ '_', '_', '_' ],
                   [ '_', '_', '_' ]];
    one.value = "  ";
    two.value = "  ";
    three.value = "  ";
    four.value = "  ";
    five.value = "  ";
    six.value = "  ";
    seven.value = "  ";
    eight.value = "  ";
    nine.value = "  ";

    gameOver = false;
    count = 9;
    current = 0; // 0 means computer goes first
    comp = 'x';
    player = 'o';
    if (current) {
        notice.innerHTML = "Player goes first";
    } else {
        notice.innerHTML = "Computer goes first";
        computerTurn();
    }

    winDisp.innerHTML = "";
}
