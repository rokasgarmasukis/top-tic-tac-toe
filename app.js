//
// GameBoard
//

function GameBoard() {
  const cells = [];

  for (let i = 0; i < 9; i++) {
    cells[i] = '';
  }

  const getCells = () => cells;

  return { getCells };
}

//
// Screen Controller
//

function ScreenController() {
  const removeCells = (boardDiv) => {
    let child = boardDiv.lastElementChild;
    while (child) {
      boardDiv.removeChild(child);
      child = boardDiv.lastElementChild;
    }
  };

  const displayBoard = (cells, playRound) => {
    const board = document.querySelector('.board');
    removeCells(board);
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = cells[i];
      cell.addEventListener('click', () => playRound(i));
      board.appendChild(cell);
    }
  };

  const disableBoard = () => {
    const board = document.querySelector('.board')
    board.classList.add('disabled')
  }
  
  const enableBoard = () => {
    const board = document.querySelector('.board')
    board.classList.remove('disabled')
  }
  

  const displayResult = (player) => {
    const info = document.querySelector('.info')
    info.innerText = `${player.name} has won!`
  }

  return { displayBoard, disableBoard, enableBoard, displayResult };
}

//
// Game Controller
//

function GameController(
  playerOneName = 'Player One',
  playerTwoName = 'Player Two'
) {
  const board = GameBoard();
  const screen = ScreenController();

  const players = [
    {
      name: playerOneName,
      sign: 'X',
    },
    {
      name: playerTwoName,
      sign: 'O',
    },
  ];

  let activePlayer = players[0];

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (cellnum) => {
    if (board.getCells()[cellnum] === '') {
      board.getCells()[cellnum] = activePlayer.sign;
      switchActivePlayer();
      screen.displayBoard(board.getCells(), playRound);
    }
    if (checkForWin() === true) {
      screen.displayResult(activePlayer)
      screen.disableBoard();
    }
  };

  const checkForWin = () => {
    const cells = board.getCells();
    if (cells[0] === cells[1] && cells[1] === cells[2] && cells[2] !== '') return true;
    if (cells[3] === cells[4] && cells[4] === cells[5] && cells[5] !== '') return true;
    if (cells[6] === cells[7] && cells[7] === cells[8] && cells[8] !== '') return true;
    if (cells[0] === cells[3] && cells[3] === cells[6] && cells[6] !== '') return true;
    if (cells[1] === cells[4] && cells[4] === cells[7] && cells[7] !== '') return true;
    if (cells[2] === cells[5] && cells[5] === cells[8] && cells[8] !== '') return true;
    if (cells[0] === cells[4] && cells[4] === cells[8] && cells[8] !== '') return true;
    if (cells[2] === cells[4] && cells[4] === cells[6] && cells[6] !== '') return true;
    return false;
  }

  const init = () => {
    screen.displayBoard(board.getCells(), playRound);
  };

  return { init };
}

const game = GameController();
game.init();
