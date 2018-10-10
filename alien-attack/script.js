var alienX = 80;
var alienY = 20;
var guessX = 0;
var guessY = 0;
var shotsRemaining = 8;
var shotsMade = 0;
var gameState = '';
var gameWon = false;

var cannon = document.querySelector('#cannon');
var alien = document.querySelector('#alien');
var missile = document.querySelector('#missile');

var inputX = document.querySelector('#inputX');
var inputY = document.querySelector('#inputY');
var output = document.querySelector('#output');

var button = document.querySelector('button');
button.style.cursor = 'pointer';
button.addEventListener('click', clickHandler, false);

function render() {
  alien.style.left = alienX + 'px';
  alien.style.top = alienY + 'px';

  cannon.style.left = guessX + 'px';

  missile.style.left = guessX + 'px';
  missile.style.top = guessY + 'px';
}

function clickHandler() {
  playGame();
}

function playGame() {
  shotsRemaining = shotsRemaining - 1;
  shotsMade = shotsMade + 1;
  gameState = ' Shots: ' + shotsMade + ', Remaining: ' + shotsRemaining;
  guessX = parseInt(inputX.value);
  guessY = parseInt(inputY.value);

  if (guessX >= alienX && guessX <= alienX + 20) {
    if (guessY >= alienY && guessY <= alienY + 20) {
      gameWon = true;
      endGame();
    }
  } else {
    output.innerHTML = 'Miss!' + gameState;
    if (shotsRemaining < 1) endGame();
  }

  if (!gameWon) {
    alienX = Math.floor(Math.random() * 280);
    alienY += 30;
  }

  render();
  console.log('X: ' + alienX);
  console.log('Y: ' + alienY);
}

function endGame() {
  if (gameWon) {
    output.innerHTML =
      'Hit! You saved the earth!' +
      '<br>' +
      'It only took you ' +
      shotsMade +
      ' shots.';
  } else {
    output.innerHTML = 'You lost!' + '<br>' + 'The earth has been invaded!';
  }
}
