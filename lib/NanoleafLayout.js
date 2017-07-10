/**
 * Created by Christian Bartram on 6/20/17.
 * Github @cbartram
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobx = require('mobx');

var CENTROID_HEIGHT = Math.sqrt(3) / 6 * 150;

var NanoleafLayout = (function (_Component) {
	_inherits(NanoleafLayout, _Component);

	function NanoleafLayout(props) {
		_classCallCheck(this, NanoleafLayout);

		_get(Object.getPrototypeOf(NanoleafLayout.prototype), 'constructor', this).call(this, props);

		(0, _mobx.extendObservable)(this, {
			dataSVG: null
		});
	}

	_createClass(NanoleafLayout, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this = this;

			var data = []; //Data to mutate state

			if (!this.props.data.hasOwnProperty('positionData')) {
				throw new Error('Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value');
			}

			this.props.data.positionData.map(function (value) {
				var draw = _this.draw(value.x / _this.props.panelSpacing + _this.props.xOffset, value.y / _this.props.panelSpacing + _this.props.yOffset, value.o, value.color, value.panelId);

				_this.props.onDraw(draw);
				data.push(draw);
			});

			this.dataSVG = data;
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			var _this2 = this;

			var data = [];

			//Recalculate new positions on the panels
			this.props.data.positionData.map(function (value, key) {
				var draw = _this2.draw(value.x / _this2.props.panelSpacing + _this2.props.xOffset, value.y / _this2.props.panelSpacing + _this2.props.yOffset, value.o, value.color, value.panelId);

				_this2.props.onDraw(draw); //onDraw Callback occurs here
				data.push(draw);
			});

			this.dataSVG = data;
		}
	}, {
		key: 'draw',

		/**
   * Draws an Equilateral Triangle on the Canvas
   * @param x integer Cartesian X coordinate
   * @param y integer Cartesian Y coordinate
   * @param o integer Orientation in degrees
   * @param color hexadecimal color code Triangle Color i.e. #FF00FF
   * @param id integer the panel identifier
   */
		value: function draw(x, y, o, color, id) {
			var orient = false;
			var path = [];

			var centroid = this.cartesianToScreen(x, y);

			var topPoint = this.getTopFromCentroid(x, y);
			var leftPoint = this.getLeftFromCentroid(x, y);
			var rightPoint = this.getRightFromCentroid(x, y);

			var topRotatedPoint = this.rotateTopFromCentroid(x, y);
			var leftRotatedPoint = this.rotateLeftFromCentroid(x, y);
			var rightRotatedPoint = this.rotateRightFromCentroid(x, y);

			if (this.doRotate(o)) {

				path.push('M' + topRotatedPoint[0] + ' ' + topRotatedPoint[1]);
				path.push('L' + leftRotatedPoint[0] + ' ' + leftRotatedPoint[1]);
				path.push('L' + rightRotatedPoint[0] + ' ' + rightRotatedPoint[1]);
				path.push('L' + topRotatedPoint[0] + ' ' + topRotatedPoint[1]);

				orient = true;
			} else {

				path.push('M' + topPoint[0] + ' ' + topPoint[1]);
				path.push('L' + leftPoint[0] + ' ' + leftPoint[1]);
				path.push('L' + rightPoint[0] + ' ' + rightPoint[1]);
				path.push('L' + topPoint[0] + ' ' + topPoint[1]);
			}

			path.push("Z");
			path = path.join(" ");

			id = {
				x: centroid[0] - 3,
				y: centroid[1] + 15,
				id: id
			};

			if (orient) {
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
		}
	}, {
		key: 'cartesianToScreen',

		/**
   * Maps a cartesian point to a 2D HTML Canvas point
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array where the Screen point x is in position 0 and the screen point Y is in position 1
   */
		value: function cartesianToScreen(cx, cy) {
			var screenX = cx + this.props.width / 2;
			var screenY = this.props.height / 2 - cy;

			return [screenX, screenY];
		}
	}, {
		key: 'doRotate',

		/**
   * Determines if the given triangle should be rotated
   * @param rotation integer rotation in degrees
   * @returns {boolean} true if the rotation should occur false otherwise
   */
		value: function doRotate(rotation) {
			return rotation / 60 % 2 !== 0;
		}
	}, {
		key: 'getTopFromCentroid',

		/**
   * Calculates the top most point of the equilateral triangle given the centroid
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function getTopFromCentroid(cx, cy) {
			var screen = this.cartesianToScreen(cx, cy);

			return [screen[0].toFixed(), (screen[1] - CENTROID_HEIGHT).toFixed()];
		}
	}, {
		key: 'getLeftFromCentroid',

		/**
   * Calculates the left most point of the equilateral triangle given the centroid
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function getLeftFromCentroid(cx, cy) {
			var screen = this.cartesianToScreen(cx, cy);

			return [(screen[0] - CENTROID_HEIGHT).toFixed(), (screen[1] + CENTROID_HEIGHT).toFixed()];
		}
	}, {
		key: 'getRightFromCentroid',

		/**
   * Calculates the right most point of the equilateral triangle given the centroid
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function getRightFromCentroid(cx, cy) {
			var screen = this.cartesianToScreen(cx, cy);

			return [(screen[0] + CENTROID_HEIGHT).toFixed(), (screen[1] + CENTROID_HEIGHT).toFixed()];
		}
	}, {
		key: 'rotateLeftFromCentroid',

		/**
   * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function rotateLeftFromCentroid(cx, cy) {
			var screen = this.cartesianToScreen(cx, cy);

			return [(screen[0] - CENTROID_HEIGHT).toFixed(), (screen[1] - CENTROID_HEIGHT + 30).toFixed()]; //30 is for spacing
		}
	}, {
		key: 'rotateRightFromCentroid',

		/**
   * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function rotateRightFromCentroid(cx, cy) {
			var screen = this.cartesianToScreen(cx, cy);

			return [(screen[0] + CENTROID_HEIGHT).toFixed(), (screen[1] - CENTROID_HEIGHT + 30).toFixed()];
		}
	}, {
		key: 'rotateTopFromCentroid',

		/**
   * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function rotateTopFromCentroid(cx, cy) {
			var screen = this.cartesianToScreen(cx, cy);

			return [screen[0].toFixed(), (screen[1] + CENTROID_HEIGHT + 30).toFixed()];
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement(
					'svg',
					{ height: this.props.width, width: this.props.height, style: { width: '100%', borderRadius: '50%' }, transform: 'rotate(' + this.props.rotation + ')' },
					this.dataSVG.map(function (value, key) {
						if (_this3.props.showId) {
							return _react2['default'].createElement(
								'g',
								{ key: key },
								_react2['default'].createElement('path', {
									key: key + "_path",
									d: value.path,
									strokeWidth: _this3.props.strokeWidth,
									onMouseOver: function (e) {
										_this3.props.onHover(value);
									},
									onMouseOut: function (e) {
										_this3.props.onExit(value);
									},
									onMouseDown: function (e) {
										_this3.props.onClick(value);
									},
									fill: value.color,
									stroke: _this3.props.strokeColor
								}),
								_react2['default'].createElement(
									'text',
									{
										key: key + "_text",
										x: value.id.x,
										y: value.id.y,
										fill: '#FFFFFF'
									},
									value.id.id
								)
							);
						} else {
							return _react2['default'].createElement('path', {
								key: key + "_path",
								d: value.path,
								strokeWidth: _this3.props.strokeWidth,
								onMouseOver: function (e) {
									_this3.props.onHover(value);
								},
								onMouseOut: function (e) {
									_this3.props.onExit(value);
								},
								onMouseDown: function (e) {
									_this3.props.onClick(value);
								},
								fill: value.color,
								stroke: _this3.props.strokeColor
							});
						}
					})
				)
			);
		}
	}], [{
		key: 'defaultProps',
		get: function get() {
			return {
				xOffset: 0,
				yOffset: 0,
				panelSpacing: 1.37,
				width: 1000,
				height: 1000,
				strokeColor: '#FFFFFF',
				onDraw: function onDraw(data) {
					return data;
				},
				showId: false,
				strokeWidth: 2,
				rotation: 0,
				onHover: function onHover(data) {
					return data;
				},
				onClick: function onClick(data) {
					return data;
				},
				onExit: function onExit(data) {
					return data;
				}
			};
		}
	}]);

	return NanoleafLayout;
})(_react.Component);

NanoleafLayout.propTypes = {
	height: _propTypes2['default'].number,
	width: _propTypes2['default'].number,
	data: _propTypes2['default'].object.isRequired, //should be array
	onDraw: _propTypes2['default'].func,
	panelSpacing: _propTypes2['default'].number,
	strokeColor: _propTypes2['default'].string,
	xOffset: _propTypes2['default'].number,
	yOffset: _propTypes2['default'].number,
	showId: _propTypes2['default'].bool,
	strokeWidth: _propTypes2['default'].number,
	rotation: _propTypes2['default'].number,
	onHover: _propTypes2['default'].func,
	onClick: _propTypes2['default'].func,
	onExit: _propTypes2['default'].func
};

exports['default'] = NanoleafLayout;
module.exports = exports['default'];