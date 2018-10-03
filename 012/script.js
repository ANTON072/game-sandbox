var ctx,
  width,
  height,
  snowTimer,
  snows = [];

function random(limit) {
  return Math.floor(Math.random() * limit);
}

function Snow() {
  this.x = random(600);
  this.y = -10;
  this.drift = Math.random();
  this.speed = random(5) + 1;
  this.width = random(3) + 2;
  this.height = this.width;
  // サインカーブを描くための中心角
  this.theta = random(100);
  // this.theta = 50;
  // 振り幅
  this.radius = random(10) + 3;
}

function init() {
  ctx = document.getElementById('snowfield').getContext('2d');
  ctx.globalAlpha = 0.6;
  snowTimer = setInterval(addSnow, 200);
  setInterval(tick, 50);
}

function addSnow() {
  snows.push(new Snow());
  if (snows.length >= 100) {
    clearInterval(snowTimer);
  }
}

function tick() {
  for (var i = 0; i < snows.length; i++) {
    snows[i].y += snows[i].speed;
    if (snows[i].y > 600) {
      snows[i].y = -5;
    }
    snows[i].x += snows[i].drift;
    if (snows[i].x > 600) {
      snows[i].x = 0;
    }
    snows[i].theta += 0.1;
  }
  paint();
}

function paint() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = 'white';
  snows.forEach(function(s) {
    // ctx.fillRect(s.x + Math.sin(s.theta) * s.radius, s.y, s.width, s.height);
    // xからのサインカーブ位置
    // sinでもcosでもいい。radiusは振り幅
    ctx.fillRect(s.x + Math.sin(s.theta) * s.radius, s.y, s.width, s.height);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
