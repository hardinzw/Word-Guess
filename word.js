var letter = require("./letter.js");
var randomWord = require("random-words");

function Word() {

    //Pick a word and make the letters
    var letters = [];
    var possibleWords = [];

    //Get a random word
    var word = randomWord();
    this.word = word;
    var splitWord = word.split("");

    //Make a letter instance for each word
    splitWord.forEach(function() {
        var char = new letter(1);
        letters.push(char);
    });

    this.letters = letters;

    //Display word with letters shown or hidden
    this.showLetters = function() {
        var display = "";
        this.letters.forEach(function() {
            display += letter.getChar() + " ";
        });

        display = display.slice(0, -1);
        console.log(display);
    }

    this.checkGuess = function(guess) {
        var matches_found = 0;
        this.letters.forEach(function(letter) {
            if(letter.guessed === false && letter.checkGuess(guess) === true) {
                letter.guessed === true;
                matches_found++;
            }
        });

        return matches_found
    }
}

module.exports = Word;