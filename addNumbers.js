var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft === 0) {
    completionCallback(sum);
    reader.close();
  } else {
      reader.question("Enter a number", function (givenNum) {
        var given = parseInt(givenNum);
        sum += given;
        console.log("Current sum is: " + sum);
        addNumbers(sum, (numsLeft - 1), completionCallback);
      });


  }
}

function totalSum(sum) {
  console.log("Total sum is: " + sum);
}

addNumbers(0, 5, totalSum);
