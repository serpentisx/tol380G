"use strict";
/* jshint browser: true, devel: true, globalstrict: true */

/*
Stay within this 72 character margin, to keep your code easily readable
         1         2         3         4         5         6         7
123456789012345678901234567890123456789012345678901234567890123456789012
*/

// =======================
// YOUR STUFF GOES HERE...
// =======================

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var xPos = canvas.width / 2;
var yPos = canvas.height / 2;
var radius = xPos < yPos ? xPos - 50 : yPos - 50;

// Draw the watchmen-smiley
function drawDefaultSmiley(ctx) {
	  drawCircle(ctx, xPos, yPos, radius);
    ctx.strokeStyle = "black";
    ctx.stroke();

    fillEllipse(ctx, xPos, yPos + 0.35*radius, 0.58*radius, 0.4*radius, 2*Math.PI, "black");
    drawCircle(ctx, xPos, yPos - 0.12*radius, 0.8*radius);

    drawDimples();
    drawEyes();
    drawBloodSplat();
    drawBloodLine();
}

// Draw a circle with gradient color
function drawCircle(ctx, x, y, r) {
		var ix = xPos - 0.48*radius;
    var iy = yPos - 0.2*radius;
    var ir = 80;
    var or = 1.6*radius;
		var gradient = ctx.createRadialGradient(ix, iy, ir, xPos, yPos, or);

    gradient.addColorStop(0, "#ffe147");
    gradient.addColorStop(0.1, "#ffe104");
    gradient.addColorStop(0.6, "#e79c05");
    gradient.addColorStop(1, "#eb7b24");

	  ctx.arc(x, y, r, 0, 2 * Math.PI);
  	ctx.fillStyle = gradient;
	 	ctx.fill();
}

// Draw the dimples
function drawDimples() {
	var x1 = xPos + (83/150)*radius
  var x2 = xPos - (83/150)*radius
  var y = yPos + (71/150)*radius
	fillEllipse(ctx, x1, y, 0.12*radius, 0.02*radius, Math.PI/4, "black");
  fillEllipse(ctx, x2, y, 0.12*radius, 0.02*radius, -Math.PI/4, "black");
}

// Draw the eyes
function drawEyes() {
	var x1 = xPos + 0.35*radius;
  var x2 = xPos - 0.36*radius;
  var y = yPos - 0.36*radius;
	fillEllipse(ctx, x1, y, 0.22*radius, 0.06*radius, Math.PI/2, "black");
  fillEllipse(ctx, x2, y, 0.22*radius, 0.06*radius, Math.PI/2, "black");
}

// Draw the blood splat. Generates circles with random size, color and location.
function drawBloodSplat() {
		var r = radius - 5;
    var deg = 0.72 * Math.PI;
    var k = 6;
    var x;
    var y;

    while (k > 0) {
     	for (var i = 0; i < 9; i++) {
        deg += 0.015 + Math.random() * (0.035/150)*radius;
        x = Math.cos(deg) * r + xPos + Math.random() * 15;
        y = yPos - Math.sin(deg) * r + Math.random() * 15;
        ctx.arc(x,y, Math.random() * 5 + 0.5, 0, 2 * Math.PI);
        var red = Math.floor(Math.random() * 50 + 160);
        ctx.fillStyle = `rgb(${red},0,0)`;
        ctx.fill();
      }
      deg = (0.72 + Math.random() * 0.05) * Math.PI;
      r -= 5;
      k--;
      ctx.beginPath();
    }
}

// Draw the blood line with multiple small circles.
function drawBloodLine() {
		var r = radius - 10;
    var deg = 0.80 * Math.PI;
    var size = 3;
    var x;
    var y;

    for (var i = 0; i < 2/3*radius; i++) {
      x = Math.cos(deg) * r + xPos + Math.random() * 2;
      y = yPos - Math.sin(deg) * r; + Math.random() * 2;
      ctx.arc(x,y, size, 0, 2 * Math.PI);
      var red = Math.floor(Math.random() * 50 + 160);
      ctx.fillStyle = `rgb(${red},0,0)`;
      ctx.fill();
      r -= 1;
      size -= 0.015;
      ctx.beginPath();
    }
    ctx.arc(x,y, 3.2, 0, 2 * Math.PI);
    ctx.fillStyle = `rgb(${red},0,0)`;
    ctx.fill();
}


// =============
// TEST "DRIVER"
// =============

function draw() {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawDefaultSmiley(ctx);
}

draw();


// ================
// HELPER FUNCTIONS
// ================

function fillEllipse(ctx, cx, cy, halfWidth, halfHeight, angle, fillStyle) {
    ctx.save(); // save the current ctx state, to restore later
    ctx.beginPath();

    // These "matrix ops" are applied in last-to-first order
    // ..which can seem a bit weird, but actually makes sense
    //
    // After modifying the ctx state like this, it's important
    // to restore it
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(halfWidth, halfHeight);

    // Just draw a unit circle, and let the matrices do the rest!
    ctx.arc(0, 0, 1, 0, Math.PI*2);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.beginPath(); // reset to an empty path
    ctx.restore();
}
