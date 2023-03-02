

const cellListener = (id) => {
  console.log(id);
};


const displayController = (()=> {

  function displayCells(array) {
    const board = document.querySelector('.board');
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = array[i]
      cell.addEventListener('click', () => cellListener(i));
      board.appendChild(cell);
    }
  }

  return {displayCells}
})();


const gameBoard = (() => {
  const cells = ['X', 'X','X','X','X','X','X','X','X']

  return {cells}
})();

displayController.displayCells(gameBoard.cells);