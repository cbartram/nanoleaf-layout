/**
 * Created by christianbartram on 7/12/17.
 * Github @cbartram
 */
var Utils = require("../utils");

/**
 * Draws an Equilateral Triangle on the Canvas and
 * returns a SVG Object containing the data necessary to draw the SVG triangle
 * @param x integer Cartesian X coordinate
 * @param y integer Cartesian Y coordinate
 * @param o integer Orientation in degrees
 * @param color hexadecimal color code Triangle Color i.e. #FF00FF
 * @param strokeColor hexadecimal color code for the Triangles stroke i.e. #00FF00
 * @param height integer height of the SVG
 * @param width integer width of the SVG
 * @param id integer the panel identifier
 */
export function draw(x, y, o, color, strokeColor, id, height, width) {
  var centroid = Utils.cartesianToScreen(x, y, height, width);

  //Default for a single digit ID
  var textXOffset = -3;
  var textYOffset = 18;

  //Determine the Text offset
  if (id > 9 && id <= 99) {
    textXOffset = -10;
    textYOffset = 20;
  }

  if (id >= 100 && id < 999) {
    //Text is > 3 digit ID
    textXOffset = -13;
    textYOffset = 25;
  }

  //The Id that is drawn on top of the SVG when the showIds prop is true
  var panelID = {
    x: centroid[0] + textXOffset,
    y: centroid[1] + textYOffset,
    id: id
  };

  if (Utils.doRotate(o)) {
    var topRotatedPoint = Utils.rotateTopFromCentroid(x, y, height, width);
    var leftRotatedPoint = Utils.rotateLeftFromCentroid(x, y, height, width);
    var rightRotatedPoint = Utils.rotateRightFromCentroid(x, y, height, width);

    var path = "M" + topRotatedPoint[0] + " " + topRotatedPoint[1] + " L" + leftRotatedPoint[0] + " " + leftRotatedPoint[1] + " L" + rightRotatedPoint[0] + " " + rightRotatedPoint[1] + " L" + topRotatedPoint[0] + " " + topRotatedPoint[1] + " Z";

    return {
      topPoint: topRotatedPoint,
      leftPoint: leftRotatedPoint,
      rightPoint: rightRotatedPoint,
      centroid: centroid,
      rotated: true,
      color: color,
      strokeColor: strokeColor,
      path: path,
      id: id,
      panelID: panelID
    };
  } else {
    var topPoint = Utils.getTopFromCentroid(x, y, height, width);
    var leftPoint = Utils.getLeftFromCentroid(x, y, height, width);
    var rightPoint = Utils.getRightFromCentroid(x, y, height, width);

    var _path = "M" + topPoint[0] + " " + topPoint[1] + " L" + leftPoint[0] + " " + leftPoint[1] + " L" + rightPoint[0] + " " + rightPoint[1] + " L" + topPoint[0] + " " + topPoint[1] + " Z";

    return {
      topPoint: topPoint,
      leftPoint: leftPoint,
      rightPoint: rightPoint,
      centroid: centroid,
      rotated: false,
      color: color,
      strokeColor: strokeColor,
      path: _path,
      id: id,
      panelID: panelID
    };
  }
}