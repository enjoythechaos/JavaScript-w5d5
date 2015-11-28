function Board() {
  this.grid = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];
}

Board.prototype.print = function() {
  var str = "";
  for(var i = 0; i < this.grid.length; i++) {
    str += (JSON.stringify(this.grid[i]) + "\n");
  }
  console.log(str);
};


module.exports = Board;
