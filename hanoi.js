var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Hanoi(stackSize) {
  if (!stackSize) {
    stackSize = 5;
  }
  this.stackSize = stackSize;
  var orderedClone = [];
  for (var i=stackSize; i>=1; i--) {
    orderedClone.push(i);
  }
  this.stacks = [orderedClone, [], []];
}

Hanoi.prototype.isWon = function() {
  return ((this.stacks[1].length === this.stackSize) || (this.stacks[2].length === this.stackSize));
};

Hanoi.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
  // console.log(this);
  // console.log(JSON.stringify(this.stacks));

  if (this.stacks[startTowerIdx].length === 0) {
    return false;
  } else if (this.stacks[endTowerIdx].length === 0) {
    return true;
  } else {
    return (this.stacks[endTowerIdx][this.stacks[endTowerIdx].length - 1] > this.stacks[startTowerIdx][this.stacks[startTowerIdx].length - 1]);
  }
};

Hanoi.prototype.move = function(startTowerIdx, endTowerIdx) {

  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
    return true;
  } else {
    return false;
  }
};

Hanoi.prototype.print = function() {
  console.log(JSON.stringify(this.stacks));
};

Hanoi.prototype.promptMove = function(callback) {
  this.print();
  var boundCallback = callback.bind(this);
  reader.question("Choose starting stack", function(startTowerIdx) {
    reader.question("Choose ending stack", function(endTowerIdx) {
      var stack1 = parseInt(startTowerIdx);
      var stack2 = parseInt(endTowerIdx);
      boundCallback(stack1, stack2);
    });
  });
};

Hanoi.prototype.run = function(completionCallback) {
  var newCallbackFunction = function(stack1, stack2) {
    var answer = this.move(stack1, stack2);
    if (answer) {
      if (this.isWon()) {
        completionCallback();
      }
    } else {
      console.log("Invalid move");
    }
    this.run(completionCallback);
  };

  this.promptMove(newCallbackFunction);
};

var game = new Hanoi();

// console.log(game.isValidMove(0, 1));

// game.promptMove(game.move);

game.run(function(){
  console.log("Congratulations!  You won!");
});
