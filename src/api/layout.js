/**
 * Created by christianbartram on 7/12/17.
 * Github @cbartram
 */
const Utils = require('../utils');

/**
 * Draws an Equilateral Triangle on the Canvas and
 * returns a SVG Object containing the data necessary to draw the SVG triangle
 * @param x integer Cartesian X coordinate
 * @param y integer Cartesian Y coordinate
 * @param o integer Orientation in degrees
 * @param color hexadecimal color code Triangle Color i.e. #FF00FF
 * @param height integer height of the SVG
 * @param width integer width of the SVG
 * @param id integer the panel identifier
 */
export default function draw(x, y, o, color, id, height, width) {
    let centroid = Utils.cartesianToScreen(x, y, height, width);

    //The Id that is drawn on top of the SVG when the showIds prop is true
    let panelID = {
        x: centroid[0] - 3,
        y: centroid[1] + 15,
        id: id
    };

    if (Utils.doRotate(o)) {
        let topRotatedPoint = Utils.rotateTopFromCentroid(x, y, height, width);
        let leftRotatedPoint = Utils.rotateLeftFromCentroid(x, y, height, width);
        let rightRotatedPoint = Utils.rotateRightFromCentroid(x, y, height, width);

        let path = `M${topRotatedPoint[0]} ${topRotatedPoint[1]} L${leftRotatedPoint[0]} ${leftRotatedPoint[1]} L${rightRotatedPoint[0]} ${rightRotatedPoint[1]} L${topRotatedPoint[0]} ${topRotatedPoint[1]} Z`;

        return {
            topPoint: topRotatedPoint,
            leftPoint: leftRotatedPoint,
            rightPoint: rightRotatedPoint,
            centroid: centroid,
            rotated: true,
            color,
            path,
            id,
            panelID
        };
    } else {
        let topPoint = Utils.getTopFromCentroid(x, y, height, width);
        let leftPoint = Utils.getLeftFromCentroid(x, y, height, width);
        let rightPoint = Utils.getRightFromCentroid(x, y, height, width);

        let path = `M${topPoint[0]} ${topPoint[1]} L${leftPoint[0]} ${leftPoint[1]} L${rightPoint[0]} ${rightPoint[1]} L${topPoint[0]} ${topPoint[1]} Z`;

        return {
            topPoint: topPoint,
            leftPoint: leftPoint,
            rightPoint: rightPoint,
            centroid: centroid,
            rotated: false,
            color,
            path,
            id,
            panelID
        };
    }
};