// "Crappy PONG" -- step by step
//
// Step 13: Simplify
/*

Supporting timer-events (via setInterval) *and* frame-events (via requestAnimationFrame)
adds significant complexity to the the code.

I can simplify things a little by focusing on the latter case only (which is the
superior mechanism of the two), so let's try doing that...

The "MAINLOOP" code, inside g_main, is much simplified as a result.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

g_ctx.font = "bold 18pt Arial";


/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ============
// PADDLE STUFF
// ============

// PADDLE

var KEY_RIGHT_ARROW = 39;
var KEY_LEFT_ARROW = 37;
var KEY_SPACE = 32;

// Global paddle
var g_paddle = new Paddle({
    cx : g_canvas.width / 2,
    cy : g_canvas.height - 50,

    GO_LEFT   : KEY_LEFT_ARROW,
    GO_RIGHT : KEY_RIGHT_ARROW,
    SHOOT_BALL : KEY_SPACE,

    score : 0,
    life : 3
});

// 2D array for bricks in game
var g_bricks = [];
createBricks();

// Render score
function renderText(ctx) {
  var score = "Score : " + g_paddle.score;
  ctx.fillText(score, 30, 50);
}

// Render remaining life count
function renderLife(ctx) {
  for (var i = 0; i < g_paddle.life; i++) {
    fillCircle(ctx, 200 + 30*i, 42, 8);
  }
}

// Creates bricks with random chances of including powerup
function createBricks() {
  var height = 100;

  for (var k = 0; k < 5; k++) {
    var bricks = [];
    for (var i = 0; i < 12; i++) {
      var brick = new Brick({
          cx : 150,
          cy : height,
          life : 1,
      });
      // Determines whether thish brick will have a powerup or not
      if (Math.random() > 0.65) {
        brick.color = g_brickPowerups[Math.floor(Math.random() * g_brickPowerups.length)].color;
      }
      brick.cx += brick.halfWidth * 2 * i + 0*i;
      bricks.push(brick);
    }
    g_bricks.push(bricks);
    height += 2 * g_bricks[0][0].halfHeight + 4;
  }
}

// Update the bricks
function updateBricks() {
  g_bricks.forEach(row => row.forEach(brick => brick.update()));
}

// Render the bricks
function renderBricks(ctx) {
  g_bricks.forEach(row => row.forEach(brick => brick.render(ctx)));
}


// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
  g_activeBalls.map(ball => ball.update(du));
  g_activePowerups.map(powerup => powerup.update(du));
  g_paddle.update(du);
  updateBricks();
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
    g_ctx.fillStyle = "#fafafa";
    g_ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);
    g_ctx.fillStyle = "black";
    g_activeBalls.map(ball => ball.render(ctx));
    g_activePowerups.map(powerup => powerup.render(ctx));
    g_paddle.render(ctx);

    renderBricks(ctx);
    renderText(ctx);
    renderLife(ctx);
    renderTrails(ctx);
}

// Kick it off
g_main.init();
