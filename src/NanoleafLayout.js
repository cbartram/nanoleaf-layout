/**
 * Created by Christian Bartram on 6/20/17.
 * Github @cbartram
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observable, extendObservable} from 'mobx'

const CENTROID_HEIGHT = (Math.sqrt(3) / 6) * 150;

class NanoleafLayout extends Component {

	constructor(props) {
		super(props);

        extendObservable(this, {
            dataSVG: null,
        })
	}
	
	componentWillMount() {
		let data = []; //Data to mutate state

        if(!this.props.data.hasOwnProperty('positionData')) {
            throw new Error('Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value');
        }

        this.props.data.positionData.map((value) => {
			let draw = this.draw((value.x / this.props.panelSpacing) + this.props.xOffset, (value.y / this.props.panelSpacing) + this.props.yOffset, value.o, value.color, value.panelId);

			this.props.onDraw(draw);
			data.push(draw);

        });

        this.dataSVG = data;
	};

	componentWillUpdate() {
		let data = [];

		//Recalculate new positions on the panels
        this.props.data.positionData.map((value, key) => {
            let draw = this.draw((value.x / this.props.panelSpacing) + this.props.xOffset, (value.y / this.props.panelSpacing) + this.props.yOffset, value.o, value.color, value.panelId);

            this.props.onDraw(draw); //onDraw Callback occurs here
            data.push(draw);
        });

		this.dataSVG = data;
    }

	static get defaultProps() {
		return {
			xOffset: 0,
			yOffset: 0,
			panelSpacing: 1.37,
			width: 1000,
			height: 1000,
			strokeColor: '#FFFFFF',
			onDraw: function(data) { return data; },
			showId: false,
			strokeWidth: 2,
			rotation: 0,
			onHover: function(data) { return data; },
			onClick: function(data) { return data; },
			onExit: function(data) { return data; },
		};
	}

	/**
	 * Draws an Equilateral Triangle on the Canvas
	 * @param x integer Cartesian X coordinate
	 * @param y integer Cartesian Y coordinate
	 * @param o integer Orientation in degrees
	 * @param color hexadecimal color code Triangle Color i.e. #FF00FF
	 * @param id integer the panel identifier
	 */
	draw(x, y, o, color, id) {
        let orient = false;
        let path = [];

        let centroid = this.cartesianToScreen(x, y);

        let topPoint = this.getTopFromCentroid(x, y);
		let leftPoint = this.getLeftFromCentroid(x,y);
		let rightPoint = this.getRightFromCentroid(x, y);

		let topRotatedPoint = this.rotateTopFromCentroid(x, y);
		let leftRotatedPoint = this.rotateLeftFromCentroid(x, y);
		let rightRotatedPoint = this.rotateRightFromCentroid(x, y);

		if(this.doRotate(o)) {

			path.push(`M${topRotatedPoint[0]} ${topRotatedPoint[1]}`);
			path.push(`L${leftRotatedPoint[0]} ${leftRotatedPoint[1]}`);
			path.push(`L${rightRotatedPoint[0]} ${rightRotatedPoint[1]}`);
			path.push(`L${topRotatedPoint[0]} ${topRotatedPoint[1]}`);

			orient = true;
			

		} else {

            path.push(`M${topPoint[0]} ${topPoint[1]}`);
            path.push(`L${leftPoint[0]} ${leftPoint[1]}`);
            path.push(`L${rightPoint[0]} ${rightPoint[1]}`);
            path.push(`L${topPoint[0]} ${topPoint[1]}`);
		}

        path.push("Z");
		path = path.join(" ");

		id = {
            x: centroid[0] - 3,
            y: centroid[1] + 15,
            id: id
        };

        if(orient) {
			return {
				topPoint: topRotatedPoint,
				leftPoint: leftRotatedPoint,
				rightPoint: rightRotatedPoint,
				centroid: centroid,
				rotated: true,
				color: color,
				path: path,
				id: id
			};
		} else {
			return {
				topPoint: topPoint,
				leftPoint: leftPoint,
				rightPoint: rightPoint,
				centroid: centroid,
				rotated: false,
				color: color,
				path: path,
                id: id
			};
		}

	};

	/**
	 * Maps a cartesian point to a 2D HTML Canvas point
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array where the Screen point x is in position 0 and the screen point Y is in position 1
	 */
	cartesianToScreen(cx, cy) {
		let screenX = cx + this.props.width / 2;
		let screenY = this.props.height / 2 - cy;

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
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
	 */
	getTopFromCentroid(cx, cy) {
		let screen = this.cartesianToScreen(cx, cy);

		return [screen[0].toFixed(), (screen[1] - CENTROID_HEIGHT).toFixed()];
	};

	/**
	 * Calculates the left most point of the equilateral triangle given the centroid
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
	 */
	getLeftFromCentroid(cx, cy) {
		let screen = this.cartesianToScreen(cx, cy);

		return [(screen[0] - CENTROID_HEIGHT).toFixed(), (screen[1] + CENTROID_HEIGHT).toFixed()];
	};

	/**
	 * Calculates the right most point of the equilateral triangle given the centroid
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
	 */
	getRightFromCentroid(cx, cy) {
		let screen = this.cartesianToScreen(cx, cy);

		return [(screen[0] + CENTROID_HEIGHT).toFixed(), (screen[1] + CENTROID_HEIGHT).toFixed()];
	};

	/**
	 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
	 */
	rotateLeftFromCentroid(cx, cy) {
		let screen = this.cartesianToScreen(cx, cy);

		return [(screen[0] - CENTROID_HEIGHT).toFixed(), (screen[1] - CENTROID_HEIGHT + 30).toFixed()]; //30 is for spacing
	};

	/**
	 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
	 */
	rotateRightFromCentroid(cx, cy) {
		let screen = this.cartesianToScreen(cx, cy);

		return [(screen[0] + CENTROID_HEIGHT).toFixed(), (screen[1] - CENTROID_HEIGHT + 30).toFixed()];
	};

	/**
	 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
	 * @param cx integer Cartesian X coordinate
	 * @param cy integer Cartesian Y coordinate
	 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
	 */
	rotateTopFromCentroid(cx, cy) {
		let screen = this.cartesianToScreen(cx, cy);

		return [screen[0].toFixed(), (screen[1] + CENTROID_HEIGHT + 30).toFixed()];
	};


	render() {
		return (
			<div>
				<svg height={this.props.width} width={this.props.height} style={{width: '100%', borderRadius:'50%'}} transform={`rotate(${this.props.rotation})`} >
					{
                        this.dataSVG.map((value, key) => {
                        	if(this.props.showId) {
                                return (
									<g key={key}>
										<path
											key={key + "_path"}
											d={value.path}
											strokeWidth={this.props.strokeWidth}
											onMouseOver={(e) => { this.props.onHover(value) }}
											onMouseOut={(e) => { this.props.onExit(value) }}
											onMouseDown={(e) => { this.props.onClick(value) }}
											fill={value.color}
											stroke={this.props.strokeColor}
										/>
										<text
											key={key + "_text"}
											x={value.id.x}
											y={value.id.y}
											fill="#FFFFFF"
										>{value.id.id}</text>
									</g>
                                )
                            } else {
                                return (
										<path
											key={key + "_path"}
											d={value.path}
											strokeWidth={this.props.strokeWidth}
											onMouseOver={(e) => { this.props.onHover(value) }}
											onMouseOut={(e) => { this.props.onExit(value) }}
											onMouseDown={(e) => { this.props.onClick(value) }}
											fill={value.color}
											stroke={this.props.strokeColor}
										/>
                                )
							}
                        })
					}
				</svg>
			</div>
		);
	}
}

NanoleafLayout.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	data: PropTypes.object.isRequired, //should be array
	onDraw: PropTypes.func,
	panelSpacing: PropTypes.number,
	strokeColor: PropTypes.string,
	xOffset: PropTypes.number,
	yOffset: PropTypes.number,
	showId: PropTypes.bool,
	strokeWidth: PropTypes.number,
	rotation: PropTypes.number,
	onHover: PropTypes.func,
	onClick: PropTypes.func,
	onExit: PropTypes.func,
};

export default NanoleafLayout;