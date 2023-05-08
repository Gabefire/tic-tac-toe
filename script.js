const GameBoard = (() => {
  const gameBoardArray = new Array(9).fill("");

  const addMarker = (playerMarker, location) => {
    gameBoardArray.splice(location, 1, playerMarker);
  };

  const displayBoard = () => {
    const cells = document.querySelectorAll(".cell");
    let indexNum = 0;
    cells.forEach((cell) => {
      const block = cell;
      block.textContent = gameBoardArray[indexNum];
      indexNum += 1;
    });
  };

  const checkWinner = () => {
    if (gameBoardArray[0] === gameBoardArray[1] === gameBoardArray[2]) {
      return true
    }
    else if (gameBoardArray[0] === gameBoardArray[1] === gameBoardArray[2]) {return true};

    }
  };
  return {
    addMarker,
    displayBoard,
  };
})();

const playerFactory = (mark) => {
  return { mark };
};

const Game = () => {
  /* player constructor */
  const player1 = playerFactory("x");
  const player2 = playerFactory("o");
  let currentPlayer = player1.mark;
  function nextPlayer() {
    if (currentPlayer === player1.mark) {
      currentPlayer = player2.mark;
    } else {
      currentPlayer = player1.mark;
    }
  }
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      let index = e.target.id;
      index = index.slice(-1);
      GameBoard.addMarker(currentPlayer, index);
      const results = GameBoard.checkWinner;
      if (results) {
        console.log(`${currentPlayer} wins!`);
      }
      nextPlayer();
      GameBoard.displayBoard();
    });
  });
};

Game();
