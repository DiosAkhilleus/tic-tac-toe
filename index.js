window.addEventListener('load', start);

function start () {
    displayController.addGrid();
    displayController.addBoardContents();
}

const gameBoard = (() => {
    let gameContents = ['X', 'O', 'X', 'X', 'O', 'O', 'X', 'X'];
    const addX = () => {
        gameContents.push('X');
        displayController.addBoardContents();
    }
    const addO = () => {
        gameContents.push('O');
        displayController.addBoardContents();
    }
    const pop = () => gameContents.pop();
    const getGame = () => console.log(gameContents);
    return {  getGame, gameContents, addX, addO, pop  };
})();

const displayController = (() => {
    const addGrid = () => {
        for(let i = 0; i < 9; i++){
            let div = document.createElement('DIV');
            div.setAttribute('class', 'grid');
            div.setAttribute('id', `${i}`);
            document.getElementById('gameContainer').appendChild(div);
        }
    }
    const addBoardContents = () => {
        let game = gameBoard.gameContents;
        let cont = document.getElementById('gameContainer');
        for(let i = 0; i < cont.childElementCount; i++){
            document.getElementById(`${i}`).innerHTML = game[i];
        }
    }
    return { addGrid, addBoardContents };

})();

const playerCreate = (name, age) => {
    const getAge = () => console.log(age);
    const sayHello = () => console.log('hello!');
    return { name, age, sayHello, getAge };
  };
  
  const x = playerCreate('X', 12);
  const o = playerCreate('O', 12);