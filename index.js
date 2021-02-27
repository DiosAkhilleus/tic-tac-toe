
window.addEventListener('load', grid);

function resetStatus () {
    document.getElementById('stat').innerHTML="Game Status: Not Playing Yet";
}

function start () {
    //displayController.addGrid();
    displayController.addBoardContents();
}
function grid () {
    displayController.addGrid();
    document.getElementById('stat').innerHTML = `Game Status: ${gameLogic.state}`;
}
function getRandomInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
        let container = document.getElementById('gameContainer');
        for(let i = 0; i < 9; i++){
            container.removeChild(document.getElementById(`${i}`));
        }
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
            document.getElementById('stat').innerHTML = `Game Status: ${state}`;
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

    const resetContents = () => {
        gameContents.splice(0, 9, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N');
    }
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
    return {  gameContents, addX, addO, resetContents  };
})();

const gameLogic = (() => {

    let alternator = '';
    let state = "Not Playing Yet";

    const setState = (str) => {
        state = str;
        gameLogic.checkWin();
        document.getElementById('stat').innerHTML = `Game Status: ${state}`;
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

        if(gameBoard.gameContents.indexOf('N') == -1 && state !== 'O Wins!' & state !== 'X Wins!'){
            state = "It's A Tie!";
            displayController.end(state);
        }
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
                aiMove();
                
            }
        }
        
    }
    const aiMove = () => {
        if(gameBoard.gameContents.indexOf('N') !== -1){
            let rand = getRandomInt(0, 8);
            while(gameBoard.gameContents[rand] !== 'N'){
                rand = getRandomInt(0, 8);
                console.log(rand);
            }
            let randEl = document.getElementById(`${rand}`);
            if(state !== 'X Wins!' && state !== 'O Wins!'){
                if(randEl.innerHTML !== 'X' && randEl.innerHTML !== 'O'){
                    if(alternator === 'O') {
                        alternator = 'X';
                        gameBoard.addX(rand);
                    }
                    else if(alternator === 'X') {
                        alternator = 'O';
                        gameBoard.addO(rand);
                    }
                }
            }
        }
    }
    const newGame = () => {
        
        gameLogic.setState('Not Playing Yet');
        gameBoard.resetContents();
        displayController.clearGrid();
        displayController.addGrid();
        console.log(gameBoard.gameContents);
        // displayController.addBoardContents();
        resetStatus();
        tokenControl.resetTokens();
    }
    
    return {  alternator, state, checkWin, turn,  arraysEqual, aiMove, newGame, setState, setAlternator  };
})();


const tokenControl = (() => {

    const resetTokens = () => {
        gameLogic.setState('Not Playing Yet');
        setX.style.backgroundColor="cadetblue";
        setX.style.cursor='pointer';
        setX.style.pointerEvents='';
        setO.style.pointerEvents='';
        setO.style.backgroundColor="cadetblue";
        setO.style.cursor='pointer';
    }

    const chooseX = () => {
        gameLogic.setState('Playing');
        gameLogic.setAlternator('O');
        setX.style.backgroundColor="rgb(80, 200, 80)";
        setX.style.cursor='default';
        setX.style.pointerEvents='none';
        setO.style.pointerEvents='none';
    }
    const chooseO = () => {
        gameLogic.setState('Playing');
        gameLogic.setAlternator('X');
        setO.style.backgroundColor="rgb(80, 200, 80)";
        setO.style.cursor='default';
        setO.style.pointerEvents='none';
        setX.style.pointerEvents='none';
    }
    return { chooseX, chooseO, resetTokens };

})();


let setX = document.getElementById('choiceX');
let setO = document.getElementById('choiceO');
let reset = document.getElementById('reset');
setX.addEventListener('click', tokenControl.chooseX);
setO.addEventListener('click', tokenControl.chooseO);
reset.addEventListener('click', gameLogic.newGame);

const playerCreate = (name, choice) => {

    const sayHello = () => console.log('hello!');

    return { name, choice, sayHello };
  };
