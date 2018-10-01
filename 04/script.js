var ctx,
  isFlying = false,
  timer;
var posY = 300,
  offset = 0,
  speed = 10,
  velocityY = -20,
  accelY = 5;

function init() {
  ctx = document.getElementById('viewer').getContext('2d');
  ctx.font = '24px sans-serif';
  onkeydown = function() {
    isFlying = true;
  };
  onkeyup = function() {
    isFlying = false;
  };
  timer = setInterval(tick, 100);
}

function tick() {
  velocityY += isFlying ? -accelY : accelY;
  posY += velocityY;
  offset += speed;
  if (offset % 100 == 0) {
    speed += 2;
  }
  paint();
}

function paint() {
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = 'brown';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (var i = 0; i <= 600; i += 10) {
    var up = 200 + Math.sin((i + offset) * Math.PI / 360) * 80;
    ctx.lineTo(i, up);
    if (i == 10 && posY < up) {
      clearInterval(timer);
    }
  }
  ctx.lineTo(600, 0);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, 600);
  for (var i = 0; i <= 600; i += 10) {
    var down = 400 + Math.sin((i + offset) * Math.PI / 340) * 80;
    ctx.lineTo(i, down);
    if (i == 10 && posY + 10 > down) {
      clearInterval(timer);
    }
  }
  ctx.lineTo(620, 600);
  ctx.fill();
  ctx.fillStyle = 'white';
  ctx.fillRect(10, posY, 10, 10);
  ctx.fillText(offset, 500, 50);
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
