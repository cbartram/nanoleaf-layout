/**
 * Created by Christian Bartram
 * Github @cbartram
 */
const { CENTROID_HEIGHT } = require('./constants');

/**
 * Maps a cartesian point to a 2D HTML Canvas point
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array where the Screen point x is in position 0 and the screen point Y is in position 1
 */
const cartesianToScreen = (cx, cy, height, width) => {
  let screenX = cx + width / 2;
  let screenY = height / 2 - cy;

  return [screenX, screenY];
};

/**
 * Determines if the given triangle should be rotated
 * @param rotation integer rotation in degrees
 * @returns {boolean} true if the rotation should occur false otherwise
 */
const doRotate = (rotation) => {
  return rotation / 60 % 2 !== 0;
};

/**
 * Calculates the top most point of the equilateral triangle given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */
const getTopFromCentroid = (cx, cy, height, width) => {
  let screen = cartesianToScreen(cx, cy, height, width);

  return [
    parseInt(screen[0].toFixed()),
    parseInt((screen[1] - CENTROID_HEIGHT).toFixed())
  ];
};

/**
 * Calculates the left most point of the equilateral triangle given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */
const getLeftFromCentroid = (cx, cy, height, width) => {
  let screen = cartesianToScreen(cx, cy, height, width);

  return [
    parseInt((screen[0] - CENTROID_HEIGHT).toFixed()),
    parseInt((screen[1] + CENTROID_HEIGHT).toFixed())
  ];
};

/**
 * Calculates the right most point of the equilateral triangle given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */
const getRightFromCentroid = (cx, cy, height, width) => {
  let screen = cartesianToScreen(cx, cy, height, width);

  return [
    parseInt((screen[0] + CENTROID_HEIGHT).toFixed()),
    parseInt((screen[1] + CENTROID_HEIGHT).toFixed())
  ];
};

/**
 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */
const rotateLeftFromCentroid = (cx, cy, height, width) => {
  let screen = cartesianToScreen(cx, cy, height, width);

  return [
    parseInt((screen[0] - CENTROID_HEIGHT).toFixed()),
    parseInt((screen[1] - CENTROID_HEIGHT + 30).toFixed()) // +30 adds spacing
  ];
};

/**
 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */
const rotateRightFromCentroid = (cx, cy, height, width) => {
  let screen = cartesianToScreen(cx, cy, height, width);

  return [
    parseInt((screen[0] + CENTROID_HEIGHT).toFixed()),
    parseInt((screen[1] - CENTROID_HEIGHT + 30).toFixed())
  ];
};

/**
 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */
const rotateTopFromCentroid = (cx, cy, height, width) => {
  let screen = cartesianToScreen(cx, cy, height, width);

  return [
    parseInt(screen[0].toFixed()),
    parseInt((screen[1] + CENTROID_HEIGHT + 30).toFixed())
  ];
};

module.exports = {
  rotateLeftFromCentroid,
  rotateTopFromCentroid,
  rotateRightFromCentroid,
  getLeftFromCentroid,
  getTopFromCentroid,
  getRightFromCentroid,
  doRotate,
  cartesianToScreen,
};
