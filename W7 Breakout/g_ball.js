// ==========
// BALL STUFF
// ==========

// BALL STUFF

// All active balls in game. Use this array if the intention is to implement multiple-balls feature
var g_activeBalls = [];

// A generic constructor which accepts an arbitrary descriptor object
function Ball(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}


var g_ball = new Ball({
    cx: 550,
    cy: 570,
    nextX : null,
    nextY : null,
    radius: 10,

    xVel: 0,
    yVel: 0,
    BASE_xVel : 5,
    BASE_yVel : 8,
});

g_activeBalls.push(g_ball);

var g_trails = [];

// Add trails to the ball
function addToTrail(x, y) {
  g_trails.unshift([x, y, 0]);
  if (g_trails.length > 5) {
    g_trails.pop();
  }
  for (var i  = 0; i < g_trails.length; i++) {
    g_trails[i][2] = 10 - (8/12)*i;
  }
}

// Render the ball's trail
function renderTrails(ctx) {
  ctx.fillStyle= "rgba(39, 37, 37, 0.35)";
  for (var i = 0; i < g_trails.length; i++) {
    fillCircle(ctx, g_trails[i][0], g_trails[i][1], g_trails[i][2]);
  }
  ctx.fillStyle= "black";
}

Ball.prototype.update = function (du) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;

    // Compute my provisional new position (barring collisions)
    this.nextX = prevX + this.xVel * du;
    this.nextY = prevY + this.yVel * du;

    // Bounce off the paddles
    if (g_paddle.collidesWith(prevX, prevY, this.nextX, this.nextY, this.radius)) {
        this.yVel *= -1;
    }

    // Bounce off top and side edges
    if (this.nextY < 0) {
        this.yVel *= -1;
    }
    if (this.nextX < 0 || this.nextX > g_canvas.width) {
        this.xVel *= -1;
    }
    if (this.nextY > g_canvas.height && this === g_ball) {
      this.reset();
      g_paddle.life--;
    }

    addToTrail(g_ball.cx, g_ball.cy);

    // *Actually* update my position
    // ...using whatever velocity I've ended up with
    //
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
};

Ball.prototype.isReset = function () {
  return this.xVel === 0 && this.yVel === 0;
}

Ball.prototype.reset = function () {
    var dt =  Math.random() * g_paddle.halfWidth * 2;
    this.cx = g_paddle.cx - g_paddle.halfWidth + dt;
    this.cy = g_paddle.cy - 2 * this.radius;
    this.yVel = 0;
    this.xVel = 0;
};

Ball.prototype.render = function (ctx) {
    fillCircle(ctx, this.cx, this.cy, this.radius);
};
