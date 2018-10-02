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

  for (var thete = -Math.PI * 2; thete < Math.PI * 2; thete += 0.1) {
    // thete / (Math.PI * 2)の箇所は、thetaが-2πの場合は-1, theteが2πの場合は1
    // 400をかけることで-400から400の範囲になり、さらに400を足すことで0〜800という範囲にする
    var x = 400 * (thete / (Math.PI * 2));
    // theteはラジアンなのでそのまま渡す
    // -1から1の範囲なので300倍している
    var y = Math.sin(thete) * 300;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
