

window.addEventListener('load', start);

function start () {
    displayController.addGrid();
    displayController.addBoardContents();
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
    const addBoardContents = () => {
        let game = gameBoard.gameContents;
        let cont = document.getElementById('gameContainer');
        for(let i = 0; i < cont.childElementCount; i++){
            if(game[i] !== 'N')
            document.getElementById(`${i}`).innerHTML = game[i];
        }
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
    return { addGrid, addBoardContents, end };

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

    let alternator = 'X';
    let state = "Playing";

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
        
    }
    const turn = (e) => {
        let targ = e.target.id;
        let targElement = document.getElementById(`${targ}`);
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
    
    return {  alternator, state, checkWin, turn,  arraysEqual};
})();

function score () {
    console.log('score');
}



const playerCreate = (name, choice) => {

    const sayHello = () => console.log('hello!');

    return { name, choice, sayHello };
  };