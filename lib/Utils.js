/**
 * Created by Christian Bartram
 * Github @cbartram
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cartesianToScreen = cartesianToScreen;
exports.doRotate = doRotate;
exports.getTopFromCentroid = getTopFromCentroid;
exports.getLeftFromCentroid = getLeftFromCentroid;
exports.getRightFromCentroid = getRightFromCentroid;
exports.rotateLeftFromCentroid = rotateLeftFromCentroid;
exports.rotateRightFromCentroid = rotateRightFromCentroid;
exports.rotateTopFromCentroid = rotateTopFromCentroid;
var CENTROID_HEIGHT = Math.sqrt(3) / 6 * 150;

/**
 * Maps a cartesian point to a 2D HTML Canvas point
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array where the Screen point x is in position 0 and the screen point Y is in position 1
 */

function cartesianToScreen(cx, cy, height, width) {
    var screenX = cx + width / 2;
    var screenY = height / 2 - cy;

    return [screenX, screenY];
}

/**
 * Determines if the given triangle should be rotated
 * @param rotation integer rotation in degrees
 * @returns {boolean} true if the rotation should occur false otherwise
 */

function doRotate(rotation) {
    return rotation / 60 % 2 !== 0;
}

/**
 * Calculates the top most point of the equilateral triangle given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */

function getTopFromCentroid(cx, cy, height, width) {
    var screen = this.cartesianToScreen(cx, cy, height, width);

    return [screen[0].toFixed(), (screen[1] - CENTROID_HEIGHT).toFixed()];
}

/**
 * Calculates the left most point of the equilateral triangle given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */

function getLeftFromCentroid(cx, cy, height, width) {
    var screen = this.cartesianToScreen(cx, cy, height, width);

    return [(screen[0] - CENTROID_HEIGHT).toFixed(), (screen[1] + CENTROID_HEIGHT).toFixed()];
}

/**
 * Calculates the right most point of the equilateral triangle given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */

function getRightFromCentroid(cx, cy, height, width) {
    var screen = this.cartesianToScreen(cx, cy, height, width);

    return [(screen[0] + CENTROID_HEIGHT).toFixed(), (screen[1] + CENTROID_HEIGHT).toFixed()];
}

/**
 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */

function rotateLeftFromCentroid(cx, cy, height, width) {
    var screen = this.cartesianToScreen(cx, cy, height, width);

    return [(screen[0] - CENTROID_HEIGHT).toFixed(), (screen[1] - CENTROID_HEIGHT + 30).toFixed()]; //30 is for spacing
}

/**
 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */

function rotateRightFromCentroid(cx, cy, height, width) {
    var screen = this.cartesianToScreen(cx, cy, height, width);

    return [(screen[0] + CENTROID_HEIGHT).toFixed(), (screen[1] - CENTROID_HEIGHT + 30).toFixed()];
}

/**
 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */

function rotateTopFromCentroid(cx, cy, height, width) {
    var screen = this.cartesianToScreen(cx, cy, height, width);

    return [screen[0].toFixed(), (screen[1] + CENTROID_HEIGHT + 30).toFixed()];
}