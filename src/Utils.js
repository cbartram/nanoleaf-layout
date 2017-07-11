/**
 * Created by Christian Bartram
 * Github @cbartram
 */
const CENTROID_HEIGHT = Math.sqrt(3) / 6 * 150;


/**
 * Maps a cartesian point to a 2D HTML Canvas point
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array where the Screen point x is in position 0 and the screen point Y is in position 1
 */
export function cartesianToScreen(cx, cy, height, width) {
    let screenX = cx + width / 2;
    let screenY = height / 2 - cy;

    return [screenX, screenY];
}

/**
 * Determines if the given triangle should be rotated
 * @param rotation integer rotation in degrees
 * @returns {boolean} true if the rotation should occur false otherwise
 */
export function doRotate(rotation) {
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
export function getTopFromCentroid(cx, cy, height, width) {
    let screen = this.cartesianToScreen(cx, cy, height, width);

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
export function getLeftFromCentroid(cx, cy, height, width) {
    let screen = this.cartesianToScreen(cx, cy, height, width);

    return [
        (screen[0] - CENTROID_HEIGHT).toFixed(),
        (screen[1] + CENTROID_HEIGHT).toFixed()
    ];
}

/**
 * Calculates the right most point of the equilateral triangle given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */
export function getRightFromCentroid(cx, cy, height, width) {
    let screen = this.cartesianToScreen(cx, cy, height, width);

    return [
        (screen[0] + CENTROID_HEIGHT).toFixed(),
        (screen[1] + CENTROID_HEIGHT).toFixed()
    ];
}

/**
 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */
export function rotateLeftFromCentroid(cx, cy, height, width) {
    let screen = this.cartesianToScreen(cx, cy, height, width);

    return [
        (screen[0] - CENTROID_HEIGHT).toFixed(),
        (screen[1] - CENTROID_HEIGHT + 30).toFixed()
    ]; //30 is for spacing
}

/**
 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */
export function rotateRightFromCentroid(cx, cy, height, width) {
    let screen = this.cartesianToScreen(cx, cy, height, width);

    return [
        (screen[0] + CENTROID_HEIGHT).toFixed(),
        (screen[1] - CENTROID_HEIGHT + 30).toFixed()
    ];
}

/**
 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */
export function rotateTopFromCentroid(cx, cy, height, width) {
    let screen = this.cartesianToScreen(cx, cy, height, width);

    return [
         screen[0].toFixed(),
        (screen[1] + CENTROID_HEIGHT + 30).toFixed()
    ];
}