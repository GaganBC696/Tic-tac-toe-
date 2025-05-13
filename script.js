const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const emoji = document.getElementById('emoji');
const restartBtn = document.getElementById('restart');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    emoji.textContent = "🏆";
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw!";
    emoji.textContent = "🤷";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    emoji.textContent = "";
  }
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      gameState[a] === currentPlayer &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  emoji.textContent = "😐";
}

function resetGame() {
  currentPlayer = 'X';
  restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
resetBtn.addEventListener('click', resetGame);
