/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

    // "PRIVATE" DATA

    _nextSpatialID: 1, // make all valid IDs non-falsey (i.e. don't start at 0)

    _entities: [],

    // "PRIVATE" METHODS
    //
    // <none yet>

    // PUBLIC METHODS

    getNewSpatialID: function() {
    	return this._nextSpatialID++;
    },

    register: function(entity) {
      	this._entities.push(entity);
    },

    unregister: function(entity) {
        for (var i = 0; i < this._entities.length; i++) {
          if (this._entities[i].getSpatialID() === entity.getSpatialID()) {
            this._entities.splice(i, 1);
            return;
          }
        }
    },

    findEntityInRange : function(posX, posY, radius) {
        for (var i = 0; i < this._entities.length; i++) {
            var p = this._entities[i].getPos();
            var ds = util.distSq(posX, posY, p.posX, p.posY) - (radius + this._entities[i].getRadius())**2;
            if (ds <= 0) {
                return this._entities[i];
            }
        }
    },

    render: function(ctx) {
        var oldStyle = ctx.strokeStyle;
        ctx.strokeStyle = "red";

        for (var ID in this._entities) {
            var e = this._entities[ID];
            var pos = e.getPos();
            util.strokeCircle(ctx, pos.posX, pos.posY, e.getRadius());
        }
        ctx.strokeStyle = oldStyle;
    }
}
