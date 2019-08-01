var letter = require("./letter.js");
var randomWord = require("random-words");

function Word() {
    //Pick a word and make the letters
    var letters = [];

    //Get a random word
    var word = randomWord();
    this.word = word;
    var splitWord = word.split("");

    //Make a letter instance for each word
    splitWord.forEach(function(l) {
        var char = new letter(l);
        letters.push(char);
    });

    this.letters = letters;

    //Display word with letters shown or hidden
    this.showLetters = function() {
        var display = "";
        this.letters.forEach(function(letter) {
            display += letter.getChar() + " ";
        });

        display = display.slice(0, -1);
        console.log(display);
    };

    this.checkGuess = function(guess) {
        var matchesFound = "";
        this.letters.forEach(function(letter) {
            if(letter.guessed === false && letter.checkGuess(guess) === true) {
                letter.guessed === true;
                matchesFound++;
            }
        });

        return matchesFound
    };
};

module.exports = Word;