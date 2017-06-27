/**
 * Created by Christian Bartram on 6/20/17.
 * Github @cbartram
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PANEL_GAP_DIVISOR = 1.37;
const CENTROID_HEIGHT = (Math.sqrt(3) / 6) * 150;

class NanoleafLayout extends Component {
	
	componentDidMount() {
		let canvas = document.querySelector('#canvas');
		let ctx = canvas.getContext('2d');

		ctx.translate(ctx.width/2,ctx.height/2);
		ctx.scale(1, 1);

		this.props.data.positionData.map((value) => {
			this.draw(ctx, (value.x / PANEL_GAP_DIVISOR) + this.props.xOffset, (value.y / PANEL_GAP_DIVISOR) + this.props.yOffset, value.o, value.color);
		});
	};

	/**
	 * Draws an Equilateral Triangle on the Canvas
	 * @param ctx client context
	 * @param x integer Cartesian X coordinate
	 * @param y integer Cartesian Y coordinate
	 * @param o integer Orientation in degrees
	 * @param color hexadecimal color code Triangle Color i.e. #FF00FF
	 */
	draw(ctx, x, y, o, color) {

		let topPoint = this.getTopFromCentroid(ctx, x, y);
		let leftPoint = this.getLeftFromCentroid(ctx, x,y);
		let rightPoint = this.getRightFromCentroid(ctx, x, y);

		ctx.strokeStyle = '#ffffff';
		ctx.fillStyle = color;
		ctx.save();

		ctx.beginPath();

		if(this.doRotate(o)) {

			let topRotatedPoint = this.rotateTopFromCentroid(ctx, x, y);
			let leftRotatedPoint = this.rotateLeftFromCentroid(ctx, x, y);
			let rightRotatedPoint = this.rotateRightFromCentroid(ctx, x, y);

			ctx.moveTo(topRotatedPoint[0], topRotatedPoint[1]);
			ctx.lineTo(leftRotatedPoint[0], leftRotatedPoint[1]);
			ctx.lineTo(rightRotatedPoint[0], rightRotatedPoint[1]);
			ctx.lineTo(topRotatedPoint[0], topRotatedPoint[1]);

		} else {

			ctx.moveTo(topPoint[0], topPoint[1]);
			ctx.lineTo(rightPoint[0], rightPoint[1]);
			ctx.lineTo(leftPoint[0], leftPoint[1]);
			ctx.lineTo(topPoint[0], topPoint[1]);
		}

		ctx.fill();
		ctx.stroke();

		ctx.closePath();
		ctx.save();

	};

	/**
	 * Maps a cartesian point to a 2D HTML Canvas point
	 * @param ctx Client Context for the width and height
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array where the Screen point x is in position 0 and the screen point Y is in position 1
	 */
	cartesianToScreen(ctx, cx, cy) {
		let screenX = cx + ctx.canvas.width / 2;
		let screenY = ctx.canvas.height / 2 - cy;

		return [screenX, screenY];
	};

	/**
	 * Determines if the given triangle should be rotated
	 * @param rotation integer rotation in degrees
	 * @returns {boolean} true if the rotation should occur false otherwise
	 */
	doRotate(rotation) {
		return (rotation / 60) % 2 !== 0 ;
	};

	/**
	 * Calculates the top most point of the equilateral triangle given the centroid
	 * @param ctx client context
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
	 */
	getTopFromCentroid(ctx, cx, cy) {
		let screen = this.cartesianToScreen(ctx, cx, cy);

		return [screen[0], screen[1] - CENTROID_HEIGHT];
	};

	/**
	 * Calculates the left most point of the equilateral triangle given the centroid
	 * @param ctx client context
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
	 */
	getLeftFromCentroid(ctx, cx, cy) {
		let screen = this.cartesianToScreen(ctx, cx, cy);

		return [screen[0] - CENTROID_HEIGHT, screen[1] + CENTROID_HEIGHT];
	};

	/**
	 * Calculates the right most point of the equilateral triangle given the centroid
	 * @param ctx client context
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
	 */
	getRightFromCentroid(ctx, cx, cy) {
		let screen = this.cartesianToScreen(ctx, cx, cy);

		return [screen[0] + CENTROID_HEIGHT, screen[1] + CENTROID_HEIGHT];
	};

	/**
	 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
	 * @param ctx client context
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
	 */
	rotateLeftFromCentroid(ctx, cx, cy) {
		let screen = this.cartesianToScreen(ctx, cx, cy);

		return [screen[0] - CENTROID_HEIGHT, screen[1] - CENTROID_HEIGHT + 30]; //30 is for spacing
	};

	/**
	 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
	 * @param ctx client context
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
	 */
	rotateRightFromCentroid(ctx, cx, cy) {
		let screen = this.cartesianToScreen(ctx, cx, cy);

		return [screen[0] + CENTROID_HEIGHT, screen[1] - CENTROID_HEIGHT + 30];
	};

	/**
	 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
	 * @param ctx client context
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
	 */
	rotateTopFromCentroid(ctx, cx, cy) {
		let screen = this.cartesianToScreen(ctx, cx, cy);

		return [screen[0], screen[1] + CENTROID_HEIGHT + 30];
	};


	render() {
		return (<div><canvas id="canvas" width={this.props.canvasWidth} height={this.props.canvasHeight}/></div>);
	}
}

NanoleafLayout.propTypes = {
	canvasHeight: PropTypes.number.isRequired,
	canvasWidth: PropTypes.number.isRequired,
	data: PropTypes.number.isRequired, //should be array
	xOffset: PropTypes.number,
	yOffset: PropTypes.number,
};

export default NanoleafLayout;



