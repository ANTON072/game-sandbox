var ctx,
  fires = [];
var width = 800,
  height = 600;

function random(limit) {
  return Math.floor(Math.random() * limit);
}

function Firework(radius, color) {
  this.color = color;
  this.radius = radius;

  this.initialize = function() {
    this.count = 0;
    this.scale = 0;
    this.x = random(width);
    this.y = height + random(20);
    this.xSpeed = -3 + random(6);
    this.ySpeed = -3 - random(8);
  };

  this.move = function() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.ySpeed += 0.1;
    // 徐々にスピードダウンする
    this.xSpeed /= 1.01;
  };

  this.draw = function() {
    if (this.ySpeed < -1) {
      // going up
      ctx.fillStyle = this.color;
      ctx.beginPath();
      // radius 半径
      ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // exploded
      // 爆発の状態を管理するためのカウンタ
      this.count++;
      // console.log('count:', this.count);
      // 4重の輪を作る
      for (var t = 0; t < 4; t++) {
        this.scale += 0.06 / this.count;
        // console.log('this.scale:', this.scale);
        var rad = this.radius * this.scale;
        // console.log('rad:', rad);
        for (var i = 0; i < Math.PI * 2; i += 0.6) {
          // for (var i = 0; i < Math.PI * 2; i += 0.6) {
          // iが中心核, radは振り幅
          var dx = Math.cos(i) * rad;
          var dy = Math.sin(i) * rad;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          // arc(x, y, radius, startAngle, endAngle, anticlockwise)
          ctx.arc(this.x + dx, this.y + dy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (this.count > 30) {
        this.initialize();
      }
    }
  };

  this.initialize();
}

function init() {
  var canvas = document.getElementById('field');
  ctx = canvas.getContext('2d');
  ctx.globalAlpha = 0.3;
  var colors = [
    '#ff0000',
    '#ffff00',
    '#ffffff',
    '#ff00ff',
    '#00ff00',
    '#7F7FFF',
    '#00ffff'
  ];

  for (var i = 0; i < 1; i++) {
    // 除算を使って7以内の乱数に丸める
    fires.push(new Firework(random(60) + 60, colors[i % 7]));
  }
  setInterval(tick, 100);
}

function tick() {
  fires.forEach(function(e) {
    e.move();
  });
  paint();
}

function paint() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  fires.forEach(function(e) {
    e.draw();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
