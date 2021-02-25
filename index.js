

window.addEventListener('load', grid);

function start () {
    //displayController.addGrid();
    displayController.addBoardContents();
}
function grid () {
    displayController.addGrid();
    document.getElementById('stat').innerHTML = `Game Status: ${gameLogic.state}`;
    console.log("grid");
}

const displayController = (() => {
    const addGrid = () => {
        for(let i = 0; i < 9; i++){
            let gridElement = document.createElement('DIV');
            gridElement.setAttribute('class', 'grid');
            gridElement.setAttribute('id', `${i}`);
            document.getElementById('gameContainer').appendChild(gridElement);
            gridElement.addEventListener('click', gameLogic.turn);
        }
    }
    const clearGrid = () => {
        console.log("Clear");
    }
    const addBoardContents = () => {
        let game = gameBoard.gameContents;
        let cont = document.getElementById('gameContainer');
        for(let i = 0; i < cont.childElementCount; i++){
            if(game[i] !== 'N')
            document.getElementById(`${i}`).innerHTML = game[i];
        }
        gameLogic.checkWin();
    }
    const end = (state) => {
        if(state == 'O Wins!' || state == 'X Wins!' || state == "It's A Tie!"){
            console.log(state);
            for(let i = 0; i < 9; i++){
                let gr = document.getElementById(`${i}`);
                gr.style.pointerEvents = 'none';
            }
        }
    }
    return { addGrid, addBoardContents, end, clearGrid };

})();



const gameBoard = (() => {

    let gameContents = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];

    const addX = (pos) => {
        gameContents.splice(pos, 1, 'X');
        displayController.addBoardContents();
        gameLogic.checkWin();
    }
    const addO = (pos) => {
        gameContents.splice(pos, 1, 'O');
        displayController.addBoardContents();
        gameLogic.checkWin();
    }
    return {  gameContents, addX, addO  };
})();

const gameLogic = (() => {

    let alternator = '';
    let state = "Not Playing Yet";

    const setState = (str) => {
        state = str;
        console.log(state);
        gameLogic.checkWin();
    }
    const setAlternator = (str) => {
        alternator = str;
    }
    const arraysEqual = (a1, a2) => {
        return JSON.stringify(a1)==JSON.stringify(a2);
    }

    const checkWin = () => {
        let winO = ['O', 'O', 'O'];
        let winX = ['X', 'X', 'X'];
        let winStates = 
        [
            [ gameBoard.gameContents[0], gameBoard.gameContents[1], gameBoard.gameContents[2] ],
            [ gameBoard.gameContents[3], gameBoard.gameContents[4], gameBoard.gameContents[5] ],
            [ gameBoard.gameContents[6], gameBoard.gameContents[7], gameBoard.gameContents[8] ],
            [ gameBoard.gameContents[0], gameBoard.gameContents[3], gameBoard.gameContents[6] ],
            [ gameBoard.gameContents[1], gameBoard.gameContents[4], gameBoard.gameContents[7] ],
            [ gameBoard.gameContents[2], gameBoard.gameContents[5], gameBoard.gameContents[8] ],
            [ gameBoard.gameContents[0], gameBoard.gameContents[4], gameBoard.gameContents[8] ],
            [ gameBoard.gameContents[2], gameBoard.gameContents[4], gameBoard.gameContents[6] ]
        ];

        for(let i = 0; i < winStates.length; i++){
            if(arraysEqual(winStates[i], winO)){
                state = "O Wins!";
                displayController.end(state);
            }
            if(arraysEqual(winStates[i], winX)){
                state = "X Wins!";
                displayController.end(state);
            }
        }

        if(gameBoard.gameContents.indexOf('N') == -1){
            state = "It's A Tie!";
            displayController.end(state);
        }
        
        document.getElementById('stat').innerHTML = `Game Status: ${state}`;
    }
    const turn = (e) => {
        let targ = e.target.id;
        let targElement = document.getElementById(`${targ}`);
        if(state !== "Not Playing Yet"){
            if(targElement.innerHTML !== 'X' && targElement.innerHTML !== 'O'){
                if(alternator === 'O') {
                    alternator = 'X';
                    gameBoard.addX(targ);
                }
                else if(alternator === 'X') {
                    alternator = 'O';
                    gameBoard.addO(targ);
                }
            }
        }
        
        
    }
    const aiMove = () => {
        console.log("aiMove()");
    }
    const newGame = () => {
        console.log('newGame');
    }
    
    return {  alternator, state, checkWin, turn,  arraysEqual, aiMove, newGame, setState, setAlternator  };
})();

function score () {
    console.log('score');
}





let setX = document.getElementById('choiceX');
let setO = document.getElementById('choiceO');

setX.addEventListener('click', chooseX);
setO.addEventListener('click', chooseO);

function chooseX () {
    gameLogic.setState('Playing');
    gameLogic.setAlternator('O');
    setX.style.backgroundColor="rgb(80, 200, 80)";
    setO.style.pointerEvents='none';
}
function chooseO () {
    gameLogic.setState('Playing');
    gameLogic.setAlternator('X');
    setO.style.backgroundColor="rgb(80, 200, 80)";
    setX.style.pointerEvents='none';
}

function make(){
    const joe = playerCreate('Joe', 'X');
    console.log(joe);
}

const playerCreate = (name, choice) => {

    const sayHello = () => console.log('hello!');

    return { name, choice, sayHello };
  };

  