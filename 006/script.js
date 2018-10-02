var ctx,
  degree = 0;

function init() {
  var canvas = document.getElementById('graph');
  ctx = canvas.getContext('2d');
  ctx.font = '24px sans-serif';
  setInterval(tick, 10);
}

function tick() {
  degree++;
  paint();
}

function drawLine(x0, y0, x1, y1, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.closePath();
  ctx.stroke();
}

function paint() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 600, 600);
  ctx.save();
  ctx.translate(100, 100);
  drawLine(0, -100, 0, 500, 'black');
  drawLine(-100, 0, 500, 0, 'black');
  var s0 = Math.sin((degree * Math.PI) / 180);
  var c0 = Math.cos((degree * Math.PI) / 180);
  var c = c0 * 50,
    s = s0 * -50;
  drawLine(0, 0, c, s, 'red');
  ctx.arc(0, 0, 50, 0, Math.PI * 2);
  ctx.stroke();

  // sinカーブ
  ctx.strokeStyle = 'green';
  ctx.beginPath();
  ctx.moveTo(c, s);
  for (var i = 0; i < 500; i++) {
    var s1 = Math.sin(((degree + i) * Math.PI) / 180) * -50;
    // var s1 = Math.sin(((degree + i) * 2 * Math.PI) / 180) * -50;
    // var s1 = Math.sin(((degree + i) * 0.5 * Math.PI) / 180) * -50;
    ctx.lineTo(i, s1);
  }
  ctx.stroke();

  // cosカーブ
  ctx.strokeStyle = 'blue';
  ctx.beginPath();
  ctx.moveTo(c, s);
  for (var i = 0; i < 500; i++) {
    var c1 = Math.cos(((degree + i) * Math.PI) / 180) * 50;
    ctx.lineTo(c1, i);
  }
  ctx.stroke();
  ctx.restore();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
