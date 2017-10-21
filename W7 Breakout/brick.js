

// A generic constructor which accepts an arbitrary descriptor object
function Brick(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.
Brick.prototype.halfWidth = 30;
Brick.prototype.halfHeight = 12;
Brick.prototype.defaultColor = "#264675";

Brick.prototype.update = function() {
  if (this.collidesWithBall()) {
    if (--this.life === 0) {
      g_paddle.score++;
      // Creates a powerup when the brick is destroyed
      if (this.color) {
        var powerup = new Powerup({
          cx : this.cx,
          cy : this.cy
        }, g_findPowerup(this.color));
        g_activePowerups.push(powerup);
      }
    }
    // Update the global array which will be used to render the bricks
    g_bricks = g_bricks.map(row => row.filter(brick => brick.life > 0));
  }
}

Brick.prototype.render = function (ctx) {
  this.color ? ctx.fillStyle = this.color : ctx.fillStyle = this.defaultColor;
  ctx.fillRect(this.cx - this.halfWidth,
               this.cy - this.halfHeight,
               this.halfWidth * 2,
               this.halfHeight * 2);
  ctx.fillStyle = "black";
};

Brick.prototype.collidesWithBall = function () {
    var r = g_ball.radius;
    var leftBoundX = this.cx - this.halfWidth;
    var rightBoundX = this.cx + this.halfWidth;
    var upperBoundY = this.cy - this.halfHeight;
    var lowerBoundY = this.cy + this.halfHeight;

    var intersectX = g_ball.nextX + r >= leftBoundX && g_ball.nextX - r <= rightBoundX;
    var intersectY = g_ball.nextY + r >= upperBoundY && g_ball.nextY - r <= lowerBoundY;

    if (intersectX && intersectY) {
      if (g_ball.cx > this.cx + this.halfWidth || g_ball.cx < this.cx - this.halfWidth && !g_ball.isSuperman) {
        g_ball.xVel *= -1;
      }
      else {
        if (!g_ball.isSuperman) {
          g_ball.yVel *= -1;
        }
      }
      return true;
    }
    return false;
};
