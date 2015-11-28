var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// var a = 9;
//
// var ask = reader.question.bind(reader);
//
// ask("Enter the number you'd like to multiply", function(input){
//   var b = parseInt(input);
//   console.log(a * b);
//   reader.close();
// });

var array = [];
function printArray(arr) {
  console.log(JSON.stringify(array));
}

for (var i = 1; i <= 5; i++) {
  reader.question("Enter the next number in the array.", function(nextElement){
    array.push(nextElement);
    printArray(array);
  });
}
