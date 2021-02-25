

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
    return { addGrid, addBoardContents };

})();



const gameBoard = (() => {

    let gameContents = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];

    const addX = (pos) => {
        gameContents.splice(pos, 1, 'X');
        displayController.addBoardContents();
    }
    const addO = (pos) => {
        gameContents.splice(pos, 1, 'O');
        displayController.addBoardContents();
    }
    return {  gameContents, addX, addO  };
})();

const gameLogic = (() => {

    let alternator = 'X';

    const checkWin = () => {
        console.log('checkWin');
    }
    const turn = (e) => {
        let targ = e.target.id;
        let targElement = document.getElementById(`${targ}`);
        if(targElement.innerHTML !== 'X' && targElement.innerHTML !== 'O'){
            if(alternator === 'O') {
                gameBoard.addX(targ);
                alternator = 'X';
                console.log(alternator);
            }
            else if(alternator === 'X') {
                gameBoard.addO(targ);
                alternator = 'O';
                console.log(alternator);
            }
        }
        
    }
    
    return {  alternator, checkWin, turn  };
})();




function score () {
    console.log('score');
}



// const playerCreate = (name, age) => {
//     const getAge = () => console.log(age);
//     const sayHello = () => console.log('hello!');
//     return { name, age, sayHello, getAge };
//   };
  
//   const x = playerCreate('X', 12);
//   const o = playerCreate('O', 12);