/*
    1. defined a word bank
    2. defined a function to select a random word (when the page is loaded)
    
    3. register a user's input
    4. keep of track of the key (character) that was pressed
    5. check if the character is in the selected word
    6. change the display of the word ("_ _ _ _ _ " -> "a _ _ _ _")
    7. keep track of guess count
    8. check if win/loss
    9. change display win/loss
*/


// 1. defined a word bank 
// Global Variables
var wordBank = ["paris", "london", "berlin", "amsterdam", "dublin", "vienna", "canberra", "nairobi", "tokyo", "beijing", "dubai", "muscat", "capetown", "reykjavik"];
var selectedWord = "";
var letterLength = [];
var placeholder = [];
// var placeholder = 0; // Par*s
var wrongLetters = [];

var userGuesses = 0;

// Counters

var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;


// 2. defined a function to select a random word (when the page is loaded)
function selectRandomWord() {
    document.getElementById("submitbutton").disabled = false;
    selectedWord = wordBank[Math.floor(Math.random() * wordBank.length)]; // <- make random
    letterLength = selectedWord.split("");
    console.log(selectedWord);
    // placeholder = letterLength.length;

    guessesLeft = 9;
    wrongLetters = [];
    placeholder = [];

    // var numberOfStars = document.getElementById("currentWord")

    for (var i = 0; i < selectedWord.length; i++) {

        if (selectedWord[i] === ' ') {
            placeholder[i] = ' ';
        } else {
            placeholder[i] = '*';
        }
    }
    //document.getElementById("currentWord").textContent = placeholder.join('');

    document.getElementById("currentWord").innerHTML = placeholder.join(" ");
    document.getElementById("remainingGuesses").innerHTML = guessesLeft;
    document.getElementById("numberOfGamesWon").innerHTML = winCount;
    document.getElementById("numberOfGamesLost").innerHTML = lossCount;
    document.getElementById("wrongLetters").innerHTML = wrongLetters.join(" ");
}

//var word = selectedWord();

function checkLetter(letter) {
    // 5. check if the character is in the selected word
    var word = false;
    for (var i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            word = true;
            // 6. change the display of the word ("_ _ _ _ _ " -> "a _ _ _ _")
            // @todo
            placeholder[i] = letter

        }

    }
    document.getElementById("currentWord").innerHTML = placeholder.join(" ");

    if (word) {
        userGuesses++;

    } else {
        wrongLetters.push(letter);
        guessesLeft--;

    }
    if (placeholder.join("") == selectedWord) {
        document.getElementById("currentWord").innerHTML = "Great job! The word was " + selectedWord + ".";
        winCount++;
        roundComplete();
    } else if (guessesLeft == 0) {
        lossCount++;
        document.getElementById("currentWord").innerHTML = "Sorry! The word was " + selectedWord + ". Please try again!";

        roundComplete();






    } else {
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById("wrongLetters").innerHTML = wrongLetters.join(" ");
    document.getElementById("remainingGuesses").innerHTML = guessesLeft;
    document.getElementById("numberOfGamesWon").innerHTML = winCount;
    document.getElementById("numberOfGamesLost").innerHTML = lossCount;

}




function roundComplete() {
    console.log("Win Count: " + winCount + "" | "Loss Count " + lossCount + "" | "Guesses Left" + guessesLeft + "")

    document.getElementById("remainingGuesses").innerHTML = guessesLeft;
    document.getElementById("wrongLetters").innerHTML = wrongLetters.join(" ");
    document.getElementById("numberOfGamesLost").innerHTML = lossCount;
    document.getElementById("numberOfGamesWon").innerHTML = winCount;
    document.getElementById("submitbutton").disabled = true;

    updateDisplay();


}


// 3. register a user's input
// key down event
// 4. keep track of the key (character) that was pressed
// 5. check if the character is in the selected word


//MAIN LOGIC 
// =====================================================
selectRandomWord();



document.getElementById("startbutton").onclick = function (event) {
    document.getElementById("textinput").value = "";
    selectRandomWord();
}
document.getElementById("submitbutton").onclick = function (event) {



    var userGuess = document.getElementById("textinput").value;

    checkLetter(userGuess);
    document.getElementById("textinput").value = "";
    document.getElementById("textinput").focus();
}