var ctx,
  posX = 0,
  posY = 600,
  velocityX = 5,
  velocityY = -20,
  accelY = 0.5;

function init() {
  ctx = document.getElementById('viewer').getContext('2d');
  setInterval(tick, 100);
}

function tick() {
  posX += velocityX;
  velocityY += accelY;
  posY += velocityY;
  if (posX > 600) {
    posX = 0;
  }
  if (posY > 600) {
    velocityY = -20;
  }
  paint();
}

function paint() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = 'white';
  ctx.fillRect(posX, posY, 10, 10);
  ctx.fill();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
