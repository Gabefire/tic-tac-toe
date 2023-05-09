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
    if (
      (gameBoardArray[0] !== "" &&
        gameBoardArray[0] === gameBoardArray[1] &&
        gameBoardArray[0] === gameBoardArray[2]) ||
      (gameBoardArray[3] !== "" &&
        gameBoardArray[3] === gameBoardArray[4] &&
        gameBoardArray[3] === gameBoardArray[5]) ||
      (gameBoardArray[6] !== "" &&
        gameBoardArray[6] === gameBoardArray[7] &&
        gameBoardArray[6] === gameBoardArray[8]) ||
      (gameBoardArray[0] !== "" &&
        gameBoardArray[0] === gameBoardArray[4] &&
        gameBoardArray[0] === gameBoardArray[8]) ||
      (gameBoardArray[2] !== "" &&
        gameBoardArray[2] === gameBoardArray[4] &&
        gameBoardArray[2] === gameBoardArray[6]) ||
      (gameBoardArray[0] !== "" &&
        gameBoardArray[0] === gameBoardArray[3] &&
        gameBoardArray[0] === gameBoardArray[6]) ||
      (gameBoardArray[1] !== "" &&
        gameBoardArray[1] === gameBoardArray[4] &&
        gameBoardArray[1] === gameBoardArray[7]) ||
      (gameBoardArray[2] !== "" &&
        gameBoardArray[2] === gameBoardArray[5] &&
        gameBoardArray[2] === gameBoardArray[8])
    ) {
      return true;
    }
    if (!gameBoardArray.includes("")) {
      return "tie";
    }
    return false;
  };

  const clearBoard = () => {
    for (let index = 0; index < gameBoardArray.length; index += 1) {
      gameBoardArray[index] = "";
    }
    const winner = document.querySelector(".winner");
    const clearButton = document.querySelector(".reset");
    clearButton.style.display = "none";
    winner.style.display = "none";
    winner.textContent = "";
    displayBoard();
  };
  return {
    addMarker,
    displayBoard,
    checkWinner,
    clearBoard,
  };
})();

const playerFactory = (name, mark) => {
  return { name, mark };
};

const Game = (player1, player2) => {
  let currentPlayer = player1;
  let gameOver = false;

  function nextPlayer() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (gameOver) {
        return;
      }
      if (e.target.textContent !== "") {
        return;
      }
      let index = e.target.id;
      index = index.slice(-1);
      GameBoard.addMarker(currentPlayer.mark, index);
      const winner = document.querySelector(".winner");
      const results = GameBoard.checkWinner();
      const clearButton = document.querySelector(".reset");
      GameBoard.displayBoard();
      if (results === "tie") {
        gameOver = true;
        winner.style.display = "block";
        winner.textContent = "Game was a Tie!";
        clearButton.style.display = "block";
        clearButton.addEventListener("click", () => {
          GameBoard.clearBoard();
          gameOver = false;
        });
        return;
      }
      if (results) {
        gameOver = true;
        winner.style.display = "block";
        winner.textContent = `${currentPlayer.name} is the winner!`;
        clearButton.style.display = "block";
        clearButton.addEventListener("click", () => {
          GameBoard.clearBoard();
          gameOver = false;
        });
        return;
      }
      nextPlayer();
    });
  });
};

const Form = (() => {
  const playButton = document.querySelector(".play");
  playButton.addEventListener("click", (event) => {
    event.preventDefault();
    const form = document.getElementById("form");
    form.style.visibility = "hidden";

    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const player1 = playerFactory(player1Input.value, "X");
    const player2 = playerFactory(player2Input.value, "O");
    Game(player1, player2);
  });
})();
