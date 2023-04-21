// Game board
const ROWS = 10;
const COLS = 10;
const MINES = 10;
let board = [];
let revealed = 0;
let minesFlagged = 0;
let numberOfFlags = document.getElementById("numberOfFlags");
let numberOfMines = document.getElementById("numberOfMines");
let modal = document.getElementById("endModal");
let modalText = document.getElementById("modalText");

// Generate game board
function generateBoard() {
  // Create empty board
  for (let i = 0; i < ROWS; i++) {
    board[i] = [];
    for (let j = 0; j < COLS; j++) {
      board[i][j] = {
        mine: false,
        revealed: false,
        flagged: false,
        numberBombs: 0,
      };
    }
  }

  // Randomly place mines
  let numMines = 0;
  while (numMines < MINES) {
    let row = Math.floor(Math.random() * ROWS);
    let col = Math.floor(Math.random() * COLS);
    if (!board[row][col].mine) {
      board[row][col].mine = true;
      numMines++;
    }
  }

  // Calculate numberBombss
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (!board[i][j].mine) {
        let num = 0;
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (i + x >= 0 && i + x < ROWS && j + y >= 0 && j + y < COLS) {
              if (board[i + x][j + y].mine) {
                num++;
              }
            }
          }
        }
        board[i][j].numberBombs = num;
      }
    }
  }
}

// Render game board
function renderBoard() {
  let gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  for (let i = 0; i < ROWS; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < COLS; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("Id", `cell${i}${j}`);
      cell.addEventListener("click", () => {
        handleClick(i, j);
      });
      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        handleFlag(i, j);
      });
      row.appendChild(cell);
    }
    gameBoard.appendChild(row);
  }
}

//Handle cell right click - flag
function handleFlag(row, col) {
  let cell = document.getElementById(`cell${row}${col}`);

  if (board[row][col].flagged) {
    cell.classList.remove("flagged");
    board[row][col].flagged = !board[row][col].flagged;
    minesFlagged--;
  } else {
    cell.classList.add("flagged");
    board[row][col].flagged = !board[row][col].flagged;
    minesFlagged++;
  }
  numberOfFlags.innerText = minesFlagged;
}

// Handle cell click
function handleClick(row, col) {
  if (board[row][col].revealed) {
    return;
  } else {
    // Reveal cell
    revealCell(row, col);
  }
  // Check if won
  if (revealed === ROWS * COLS - MINES) {
    endGame(true);
  }
}

// Reveal cell
function revealCell(row, col) {
  let cell = document.getElementById(`cell${row}${col}`);
  board[row][col].revealed = true;

  // Check for mine
  if (board[row][col].mine) {
    cell.classList.add("mine");
    endGame(false);
  } else if (board[row][col].numberBombs > 0) {
    cell.classList.add("clicked");
    cell.innerHTML = board[row][col].numberBombs;
    revealed++;
  } else {
    // Empty cell
    cell.classList.add("clicked");
    revealed++;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (row + x >= 0 && row + x < ROWS && col + y >= 0 && col + y < COLS) {
          if (
            !board[row + x][col + y].mine &&
            !board[row + x][col + y].revealed
          ) {
            revealCell(row + x, col + y);
          }
        }
      }
    }
  }
}

// End game
function endGame(win) {
  if (win) {
    modal.style.display = "block";
    modalText.innerText = "You won!";
  } else {
    modal.style.display = "block";
    modalText.innerText = "You lose!";
  }
}

function startNewGame() {
  revealed = 0;
  minesFlagged = 0;
  board = [];
  generateBoard();
  renderBoard();
  var modal = document.getElementById("endModal");
  var modalText = document.getElementById("modalText");
  modal.style.display = "none";
  modalText.innerText = "";
  numberOfFlags.innerText = minesFlagged;
  numberOfMines.innerText = MINES;
}

let newGameButton = document.getElementById("newGameBtn");
newGameButton.addEventListener("click", () => {
  startNewGame();
});

// Initialize game
startNewGame();
