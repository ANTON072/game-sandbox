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
    // console.log(x, y);
    // console.log(e.offsetX - 240);
    if (count++ % 2 == 0) {
      x0 = x;
      y0 = y;
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

  drawLine(0, 0, x0, y0, 'blue');
  drawLine(0, 0, x1, y1, 'green');
  ctx.restore();

  // 内積の結果
  var dot = x0 * x1 + y0 * y1;
  // v1とv2のベクトルの大きさ
  var sizeV1 = Math.sqrt(x0 * x0 + y0 * y0);
  var sizeV2 = Math.sqrt(x1 * x1 + y1 * y1);
  // 角度を算出
  var cosTheta = dot / (sizeV1 * sizeV2);

  $('#v0').html('(' + x0 + ',' + y0 + ')');
  $('#v1').html('(' + x1 + ',' + y1 + ')');
  $('#v2').html(dot);
  $('#v3').html(sizeV1);
  $('#v4').html(sizeV2);
  $('#v5').html(cosTheta);
  $('#v6').html((Math.acos(cosTheta) * 180) / Math.PI);
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
