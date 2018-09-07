#!/usr/bin/env node

const program = require('commander');
const { startGame } = require('./gameLogic.js');

program
  .version('0.0.1')
  .description('Command Line Tic-Tac-Toe app');

program
  .command('start')
  .alias('s')
  .description('Start the game')
  .action(() => startGame());

program.parse(process.argv);
















