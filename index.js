window.addEventListener('load', start);

function start () {
    displayController.addGrid();
    displayController.addBoardContents();
}

const gameBoard = (() => {
    let gameContents = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];
    const addX = () => {
        gameContents.push('X');
        displayController.addBoardContents();
    }
    const addO = () => {
        gameContents.push('O');
        displayController.addBoardContents();
    }
    const checkWin = () => {
        console.log('checkWin');
    }
    
    return {  gameContents, addX, addO, checkWin  };
})();

const displayController = (() => {
    const addGrid = () => {
        for(let i = 0; i < 9; i++){
            let gridElement = document.createElement('DIV');
            gridElement.setAttribute('class', 'grid');
            gridElement.setAttribute('id', `${i}`);
            document.getElementById('gameContainer').appendChild(gridElement);
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

const playerCreate = (name, age) => {
    const getAge = () => console.log(age);
    const sayHello = () => console.log('hello!');
    return { name, age, sayHello, getAge };
  };
  
  const x = playerCreate('X', 12);
  const o = playerCreate('O', 12);