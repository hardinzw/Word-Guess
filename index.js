var wordClass = require("./word.js");
var inquirer = require("inquirer");
var guessesLeft = 10;
var gameOver = false;
var lettersGuessed = new Set();

var word = new wordClass();
var lettersRemain = word.letters.length;

function ask() {
    word.showLetters();
    inquirer.prompt([
        {
            type: "input",
            name: "letter",
            message: "Guess a letter"
        }
    ]).then(function(response){
        guessesLeft(response.letter);
        if(!gameOver) {
            ask();
        }
    })
}

ask();

//Logic for response to guesses
function guess(letter) {
    if(letter.length === 1) {
        if(!lettersGuessed.has(letter)) {
            lettersGuessed.add(letter);
        }
        else {
            console.log("Letter has already been guessed!\n");
            return;
        }
        var numberCorrect = word.checkGuess(letter);
        console.log(numberCorrect);
        if(numberCorrect > 0) {
            console.log("Correct!\n");
            lettersRemain -= numberCorrect;
        }
        else {
            guessesLeft--;
            console.log("Incorrect! " + guessesLeft + " guesses remaining!");
        }
        if (lettersRemain === 0) {
            console.log("You win!");
            word.showLetters();
            gameOver = true;
        }
        if(guessesLeft === 0) {
            console.log("You lose!");
            console.log("Word was " + word.word);
            gameOver = true;
        }
    }
    else {
        console.log("You can only guess one letter at a time!\n");
    }
}