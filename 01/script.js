var ctx,
  posX = 0,
  posY = 0,
  velocityX = 5,
  velocityY = 2;

function init() {
  ctx = document.getElementById('viewer').getContext('2d');
  setInterval(tick, 100);
}

function tick() {
  posX += velocityX;
  if (posX > 600) {
    posX = 0;
  }
  posY += velocityY;
  if (posY > 600) {
    posY = 0;
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
