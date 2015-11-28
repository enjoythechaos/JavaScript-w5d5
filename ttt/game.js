var Board = require('./board.js');
var readline = require('readline');

function Game(reader) {
  this.board = new Board();
  this.currentPlayer = 'X';
  this.reader = reader;
}

Game.prototype.checkThree = function(positions) {
  var won = true;
  for (var pos = 0; pos<=2; pos++) {
    var pair = positions[pos];
    var r = pair[0];
    var c = pair[1];
    won =  won && (this.board.grid[r][c] === this.currentPlayer);
  }
  return won;
};


Game.prototype.won = function() {
  var combos = [[[0,0], [0, 1], [0, 2]],
               [[1,0], [1, 1], [1, 2]],
               [[2,0], [2, 1], [2, 2]],
               [[0,0], [1, 0], [2, 0]],
               [[0,1], [1, 1], [2, 1]],
               [[0,2], [1, 2], [2, 2]],
               [[0,0], [1, 1], [2, 2]],
               [[0,2], [1, 1], [2, 0]]];
  for(var i = 0; i < combos.length; i++) {
    if (this.checkThree(combos[i])) {
      return true;
    }
  }
  return false;
};

Game.prototype.over = function() {
  for(var row=0; row<=2; row++) {
    for(var col=0; col<=2; col++) {
      if (this.board.grid[row][col] === "_") {
        return false;
      }
    }
  }
  return true;
};


Game.prototype.switchPlayers = function() {
  this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
};

Game.prototype.validMove = function(row, col) {
  return (this.board.grid[row][col] === '_');
};

Game.prototype.move = function(row, col) {
  if (this.validMove(row, col)) {
    this.board.grid[row][col] = this.currentPlayer;
    return true;
  } else {
    return false;
  }
};

Game.prototype.promptMove = function(callback) {
  this.board.print();
  var game = this;
  var boundCallback = callback.bind(this);
  game.reader.question("Choose a row", function(rowChoice) {
    game.reader.question("Choose a column", function(colChoice) {
      var row = parseInt(rowChoice);
      var col = parseInt(colChoice);
      boundCallback(row, col);
    });
  });
};

Game.prototype.run = function(completionCallback) {
  function gameLogic(row, col) {
    var validMove = this.move(row, col);
    if (validMove) {
      if (this.won() || this.over()) {
        return completionCallback(this.won());
      } else {
        this.switchPlayers();
      }
    } else {
      console.log("Invalid Move");
    }
    this.run(completionCallback);
  }

  this.promptMove(gameLogic);
};

var game = new Game(readline.createInterface({
  input: process.stdin,
  output: process.stdout
}));



game.run(function(bool){
  if (bool) {
    console.log("Congratulations!  You won!");
  } else {
    console.log("Cat's Game!");
  }
});
