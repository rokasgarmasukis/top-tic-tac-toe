function Cell() {
  let value = '';

  const markCell = (player) => {
    value = player.sign;
  };

  const getValue = () => value;

  return { markCell, getValue };
}

function GameBoard() {
  const cells = [];

  for (let i = 0; i < 9; i++) {
    cells[i] = '';
  }

  const getCells = () => cells;

  return { getCells };
}

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
    board.getCells()[cellnum] = activePlayer.sign;
    switchActivePlayer();
  };

  const run = () => {
    playRound(0);
    screen.displayBoard(board.getCells());
    playRound(1);
    screen.displayBoard(board.getCells());
    playRound(2);
    screen.displayBoard(board.getCells());
  };

  return { run };
}

function ScreenController() {
  const removeCells = (boardDiv) => {
    let child = boardDiv.lastElementChild;
    while (child) {
      boardDiv.removeChild(child);
      child = boardDiv.lastElementChild;
    }
  };

  const displayBoard = (cells) => {
    const board = document.querySelector('.board');
    removeCells(board);
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = cells[i];
      cell.addEventListener('click', () => cellListener(i));
      board.appendChild(cell);
    }
  };

  return { displayBoard };
}

const game = GameController();
game.run();
