var ctx,
  pts = [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }];

function init() {
  ctx = document.getElementById('graph').getContext('2d');
  ctx.translate(400, 400);
  paint();
}

function v(id) {
  return parseFloat(document.getElementById(id).value);
}

function line(x0, y0, x1, y1) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function fillPolygon(pts, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(pts[0].x * 50, -pts[0].y);
  for (var i = 1; i < pts.length; i++) {
    ctx.lineTo(pts[i].x * 50, -pts[i].y * 50);
  }
  ctx.closePath();
  ctx.fill();
}

function paint() {
  ctx.fillStyle = 'white';
  ctx.fillRect(-400, -400, 800, 800);
  ctx.strokeStyle = 'black';
  for (var i = -7; i < 8; i++) {
    line(i * 50, -400, i * 50, 400);
    line(-400, i * 50, 400, i * 50);
  }
  ctx.strokeStyle = 'red';
  line(0, -400, 0, 400);
  line(-400, 0, 400, 0);

  fillPolygon(pts, 'green');
  var pts2 = [];
  for (var i = 0; i < pts.length; i++) {
    pts2.push({
      x: v('a') * pts[i].x + v('b') * pts[i].y,
      y: v('c') * pts[i].x + v('d') * pts[i].y
    });
    fillPolygon(pts2, 'blue');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
