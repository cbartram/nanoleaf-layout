/**
 * Created by Christian Bartram on 6/20/17.
 * Github @cbartram
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CENTROID_HEIGHT = (Math.sqrt(3) / 6) * 150;

class NanoleafLayout extends Component {
	
	componentDidMount() {
		let canvas = document.querySelector('#canvas');
		let ctx = canvas.getContext('2d');

		ctx.translate(ctx.width / 2, ctx.height / 2);
		ctx.scale(1, 1);

		
		if(!this.props.data.hasOwnProperty('positionData')) {
			throw new Error('Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value');
		}
		
		this.props.data.positionData.map((value) => {
			this.props.onDraw(this.draw(ctx, (value.x / this.props.panelSpacing) + this.props.xOffset, (value.y / this.props.panelSpacing) + this.props.yOffset, value.o, value.color, value.panelId));
		});
	};
	
	componentDidUpdate() {
		let canvas = document.querySelector('#canvas');
		let ctx = canvas.getContext('2d');

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		ctx.translate(ctx.width / 2, ctx.height / 2);
		ctx.scale(1, 1);


		if(!this.props.data.hasOwnProperty('positionData')) {
			throw new Error('Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value');
		}
		
		this.props.data.positionData.map((value) => {
			this.props.onDraw(this.draw(ctx, (value.x / this.props.panelSpacing) + this.props.xOffset, (value.y / this.props.panelSpacing) + this.props.yOffset, value.o, value.color, value.panelId));
		});
	}

	static get defaultProps() {
		return {
			xOffset: 0,
			yOffset: 0,
			panelSpacing: 1.37,
			canvasWidth: 1000,
			canvasHeight: 1000,
			strokeColor: '#FFFFFF',
			onDraw: function(data) { return data; },
			showId: false,
			strokeWidth: 2,
		};
	}

	/**
	 * Draws an Equilateral Triangle on the Canvas
	 * @param ctx client context
	 * @param x integer Cartesian X coordinate
	 * @param y integer Cartesian Y coordinate
	 * @param o integer Orientation in degrees
	 * @param color hexadecimal color code Triangle Color i.e. #FF00FF
	 * @param id integer the panel identifier
	 */
	draw(ctx, x, y, o, color, id) {
        let orient = false;

		let centroid = this.cartesianToScreen(ctx, x, y);

		let topPoint = this.getTopFromCentroid(ctx, x, y);
		let leftPoint = this.getLeftFromCentroid(ctx, x,y);
		let rightPoint = this.getRightFromCentroid(ctx, x, y);

		let topRotatedPoint = this.rotateTopFromCentroid(ctx, x, y);
		let leftRotatedPoint = this.rotateLeftFromCentroid(ctx, x, y);
		let rightRotatedPoint = this.rotateRightFromCentroid(ctx, x, y);

        ctx.lineWidth = this.props.strokeWidth;
        ctx.strokeStyle = this.props.strokeColor;
		ctx.fillStyle = color;
		ctx.save();

		ctx.beginPath();

		if(this.doRotate(o)) {

			ctx.moveTo(topRotatedPoint[0], topRotatedPoint[1]);
			ctx.lineTo(leftRotatedPoint[0], leftRotatedPoint[1]);
			ctx.lineTo(rightRotatedPoint[0], rightRotatedPoint[1]);
			ctx.lineTo(topRotatedPoint[0], topRotatedPoint[1]);
			
			orient = true;
			

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

		if(this.props.showId) {
            ctx.font = '14px Arial';
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(id, centroid[0] - 3, centroid[1] + 15);
            ctx.save();
        }

        if(orient) {
			return [topRotatedPoint, leftRotatedPoint, rightRotatedPoint];
		} else {
			return [topPoint, leftPoint, rightPoint];
		}

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
	canvasHeight: PropTypes.number,
	canvasWidth: PropTypes.number,
	data: PropTypes.object.isRequired, //should be array
	onDraw: PropTypes.func,
	panelSpacing: PropTypes.number,
	strokeColor: PropTypes.string,
	xOffset: PropTypes.number,
	yOffset: PropTypes.number,
	showId: PropTypes.bool,
	strokeWidth: PropTypes.number,
};

export default NanoleafLayout;



