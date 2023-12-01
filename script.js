// document.addEventListener('DOMContentLoaded', () => {
//     const gameModeButtons = document.querySelectorAll('.mode-button');
//     const board = document.getElementById('game-board');
//     const status = document.getElementById('status');
//     const resetButton = document.getElementById('reset-button');

//     let currentPlayer;
//     let gameBoard;
//     let gameActive;

//     // Event listeners
//     gameModeButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             startGame(button.id === 'player-vs-computer');
//         });
//     });

//     board.addEventListener('click', handleCellClick);
//     resetButton.addEventListener('click', resetGame);

//     // Function to handle cell clicks
//     function handleCellClick(event) {
//         const cellIndex = event.target.dataset.index;

//         if (gameBoard[cellIndex] === '' && gameActive) {
//             gameBoard[cellIndex] = currentPlayer;
//             event.target.textContent = currentPlayer;
//             checkForWin();
//             checkForDraw();
//             switchPlayer();

//             if (currentPlayer === 'O' && gameActive) {
//                 playComputerMove();
//             }
//         }
//     }

//     function resetGame(event){
//         board.innerHTML = '';
//         for (let i = 0; i < 9; i++) {
//             const cell = document.createElement('div');
//             cell.classList.add('cell');
//             cell.dataset.index = i;
//             board.appendChild(cell);
//         }
//     }

//     // Function to check for a win
//     function checkForWin() {
//         const winConditions = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6]
//         ];

//         for (const condition of winConditions) {
//             const [a, b, c] = condition;
//             if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
//                 gameActive = false;
//                 // displayResult(`Player ${currentPlayer} wins!`);
//                 console.log(`Player ${currentPlayer} wins!`);
//                 break;
//             }
//         }
//     }

//     // Function to check for a draw
//     function checkForDraw() {
//         if (gameBoard.every(cell => cell !== '')) {
//             gameActive = false;
//             displayResult("It's a draw!");
//         }
//     }

//     // Function to switch players
//     function switchPlayer() {
//         currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//         status.textContent = gameActive ? `Player ${currentPlayer}'s turn` : '';
//     }

//     // Function to play a move for the computer player
//     function playComputerMove() {
//         const emptyCells = gameBoard.reduce((acc, cell, index) => {
//             if (cell === '') {
//                 acc.push(index);
//             }
//             return acc;
//         }, []);

//         if (emptyCells.length > 0) {
//             const randomIndex = Math.floor(Math.random() * emptyCells.length);
//             const computerMove = emptyCells[randomIndex];

//             setTimeout(() => {
//                 gameBoard[computerMove] = 'O';
//                 document.querySelector(`[data-index="${computerMove}"]`).textContent = 'O';
//                 checkForWin();
//                 checkForDraw();
//                 switchPlayer();
//             }, 500); // Introduce a delay for a more natural feel
//         }
//     }

//     // Function to display the game result
//     function displayResult(result) {
//         // status.textContent = result;
//         // status.innerHTML=result;
//         status.innerHTML = `<span style="background-color: lime">Replacement HTML</span>`;

//     }

//     // Function to start the game
//     function startGame(isVsComputer) {
//         currentPlayer = 'X';
//         gameBoard = ['', '', '', '', '', '', '', '', ''];
//         gameActive = true;
//         status.textContent = `Player ${currentPlayer}'s turn`;

//         // Clear the board
//         board.innerHTML = '';
//         for (let i = 0; i < 9; i++) {
//             const cell = document.createElement('div');
//             cell.classList.add('cell');
//             cell.dataset.index = i;
//             board.appendChild(cell);
//         }

//         if (isVsComputer && currentPlayer === 'O') {
//             playComputerMove();
//         }
//     }
// });

let currentPlayer = "X";
let gameActive = true;
let gameMode = "player";
let restartGameMode="restart";
let board = Array(9).fill("");

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function makeMove(cellIndex) {
  if (gameActive && board[cellIndex] === "") {
    board[cellIndex] = currentPlayer;
    document.getElementsByClassName("cell")[cellIndex].innerText = currentPlayer;

    if (checkWin(currentPlayer)) {
      endGame("Player " + currentPlayer + " wins!");
    } else if (isBoardFull()) {
      endGame("It's a draw!");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.getElementById("status").innerText = "It's player " + currentPlayer + "'s turn!";

      if (gameMode === "computer" && currentPlayer === "O") {
        setTimeout(makeComputerMove, 500);
      }
    }
  }
}

function makeComputerMove() {
  let isMoveMade = false;

  while (!isMoveMade && !isBoardFull()) {
    const randomCell = Math.floor(Math.random() * 9);

    if (board[randomCell] === "") {
      makeMove(randomCell);
      isMoveMade = true;
    }
  }
}

// function switchMode(mode){
//     gameMode=mode;

//     if(gameMode=="computer"){
//         document.getElementById("welcome-msg").innerText="Welcome to player vs computer mode!!!";
//     }
//     else{
//         document.getElementById("welcome-msg").innerText="";
//     }
//     restartGame();
// }

function checkWin(player) {
  return winCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === player;
    });
  });
}

function isBoardFull() {
  return board.every(cell => cell !== "");
}

function switchMode(mode) {
  gameMode = mode;
  if(gameMode=="computer"){
    document.getElementById("welcome-msg").innerText="Welcome to player vs computer mode!!!";
}
else if(gameMode=="player"){
    document.getElementById("welcome-msg").innerText="Welcome to player vs player mode!!!";
}
else{
    document.getElementById("welcome-msg").innerText="";
}
//   restartGame();
}

function endGame(message) {
  document.getElementById("status").innerText = message;
  gameActive = false;
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  board = Array(9).fill("");

  Array.from(document.getElementsByClassName("cell")).forEach(cell=>
    {
        cell.innerText="";
    });
    if(restartGameMode=="restart"){
    document.getElementById("restart-msg").innerText="Game Restarted!!";
    }
    else{
        document.getElementById("restart-msg").innerText="";
    }

    setTimeout(function(){
        document.getElementById("restart-msg").innerText="";
    }, 1000);

    document.getElementById("status").innerText="It's player X's turn!";
}
