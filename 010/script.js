var ctx;

function init() {
  var canvas = document.getElementById('graph');
  ctx = canvas.getContext('2d');
  paint();
}

function drawLine(x0, y0, x1, y1) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function paint() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 800);

  ctx.save();
  ctx.translate(400, 400);
  // yを-1にすることで軸を反転させている
  ctx.scale(1, -1);

  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 4;
  drawLine(0, -400, 0, 400);
  drawLine(-400, 0, 400, 0);

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (var theta = -Math.PI * 2; theta < Math.PI * 2; theta += 0.1) {
    var x = 400 * (theta / (Math.PI * 2));
    var y =
      (Math.sin(theta) * -2 +
        Math.sin(theta * 2) -
        Math.sin(theta * 3) +
        +Math.sin(theta * 4)) /
      2;
    y *= 200;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
