//
// GameBoard
//

function GameBoard() {
  const cells = [];


  for (let i = 0; i < 9; i++) {
    cells[i] = '';
  }

  const resetCells = () => {
    for (let i = 0; i < 9; i++) {
      cells[i] = '';
    }
  }

  const getCells = () => cells;

  return { getCells, resetCells };
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
  

  const displayMessage = (message) => {
    const info = document.querySelector('.info')
    info.innerText = message
  }

  return { displayBoard, disableBoard, enableBoard, displayMessage };
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
    if (isWin()) {
      screen.displayMessage(`${activePlayer.name} has won!`)
      screen.disableBoard();
      return;
    }
    if (isDraw()) {
      screen.displayMessage(`Draw!`)
      screen.disableBoard();
    }
  };

  const isWin = () => {
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

  const isDraw = () => {
    let allCellsMarked = true;
    for (cell of board.getCells()) {
      if (cell === '') allCellsMarked = false;
    }
    return allCellsMarked
  }

  const resetGame = () => {
    board.resetCells()
    screen.enableBoard()
    screen.displayMessage('')
    screen.displayBoard(board.getCells(), playRound);
  }

  const init = () => {
    const reset = document.getElementById('reset')
    reset.addEventListener('click', resetGame)
    screen.displayBoard(board.getCells(), playRound);

  };

  return { init };
}

const game = GameController();
game.init();
