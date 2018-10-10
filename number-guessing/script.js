var mysteryNumber = Math.floor(Math.random() * 100);
console.log(mysteryNumber);
var playersGuess = 0;
var guessesRemaining = 10;
var guessesMade = 0;
var gameState = '';
var gameWon = false;

var input = document.querySelector('#input');
var output = document.querySelector('#output');

var button = document.querySelector('button');
button.style.cursor = 'pointer';
button.addEventListener('click', clickHandler, false);

var arrow = document.querySelector('#arrow');

window.addEventListener('keydown', keydownHandler, false);

function render() {
  arrow.style.left = playersGuess * 3 + 'px';
}

function keydownHandler(event) {
  // EnterKey
  if (event.keyCode === 13) {
    validateInput();
  }
}

function clickHandler() {
  validateInput();
}

function validateInput() {
  playersGuess = parseInt(input.value);
  if (isNaN(playersGuess)) {
    output.innerHTML = 'Please enter a number.';
  } else {
    playGame();
  }
}

function playGame() {
  guessesRemaining = guessesRemaining - 1;
  guessesMade = guessesMade + 1;
  gameState = 'Guess: ' + guessesMade + ', Remaining: ' + guessesRemaining;

  playersGuess = parseInt(input.value);
  if (playersGuess > mysteryNumber) {
    output.innerHTML = "That's too high." + gameState;
    if (guessesRemaining < 1) {
      endGame();
    }
  } else if (playersGuess < mysteryNumber) {
    output.innerHTML = "That's too low." + gameState;
    if (guessesRemaining < 1) {
      endGame();
    }
  } else if (playersGuess === mysteryNumber) {
    output.innerHTML = 'You got it!';
    gameWon = true;
    endGame();
  }
  render();
}

function endGame() {
  if (gameWon) {
    output.innerHTML =
      "Yes, it's " +
      mysteryNumber +
      '!' +
      '<br />' +
      'It only took you ' +
      guessesMade +
      ' guesses.';
  } else {
    output.innerHTML =
      'No more guesses left!' +
      '<br />' +
      'The number was: ' +
      mysteryNumber +
      '.';
  }
  button.removeEventListener('click', clickHandler, false);
  button.disabled = true;
  window.removeEventListener('keydown', keydownHandler, false);
  input.disabled = true;
}
