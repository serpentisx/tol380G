// A generic constructor which accepts an arbitrary descriptor object
function Paddle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Paddle.prototype.halfWidth = 80;
Paddle.prototype.halfHeight = 10;
Paddle.prototype.maxHalfWidth = 160;
Paddle.prototype.maxMinWidth = 10;
Paddle.prototype.speed = 10;

Paddle.prototype.update = function (du) {
    var prevX = this.cx;
    if (g_keys[this.GO_LEFT] && this.cx - this.halfWidth - this.speed > 0) {
        this.cx -= this.speed * du;
    } else if (g_keys[this.GO_RIGHT] && this.cx + this.halfWidth + this.speed < g_canvas.width) {
        this.cx += this.speed * du;
    }
    if (g_ball.isReset()) {
      g_ball.cx = (g_ball.cx - prevX) + this.cx;
    }
    if (eatKey(this.SHOOT_BALL) && g_ball.isReset()) {
      this.shootBall();
    }
    if (this.score === 60 || this.life < 0) {
      g_main._isGameOver = true;
    }
};

// Shoot ball from paddle
Paddle.prototype.shootBall = function() {
  g_ball.yVel = g_ball.BASE_yVel * -1;
  if (g_ball.cx <= this.cx) {
    g_ball.xVel = g_ball.BASE_xVel * -1;
  }
  else {
    g_ball.xVel = g_ball.BASE_xVel;
  }
};

Paddle.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);
};

// Collision detection
Paddle.prototype.collidesWith = function (prevX, prevY,
                                          nextX, nextY,
                                          r) {
    var leftBoundX = this.cx - this.halfWidth;
    var rightBoundX = this.cx + this.halfWidth;
    var upperBoundY = this.cy - this.halfHeight;
    var lowerBoundY = this.cy + this.halfHeight;

    // Check if intersects on x-axis
    var intersectX = nextX + r >= leftBoundX && nextX - r <= rightBoundX;

    // Check if intersects on y-axis
    var intersectY = nextY + r >= upperBoundY && nextY - r <= lowerBoundY;
  
    return intersectY && intersectX;
};
