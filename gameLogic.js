const inquirer = require('inquirer');

let board = Array(9).fill(' ');
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
const placeCharacter = (position, character) => {
  board[position - 1] = character.toUpperCase();
};
const logBoard = (board) => {
  console.log(
    `  ${board[0]}  |  ${board[1]}  |  ${board[2]}  \n` +
    `-----|-----|------\n` +
    `  ${board[3]}  |  ${board[4]}  |  ${board[5]}  \n` +
    `-----|-----|------\n` +
    `  ${board[6]}  |  ${board[7]}  |  ${board[8]}  \n`
  );
};
const validInput = inputValue => typeof inputValue === 'number' && inputValue !== NaN && inputValue <= 9 && inputValue >= 1 && parseInt(inputValue) === inputValue;
const validMove = position => board[position - 1] === ' ';
const checkForWin = (player, board) => {
  let count;
  for (let i = 0; i < winCombinations.length; i++) {
    count = 0;
    for (let j = 0; j < winCombinations[i].length; j++) {
      if (board[winCombinations[i][j]] === player) {
        count++
      }
    }
    if (count === winCombinations[i].length) {
      return true;
    }
  }
  return false;
};

const startGame = () => {
  board = Array(9).fill(' ');
  promptMove('X', board);
};

const checkForDraw = board => {
  let draw = true;
  board.forEach(elem => {
    if (elem === ' ') {
      draw = false;
    }
  });
  return draw;
};


const promptMove = (player, board, mistake) => {
  console.log('Current Board:');
  logBoard(board);
  if (mistake === 'invalidInput') {
    console.log('Please make sure to select a position 1 - 9');
  }
  if (mistake === 'invalidMove') {
    console.log('Please make sure to select an empty space on the current board');
    logBoard(board);
  }
  inquirer.prompt([{
    message: `Player ${player}, your turn. Where would you like to go? \n` +
    `  1  |  2  |  3  \n` +
    `-----|-----|-----\n` +
    `  4  |  5  |  6  \n` +
    `-----|-----|-----\n` +
    `  7  |  8  |  9  \n`,
    name: 'selection',
  }]).then(answer => {
    let selection = Number(answer.selection);
    if (answer.selection === 'exit') {
      return;
    } else if (!(validInput(selection))) {
      promptMove(player, board, 'invalidInput');
    } else if (!(validMove(selection))) {
      promptMove(player, board, 'invalidMove');
    } else {
      placeCharacter(selection, player);
      if (checkForWin(player, board)) {
        console.log(`Player ${player} wins!`);
        promptRestart();
      } else if (checkForDraw(board)) {
        console.log('It was a draw!');
        promptRestart();
      } else {
        if (player === 'X') {
          promptMove('O', board);
        } else {
          promptMove('X', board);
        }
      }
    }
  })
};

const promptRestart = (mistake) => {
  if (mistake) {
    console.log('Please enter either a "y" or "yes" if you want to play again, or a "n" or "no" if you would like to close the app');
  }
  inquirer.prompt([{
    message: 'Would you like to play again? (y/n)',
    name: 'answer'
  }]).then(answer => {
    if (answer.answer === 'y' || answer.answer === 'yes') {
      startGame();
    } else if (answer.answer === 'n' || answer.answer === 'no') {
      return;
    } else {
      promptRestart(true);
    }
  })
};

module.exports = {
  startGame
};