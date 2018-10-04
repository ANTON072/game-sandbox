'use strict';

var ctx,
  x0 = 0,
  y0 = 0,
  x1 = 0,
  y1 = 0,
  count = 0;

function init() {
  var canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  ctx.lineWidth = 3;
  canvas.onmousedown = function(e) {
    var x = Math.floor((e.offsetX - 240) / 25);
    var y = -Math.floor((e.offsetY - 240) / 25);
    if (count++ % 2 == 0) {
      x0 = x;
      y0 = y;
      x1 = 0;
      y1 = 0;
    } else {
      x1 = x;
      y1 = y;
    }
    repaint();
  };
  repaint();
}

function drawCircle(x, y, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x * 25, y * 25, 1, 0, Math.PI * 2);
  ctx.fill();
}

function drawLine(x0, y0, x1, y1, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x0 * 25, y0 * -25);
  ctx.lineTo(x1 * 25, y1 * -25);
  ctx.stroke();
}

function repaint() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 500, 500);
  ctx.save();
  ctx.translate(250, 250);
  for (var i = -10; i <= 10; i++) {
    for (var j = -10; j <= 10; j++) {
      drawCircle(i, j, 'white');
    }
  }
  drawLine(-10, 0, 10, 0, 'red');
  drawLine(0, -10, 0, 10, 'red');

  ctx.setLineDash([5, 0]);
  drawLine(0, 0, x0, y0, 'blue');
  drawLine(0, 0, x1, y1, 'green');
  drawLine(0, 0, x0 + x1, y0 + y1, 'yellow');

  ctx.setLineDash([5, 5]);
  drawLine(x0, y0, x0 + x1, y0 + y1, 'blue');
  drawLine(x1, y1, x0 + x1, y0 + y1, 'green');
  ctx.restore();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
