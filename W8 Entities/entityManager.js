/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

  // "PRIVATE" DATA

  _rocks: [],
  _bullets: [],
  _ships: [],

  _bShowRocks: true,

  // "PRIVATE" METHODS

  _generateRocks: function() {
    var i, NUM_ROCKS = 4;

    for (var i = 0; i < NUM_ROCKS; i++) {
      this._rocks.push(new Rock());
    }
  },

  _findNearestShip: function(posX, posY) {

  var theShip = null;
  var theIndex = -1;
  var dist = Infinity;

  for (var i = 0; i < this._ships.length; i++) {
    var p = this._ships[i].getPos();
    var wDist = util.wrappedDistSq(posX, posY, p.posX, p.posY, g_canvas.width, g_canvas.height);
    if (wDist < dist) {
      theShip = this._ships[i];
      theIndex = i;
      dist = wDist;
    }
  }

  return {
    theShip: theShip, // the object itself
    theIndex: theIndex // the array index where it lives
  };
},

  _forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
      fn.call(aCategory[i]);
    }
  },

  // PUBLIC METHODS

  // A special return value, used by other objects,
  // to request the blessed release of death!
  //
  KILL_ME_NOW: -1,

  // Some things must be deferred until after initial construction
  // i.e. thing which need `this` to be defined.
  //
  deferredSetup: function() {
    this._categories = [this._rocks, this._bullets, this._ships];
  },

  init: function() {
    this._generateRocks();

    // I could have made some ships here too, but decided not to.
    //this._generateShip();
  },

  fireBullet: function(cx, cy, velX, velY, rotation) {
    this._bullets.push(new Bullet({
      cy : cy,
      cx : cx,
      velX : velX,
      velY : velY,
      rotation : rotation
    }));
  },

  generateShip: function(descr) {
    this._ships.push(new Ship(descr));
  },

  killNearestShip: function(xPos, yPos) {
    var ship = this._findNearestShip(xPos, yPos);
    this._ships.splice(ship.theIndex, 1);
  },

  yoinkNearestShip: function(xPos, yPos) {
    var ship = this._findNearestShip(xPos, yPos);
    if (ship.theShip) {
      this._ships[ship.theIndex].setPos(xPos, yPos);
    }
  },

  resetShips: function() {
    this._forEachOf(this._ships, Ship.prototype.reset);
  },

  haltShips: function() {
    this._forEachOf(this._ships, Ship.prototype.halt);
  },

  toggleRocks: function() {
    this._bShowRocks = !this._bShowRocks;
  },

  update: function(du) {

    // TODO: Implement this

    // NB: Remember to handle the "KILL_ME_NOW" return value!
    //     and to properly update the array in that case.

    this._ships.forEach(ship => ship.update(du));
    this._rocks.forEach(rock => rock.update(du));

    for (var i = 0; i < this._bullets.length; i++) {
      this._bullets[i].update(du);
      if(this._bullets[i].lifeSpan <= 0) {
        this._bullets.splice(i, 1);
      }
    }
  },

  render: function(ctx) {

    // TODO: Implement this

    // NB: Remember to implement the ._bShowRocks toggle!
    // (Either here, or if you prefer, in the Rock objects)

    if (this._bShowRocks) {
      this._rocks.forEach(rock => rock.render(ctx));
    }
    this._ships.forEach(ship => ship.render(ctx));
    this._bullets.forEach(bullet => bullet.render(ctx));
  }

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

entityManager.init();
